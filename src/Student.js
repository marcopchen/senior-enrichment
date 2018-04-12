import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent, deleteStudent } from './store';

class Student extends Component {
  constructor() {
    super();
    this.state = {
      campus_id: 0
    };
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onUpdateStudent = this.onUpdateStudent.bind(this);
    this.onDeleteStudent = this.onDeleteStudent.bind(this);
  }

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    ev.preventDefault();
    this.setState({ [inputName]: inputValue });
  }

  onUpdateStudent(ev) {
    const { campus_id } = this.state;
    const { student, campus } = this.props;
    ev.preventDefault();
    this.props.updateStudent({ campus_id: campus_id * 1 }, student.id, campus);
  }

  onDeleteStudent(ev) {
    ev.preventDefault();
    this.props.deleteStudent(this.props.student);
  }

  render() {
    const { campus_id } = this.state;
    const { student, campuses, campus } = this.props;
    const { onChangeForm, onUpdateStudent, onDeleteStudent } = this;
    return (
      <div>
        <h2>Student - {student && student.name}</h2>
        {
          !campus ? <div className='alert'>Not registered to a campus.</div> :
            <p>Campus: <Link to={`/campuses/${campus && campus.id}`}>{campus && campus.name}</Link></p>
        }
        <p>E-mail: {student && student.email}</p>
        <p>GPA: {student && student.gpa}</p>
        <form>
          <select name='campus_id' onChange={onChangeForm}>
            <option disabled={campus_id}>- choose -</option>
            {
              campuses && campuses.map(_campus => (
                <option key={_campus.id} value={_campus.id} disabled={campus && campus.id === _campus.id}>
                  {_campus.name}
                </option>
              ))
            }
          </select>
          <button onClick={onUpdateStudent} disabled={!campus_id} type='button'>
            {!student ? ('Add to') : ('Switch')} Campus
          </button>
        </form>
        <button type='button' className='btn btn-default'>
          <Link to={`/students/${student && student.id}/edit`}>
            Edit Student
          </Link>
        </button>
        <button onClick={onDeleteStudent} type='button' className='btn btn-danger'>Delete Student</button>
      </div>
    );
  }
}

const mapStateToProps = ({ students, campuses }, { id }) => {
  const student = students.find(_student => _student.id === id);
  const campus = student && campuses.find(_campus => _campus.id === student.campus_id);
  return { student, campuses, campus };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteStudent: (student) => dispatch(deleteStudent(student, history)),
    updateStudent: (student, id, campus) => dispatch(updateStudent(student, id, campus, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
