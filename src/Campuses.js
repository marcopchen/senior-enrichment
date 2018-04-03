import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import faker from 'faker';
import { createCampus } from './store';

class Campuses extends Component {
  constructor() {
    super();
    this.addCampus = this.addCampus.bind(this);
  }

  addCampus(ev) {
    ev.preventDefault();
    this.props.createCampus({ name: faker.commerce.department() });
  }

  render() {
    const { campuses } = this.props;
    const { addCampus } = this;
    return (
      <div>
        <h3>Campuses</h3>
        <ul>
          {
            campuses && campuses.map(campus => {
              return (
                <li key={campus.id}>
                  <Link to={`/campuses/${campus.id}`}>
                    {campus.name}
                  </Link>
                </li>
              );
            })
          }
        </ul>
        <button onClick={addCampus}>Add Campus</button>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses }) => {
  return { campuses };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
