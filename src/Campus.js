import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createCampus, deleteCampus } from './store';
import StudentList from './StudentList';

class Campus extends Component {
  constructor() {
    super();
    this.onDeleteCampus = this.onDeleteCampus.bind(this);
  }

  onDeleteCampus(ev) {
    ev.preventDefault();
    this.props.deleteCampus(this.props.campus);
  }

  render() {
    const { campus, campus_id } = this.props;
    const { onDeleteCampus } = this;
    return (
      <div>
        <h2>Campus - {campus && campus.name}</h2>
        <Link to={`/campuses/${campus_id}/new-student`} campus_id={campus_id}>
          <button>Add Student</button>
        </Link>
        <StudentList campus_id={campus_id} />
        <Link to={`/campuses/${campus && campus.id}/edit`}>
          <button>Edit Campus</button>
        </Link>
        <button onClick={onDeleteCampus}>Delete Campus</button>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses }, { id }) => {
  return {
    campus: campuses.find(campus => campus.id === id), campus_id: id
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus)),
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
