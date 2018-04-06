const conn = require('../conn');

const Campus = require('./campus');
const Student = require('./student');

Campus.hasMany(Student, {
  onDelete: 'cascade',
  hooks: true
});

Student.belongsTo(Campus);

module.exports = {
  conn,
  Campus,
  Student
};
