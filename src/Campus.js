import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus, updateStudent } from './store';
import StudentList from './StudentList';

class Campus extends Component {
  constructor() {
    super();
    this.state = {
      student_id: 0
    };
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteCampus = this.onDeleteCampus.bind(this);
    this.onUpdateStudent = this.onUpdateStudent.bind(this);
  }

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    ev.preventDefault();
    this.setState({ [inputName]: inputValue });
  }

  onDeleteCampus(ev) {
    ev.preventDefault();
    this.props.deleteCampus(this.props.campus);
  }

  onUpdateStudent(ev) {
    const { campus } = this.props;
    const { student_id } = this.state;
    ev.preventDefault();
    this.props.updateStudent({ campus_id: campus.id }, student_id);
  }

  render() {
    const { student_id } = this.state;
    const { campus, students } = this.props;
    const { onDeleteCampus, onUpdateStudent, onChangeForm } = this;
    return (
      <div className='campus-container'>
        <h2>Campus - {campus && campus.name}</h2>
        <p>{campus && campus.description}</p>
        <select name='student_id' onChange={onChangeForm}>
          <option disabled={student_id}>- choose -</option>
          {
            students && students.sort(function (a, b) {
              if (a.firstName < b.firstName) return -1;
              if (a.firstName > b.firstName) return 1;
              return 0;
            }).map(_student => (
              <option key={_student.id} value={_student.id} disabled={campus && _student.campus_id === campus.id}>
                {_student.name}
              </option>
            ))
          }
        </select>
        <button onClick={onUpdateStudent} disabled={!student_id} type='button'>
          Add Student
        </button>
        <StudentList campus={campus} />
        <br />
        <Link to={`/campuses/${campus && campus.id}/edit`}>
          <button type='button' className='btn btn-primary'>
            Edit Campus
        </button>
        </Link>
        <button onClick={onDeleteCampus} type='button' className='btn btn-danger'>Delete Campus</button>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses, students }, { id }) => {
  const campus = campuses.find(_campus => _campus.id === id);
  return { campus, students };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history)),
    updateStudent: (student, id) => dispatch(updateStudent(student, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
