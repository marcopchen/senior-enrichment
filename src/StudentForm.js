import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from './store';

class StudentCreate extends Component {
  constructor(props) {
    super(props);
    const { student } = this.props;
    this.state = {
      firstName: !student ? '' : student.firstName,
      lastName: !student ? '' : student.lastName,
      email: !student ? '' : student.email
    };
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onCreateStudent = this.onCreateStudent.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.student) {
  //     const { student } = this.nextProps;
  //     this.setState({
  //       firstName: student.firstName,
  //       lastName: student.lastName,
  //       email: student.email
  //     });
  //   }
  // }

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
    const { firstName, lastName, email } = this.state;
    const { student } = this.props;
    return (
      <div>
        <h2>{!student ? ('Add Student') : (`Edit Student - ${student.name}`)}</h2>
        <form>
          <input name="firstName" onChange={onChangeForm} value={firstName} />
          <input name="lastName" onChange={onChangeForm} value={lastName} />
          <input name="email" onChange={onChangeForm} value={email} />
        </form>
        <button onClick={onCreateStudent}>{!student ? ('Add') : ('Edit')} Student</button>
      </div>
    );
  }
}

const mapStateToProps = ({ students }, { id }) => {
  return {
    student: students && students.find(student => student.id === id)
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);
