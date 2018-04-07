import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus } from './store';

class CampusCreate extends Component {
  constructor(props) {
    super(props);
    const { campus } = this.props;
    this.state = {
      name: !campus ? '' : campus.name
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
    const { campus } = this.props;
    const { name } = this.state;
    return (
      <div>
        <h2>New Campus</h2>
        <form>
          <input name="name" onChange={onChangeForm} value={name} />
        </form>
        <button onClick={onCreateCampus}>{!campus ? ('Add') : ('Edit')} Campus</button>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses }, { id }) => {
  return {
    campus: campuses && campuses.find(campus => campus.id === id)
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCreate);
