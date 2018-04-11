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
    const { campus_id, campus } = this.props;
    const { student_id } = this.state;
    ev.preventDefault();
    this.props.updateStudent({ campus_id }, student_id, campus);
  }

  render() {
    const { student_id } = this.state;
    const { campus, students, campus_id } = this.props;
    const { onDeleteCampus, onUpdateStudent, onChangeForm } = this;
    return (
      <div>
        <h2>Campus - {campus && campus.name}</h2>
        <p>Description: {campus && campus.description}</p>
        <select name='student_id' onChange={onChangeForm}>
          <option disabled={student_id}>- choose -</option>
          {
            students && students.sort(function (a, b) {
              if (a.firstName < b.firstName) return -1;
              if (a.firstName > b.firstName) return 1;
              return 0;
            }).map(student => (
              <option key={student.id} value={student.id} disabled={student.campus_id === campus_id}>
                {student.name}
              </option>
            ))
          }
        </select>
        <button onClick={onUpdateStudent} disabled={!student_id} type='button'>
          Add Student
        </button>
        <StudentList campus_id={campus_id} />
        <button type='button' className='btn btn-default'>
          <Link to={`/campuses/${campus && campus.id}/edit`}>
            Edit Campus
          </Link>
        </button>
        <button onClick={onDeleteCampus} type='button' className='btn btn-danger'>Delete Campus</button>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses, students }, { id }) => {
  const campus = campuses.find(campus => campus.id === id);
  return { campus, students, campus_id: id };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history)),
    updateStudent: (student, id, campus) => dispatch(updateStudent(student, id, campus, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
