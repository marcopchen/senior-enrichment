import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent } from './store';

class Students extends Component {
  constructor() {
    super();
    this.onDeleteStudent = this.onDeleteStudent.bind(this);
  }

  onDeleteStudent(ev, student) {
    ev.preventDefault();
    this.props.deleteStudent(student);
  }

  render() {
    const { students } = this.props;
    const { onDeleteStudent } = this;
    return (
      <div>
        <ul>
          {
            students.map(student => {
              return (
                <li key={student.id}>
                  {student.name}
                  <br />
                  <button onClick={(ev) => onDeleteStudent(ev, student)}>
                    Delete Student
                  </button>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ students }, { id }) => {
  return { students: !id ? students : students.filter(student => student.categoryId === id) };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteStudent: (student) => dispatch(deleteStudent(student, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
