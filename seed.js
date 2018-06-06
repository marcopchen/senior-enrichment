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
    description: `The New York University Leonard N. Stern School of Business (commonly known as The Stern School or Stern) is a business school in New York University. It is also a founding member of the Association to Advance Collegiate Schools of Business. It was established as the School of Commerce, Accounts and Finance in 1900, the school changed its name in 1988 in honor of Leonard N. Stern, an alumnus and benefactor of the school. One of the most prestigious business schools in the world, it is also one of the oldest. The school is located on NYU's Greenwich Village campus next to the Courant Institute of Mathematical Sciences. Its alumni include some of the wealthiest in the world, as well as top business leaders and executives.`
  }));
  campuses.push(Campus.build({
    name: 'Tisch School of the Arts',
    description: `The New York University Tisch School of the Arts (also known as Tisch, TNYU, and TTSOA) is a center of study in the performing and media arts. Founded on August 17, 1965, the Tisch is a training ground for artists, scholars of the arts, and filmmakers. The school merges the technical training of a professional school with the academic resources of a major research university to immerse students in their intended artistic disciplines. It is located at 721 Broadway in Manhattan, New York City. As of 2017, it had more alumni working in Broadway theatre than any other school for theater in the United States.`
  }));
  campuses.push(Campus.build({
    name: 'Tandon School of Engineering',
    description: `The New York University Tandon School of Engineering (commonly referred to as Tandon) is the engineering and applied sciences school of New York University. Tandon is the second oldest private engineering and technology school in the United States. The school's campus is in Brooklyn's MetroTech Center, an urban academic-industrial research park. It is one of several engineering schools that were founded based on a European polytechnic university model in the 1800s, in response to the increasing industrialization of the United States. It has been a key center of research in the development of microwave, wireless, radar, electronics in general, polymers, industrial engineering and operations research and the US space program.`
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
