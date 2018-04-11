import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, updateCampus } from './store';

class CampusCreate extends Component {
  constructor({ campus }) {
    super();
    this.state = {
      name: !campus ? '' : campus.name,
      imageURL: !campus ? '' : campus.imageURL,
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
      imageURL: !campus ? '' : campus.imageURL,
      description: !campus ? '' : campus.description
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

  onCreateCampus(ev) {
    const { name, imageURL, description } = this.state;
    ev.preventDefault();
    this.props.createCampus({ name, imageURL, description });
  }

  onUpdateCampus(ev) {
    const { name, imageURL, description } = this.state;
    const { campus } = this.props;
    ev.preventDefault();
    this.props.updateCampus({ name, imageURL, description }, campus.id);
  }

  render() {
    const { onCreateCampus, onUpdateCampus, onChangeForm } = this;
    const { name, imageURL, description, inputEdited } = this.state;
    const { campus } = this.props;
    return (
      <div>
        <h2>{!campus ? ('Add Campus') : (`Edit Campus - ${campus.name}`)}</h2>
        <div className='form-group'>
          <label>Name</label>
          <input name='name' onChange={onChangeForm} value={name} type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label>Image URL</label>
          <input name='imageURL' onChange={onChangeForm} value={imageURL} type='url' className='form-control' />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea name='description' className='form-control' rows='5' onChange={onChangeForm} value={description} />
        </div>
        <button onClick={!campus ? onCreateCampus : onUpdateCampus} disabled={!name.length} type='button' className='btn btn-primary'>
          {!campus ? ('Add') : ('Edit')} Campus
        </button>
        {inputEdited.name && !name.length && <div className='alert alert-danger'>Campus name must be entered.</div>}
      </div>
    );
  }
}

const mapStateToProps = ({ campuses }, { id }) => {
  return { campus: campuses.find(campus => campus.id === id) };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history)),
    updateCampus: (campus, id) => dispatch(updateCampus(campus, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCreate);
