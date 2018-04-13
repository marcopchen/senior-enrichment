import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent } from './store';

class StudentCreate extends Component {
  constructor(props) {
    super(props);
    const { student } = this.props;
    this.state = {
      firstName: !student ? '' : student.firstName,
      lastName: !student ? '' : student.lastName,
      email: !student ? '' : student.email,
      gpa: !student ? 4.0 : student.gpa * 1,
      inputError: {},
      inputEdited: {}
    };
    this.validators = {
      email: value => {
        const validEmail = /\S+@\S+\.\S+/;
        if (!validEmail.test(value)) {
          return `Student's e-mail must be a valid address.`;
        }
      }
    };
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onCreateStudent = this.onCreateStudent.bind(this);
    this.onUpdateStudent = this.onUpdateStudent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { student } = nextProps;
    this.setState({
      firstName: !student ? '' : student.firstName,
      lastName: !student ? '' : student.lastName,
      email: !student ? '' : student.email,
      gpa: !student ? 4.0 : student.gpa,
    });
  }

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    const { inputEdited } = this.state;
    inputEdited[inputName] = true;
    this.setState({ [inputName]: inputValue, inputEdited });
  }

  onCreateStudent(ev) {
    ev.preventDefault();
    const { firstName, lastName, email, gpa } = this.state;
    const inputError = Object.keys(this.validators).reduce((errors, field) => {
      const validator = this.validators[field];
      const value = this.state[field];
      const error = validator(value);
      if (error) {
        errors[field] = error;
      }
      return errors;
    }, {});
    this.setState({ inputError, inputEdited: {} });
    this.props.createStudent({
      firstName,
      lastName,
      email,
      gpa
    });
  }

  onUpdateStudent(ev) {
    ev.preventDefault();
    const { firstName, lastName, email, gpa } = this.state;
    const { student, history } = this.props;
    const inputError = Object.keys(this.validators).reduce((errors, field) => {
      const validator = this.validators[field];
      const value = this.state[field];
      const error = validator(value);
      if (error) {
        errors[field] = error;
      }
      return errors;
    }, {});
    this.setState({ inputError, inputEdited: {} });
    this.props.updateStudent({
      firstName,
      lastName,
      email,
      gpa
    }, student.id)
      .then(() => {
        history.push(`/students/${student.id}`);
      });
  }

  render() {
    const { onCreateStudent, onUpdateStudent, onChangeForm } = this;
    const { gpa, inputEdited, inputError } = this.state;
    const { student } = this.props;
    const fields = { firstName: 'First Name', lastName: 'Last Name', email: 'E-mail' };
    const inputEmpty = Object.keys(fields).some(field => !this.state[field].length);
    return (
      <div>
        <h2>{!student ? ('Add Student') : (`Edit Student - ${student.name}`)}</h2>
        {
          Object.keys(fields).map(field => (
            <div key={field} className='form-group'>
              <label>{fields[field]}</label>
              <input name={`${field}`} onChange={onChangeForm} value={this.state[field]} className='form-control' />
            </div>
          ))
        }
        <div className='form-group'>
          <label>GPA</label>
          <input name='gpa' onChange={onChangeForm} value={(gpa * 1).toFixed(1)} className='form-control' type='number' step='0.1' min='0.0' max='4.0' />
        </div>
        <button onClick={!student ? onCreateStudent : onUpdateStudent} type='button' className='btn btn-primary' disabled={inputEmpty}>
          {!student ? ('Add') : ('Edit')} Student
        </button>
        {
          Object.keys(fields).map(field => {
            return inputEdited[field] && !this.state[field].length &&
              <div key={field} className='alert alert-danger'>
                {`Student's ${fields[field].toLowerCase()} must be entered.`}
              </div>;
          })
        }
        {!inputEdited.email && inputError.email && (<div className='alert alert-danger'>
          {inputError.email}
        </div>)}
        {inputEdited.gpa && (gpa < 0 || gpa > 4) &&
          <div className='alert alert-danger'>
            {`Student's GPA must be between 0.0 and 4.0.`}
          </div>}
      </div>
    );
  }
}

const mapStateToProps = ({ students }, { id, history }) => {
  return { student: students && students.find(student => student.id === id), history };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student, history)),
    updateStudent: (student, id) => dispatch(updateStudent(student, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);
