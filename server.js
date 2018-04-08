const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { Campus, Student } = require('./db/models');

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

app.put('/api/campuses/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => {
      Object.assign(campus, req.body);
      return campus.save();
    })
    .then(campus => res.send(campus))
    .catch(next);
});

app.put('/api/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => {
      Object.assign(student, req.body);
      return student.save();
    })
    .then(student => res.send(student))
    .catch(next);
});

app.delete('/api/campuses/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => {
      return Promise.all([
        campus.destroy(),
        // Student.destroy({ where: { campusId: req.params.id } })
      ]);
    })
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
