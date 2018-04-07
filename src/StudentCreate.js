import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from './store';

class StudentCreate extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onCreateStudent = this.onCreateStudent.bind(this);
  }

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    ev.preventDefault();
    this.setState({ [inputName]: inputValue });
  }

  onCreateStudent(ev) {
    const { campus } = this.props;
    const { firstName, lastName, email } = this.state;
    ev.preventDefault();
    this.props.createStudent({
      firstName,
      lastName,
      email,
      campus_id: campus && campus.id
    });
  }

  render() {
    const { onCreateStudent, onChangeForm } = this;
    return (
      <div>
        <h2>New Student</h2>
        <form>
          <input name="firstName" onChange={onChangeForm} />
          <input name="lastName" onChange={onChangeForm} />
          <input name="email" onChange={onChangeForm} />
        </form>
        <button onClick={onCreateStudent}>Add Student</button>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses }, { campus_id }) => {
  return {
    campus: !campus_id ? null : campuses.find(campus => campus.id === campus_id),
    campus_id
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);
