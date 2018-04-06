import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus } from './store';

class CampusCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onCreateCampus = this.onCreateCampus.bind(this);
  }

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    ev.preventDefault();
    this.setState({ [inputName]: inputValue });
  }

  onCreateCampus(ev) {
    const { name } = this.state;
    ev.preventDefault();
    this.props.createCampus({ name });
  }

  render() {
    const { onCreateCampus, onChangeForm } = this;
    return (
      <div>
        <h2>New Campus</h2>
        <form>
          <input name="name" onChange={onChangeForm} />
        </form>
        <button onClick={onCreateCampus}>Add Campus</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history))
  };
};

export default connect(null, mapDispatchToProps)(CampusCreate);
