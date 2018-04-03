import React, { Component } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import { createCampus, createStudent, deleteCampus } from './store';
import Students from './Students';

class Campus extends Component {
  constructor() {
    super();
    this.onCreateStudent = this.onCreateStudent.bind(this);
    this.onDeleteCampus = this.onDeleteCampus.bind(this);
  }

  onCreateStudent(ev) {
    ev.preventDefault();
    this.props.createStudent({
      name: faker.commerce.studentName(),
      campusId: this.props.campus.id
    });
  }

  onDeleteCampus(ev) {
    ev.preventDefault();
    this.props.deleteCampus(this.props.campus);
  }

  render() {
    const { campus } = this.props;
    const { onCreateStudent, onDeleteCampus } = this;
    return (
      <div>
        <h2>Campus - {campus && campus.name}</h2>
        <button onClick={onCreateStudent}>Add Student</button>
        <Students id={campus && campus.id} />
        <button onClick={onDeleteCampus}>Delete Campus</button>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses }, { id }) => {
  return {
    campus: campuses.find(campus => campus.id === id)
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus)),
    createStudent: (student) => dispatch(createStudent(student)),
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
