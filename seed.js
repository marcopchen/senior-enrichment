const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');

const { conn, Campus, Student } = require('./db/models');

const numStudents = 12;

const emails = chance.unique(chance.email, numStudents);

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randImageURL(gender) {
  gender = gender.toLowerCase();
  const id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender, id });
}

function randGPA() {
  const gpa = chance.floating({
    min: 0,
    max: 4,
    fixed: 1
  });
  return gpa;
}

function randStudent(createdCampuses) {
  const gender = chance.gender();
  const campus = chance.pick(createdCampuses);
  return Student.build({
    firstName: chance.first({ gender }),
    lastName: chance.last(),
    email: emails.pop(),
    imageURL: randImageURL(gender),
    gpa: randGPA(),
    campus_id: campus.id
  });
}

function generateCampuses() {
  const campuses = [];
  campuses.push(Campus.build({
    name: 'Stern School of Business',
    description: chance.n(chance.paragraph, 1).join('\n')
  }));
  campuses.push(Campus.build({
    name: 'Tisch School of the Arts',
    description: chance.n(chance.paragraph, 1).join('\n')
  }));
  campuses.push(Campus.build({
    name: 'Tandon School of Engineering',
    description: chance.n(chance.paragraph, 1).join('\n')
  }));
  return campuses;
}

function generateStudents(createdCampuses) {
  return doTimes(numStudents, () => randStudent(createdCampuses));
}

function createCampuses() {
  return Promise.map(generateCampuses(), campus => campus.save());
}

function createStudents(createdCampuses) {
  return Promise.map(generateStudents(createdCampuses), student => student.save());
  // .then(createdStudents => {
  //   return Promise.map(createdStudents, student => {
  //     const campus = chance.pick(createdCampuses);
  //     return student.setCampus(campus);
  //   });
  // });
}

function seed() {
  return createCampuses()
    .then(createdCampuses => createStudents(createdCampuses));
}

console.log('syncing database');

conn.sync({ force: true })
  .then(() => {
    console.log('seeding database');
    return seed();
  })
  .then(() => console.log('seeding successful'))
  .catch(err => {
    console.error('error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    conn.close();
    return null;
  });
