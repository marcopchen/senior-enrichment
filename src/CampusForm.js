import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, updateCampus } from './store';

class CampusCreate extends Component {
  constructor({ campus }) {
    super();
    this.state = {
      name: !campus ? '' : campus.name
    };
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onCreateCampus = this.onCreateCampus.bind(this);
    this.onUpdateCampus = this.onUpdateCampus.bind(this);
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

  onUpdateCampus(ev) {
    const { name } = this.state;
    const { campus } = this.props;
    ev.preventDefault();
    this.props.updateCampus({ name }, campus.id);
  }

  render() {
    const { onCreateCampus, onUpdateCampus, onChangeForm } = this;
    const { campus } = this.props;
    const { name } = this.state;
    return (
      <div>
        <h2>{!campus ? ('Add Campus') : (`Edit Campus - ${campus.name}`)}</h2>
        <form>
          <input name="name" onChange={onChangeForm} value={name} />
        </form>
        <button onClick={!campus ? onCreateCampus : onUpdateCampus}>
          {!campus ? ('Add') : ('Edit')} Campus
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses }, { id }) => {
  return { campus: campuses && campuses.find(campus => campus.id === id) };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history)),
    updateCampus: (campus, id) => dispatch(updateCampus(campus, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCreate);
