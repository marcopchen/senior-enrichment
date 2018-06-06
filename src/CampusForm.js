import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, updateCampus } from './store';

class CampusCreate extends Component {
  constructor({ campus }) {
    super();
    this.state = {
      name: !campus ? '' : campus.name,
      description: !campus ? '' : campus.description,
      inputEdited: {}
    };
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onCreateCampus = this.onCreateCampus.bind(this);
    this.onUpdateCampus = this.onUpdateCampus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { campus } = nextProps;
    this.setState({
      name: !campus ? '' : campus.name,
      description: !campus ? '' : campus.description
    });
  }

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    const { inputEdited } = this.state;
    inputEdited[inputName] = true;
    this.setState({ [inputName]: inputValue, inputEdited });
  }

  onCreateCampus(ev) {
    ev.preventDefault();
    const { name, description } = this.state;
    this.props.createCampus({ name, description });
  }

  onUpdateCampus(ev) {
    ev.preventDefault();
    const { name, description } = this.state;
    const { campus, history } = this.props;
    this.props.updateCampus({ name, description }, campus.id)
      .then(() => {
        history.push(`/campuses/${campus.id}`);
      });
  }

  render() {
    const { onCreateCampus, onUpdateCampus, onChangeForm } = this;
    const { name, description, inputEdited } = this.state;
    const { campus } = this.props;
    return (
      <div className='campus-container'>
        <h2>{!campus ? ('Add Campus') : (`Edit Campus - ${campus.name}`)}</h2>
        <div className='form-group'>
          <label>Name</label>
          <input name='name' onChange={onChangeForm} value={name} type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea name='description' className='form-control' rows='5' onChange={onChangeForm} value={description} />
        </div>
        <button onClick={!campus ? onCreateCampus : onUpdateCampus} disabled={!name.length} type='button' className='btn btn-primary'>
          {!campus ? ('Add') : ('Edit')} Campus
        </button>
        <br />
        {inputEdited.name && !name.length && <div className='alert alert-danger'>Campus name must be entered.</div>}
      </div>
    );
  }
}

const mapStateToProps = ({ campuses }, { id, history }) => {
  return { campus: campuses.find(campus => campus.id === id), history };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history)),
    updateCampus: (campus, id) => dispatch(updateCampus(campus, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCreate);
