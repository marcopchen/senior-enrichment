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
      gpa: !student ? '' : student.gpa,
      inputEdited: {}
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
      gpa: !student ? '' : student.gpa,
    });
  }

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    const { inputEdited } = this.state;
    ev.preventDefault();
    inputEdited[inputName] = true;
    this.setState({ [inputName]: inputValue, inputEdited });
  }

  onCreateStudent(ev) {
    const { firstName, lastName, email, gpa } = this.state;
    ev.preventDefault();
    this.props.createStudent({
      firstName,
      lastName,
      email,
      gpa
    });
  }

  onUpdateStudent(ev) {
    const { firstName, lastName, email, gpa } = this.state;
    const { student } = this.props;
    ev.preventDefault();
    this.props.updateStudent({
      firstName,
      lastName,
      email,
      gpa
    }, student.id, null);
  }

  render() {
    const { onCreateStudent, onUpdateStudent, onChangeForm } = this;
    const { inputEdited } = this.state;
    const { student } = this.props;
    const fields = { firstName: 'First Name', lastName: 'Last Name', email: 'E-mail' };
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
          <input name='gpa' onChange={onChangeForm} value={this.state.gpa} className='form-control' maxLength='3' step='0.1' min='0.0' max='4.0' />
        </div>
        <button onClick={!student ? onCreateStudent : onUpdateStudent} type='button' className='btn btn-primary' disabled={Object.keys(fields).some(field => !this.state[field].length)}>
          {!student ? ('Add') : ('Edit')} Student
        </button>
        {
          Object.keys(fields).map(field => {
            return inputEdited[field] && !this.state[field].length &&
              (<div key={field} className='alert alert-danger'>
                {`Student's ${fields[field].toLowerCase()} must be entered.`}
               </div>);
          })
        }
      </div>
    );
  }
}

const mapStateToProps = ({ students }, { id }) => {
  return { student: students && students.find(student => student.id === id) };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student, history)),
    updateStudent: (student, id, campus) => dispatch(updateStudent(student, id, campus, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);
