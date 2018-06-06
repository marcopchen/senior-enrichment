import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from './store';

class StudentList extends Component {
  constructor() {
    super();
    this.onUpdateStudent = this.onUpdateStudent.bind(this);
  }

  onUpdateStudent(ev, student_id) {
    ev.preventDefault();
    this.props.updateStudent({ campus_id: null }, student_id);
  }

  render() {
    const { students, campus } = this.props;
    const { onUpdateStudent } = this;
    return (
      <div className='student-list'>
        {!students.length && <div className='alert'>No students registered.</div>}
        <div className='user-list'>
          {
            students && students.sort(function (a, b) {
              if (a.firstName < b.firstName) return -1;
              if (a.firstName > b.firstName) return 1;
              return 0;
            }).map(student => {
              return (
                <div className='list-group-item min-content user-item' key={student.id}>
                  <div className='media'>
                    <div className='media-left media-middle icon-container'>
                      <img className='media-object img-circle' src={student.imageURL} />
                    </div>
                    <Link to={`/students/${student.id}`} className='media-body'>
                      <h5 className='media-heading tucked'>
                        <span>{student.name}</span>
                      </h5>
                    </Link>
                  </div>
                  {campus && <br />}
                  {campus && <button onClick={ev => onUpdateStudent(ev, student.id)} type='button'>
                    Remove Student
                  </button>}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ students }, { campus }) => {
  return {
    students: !campus ? students : students.filter(student => {
      return student.campus_id === campus.id;
    }),
    campus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (student, id) => dispatch(updateStudent(student, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
