const express = require('express');
const path = require('path');
const app = express();
const faker = require('faker');

const port = process.env.PORT || 3000;

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_students');

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
});

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  campusId: {
    type: Sequelize.INTEGER
  }
});

app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/campuses', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.send(campuses))
    .catch(next);
});

app.get('/api/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

app.post('/api/campuses', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.send(campus))
    .catch(next);
});

app.post('/api/students', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.delete('/api/campuses/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => campus.destroy())
    .then(() => res.send())
    .catch(next);
  Student.findAll({ where: { campusId: req.params.id } })
    .then(students => students.forEach(student => student.destroy()))
    .then(() => res.send())
    .catch(next);
});

app.delete('/api/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.send())
    .catch(next);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

conn.sync({ force: true })
  .then(() => Promise.all([
    Campus.create({ name: 'Fullstack Academy' }),
    Student.create({ name: faker.commerce.studentName(), campusId: 1 }),
  ]));
