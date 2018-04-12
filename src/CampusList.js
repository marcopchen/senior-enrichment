import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CampusList = ({ campuses }) => {
  return (
    <div className='container'>
      {!campuses.length && <div className='alert'>No campuses registered.</div>}
      <ul className='list-group'>
        {
          campuses.map(campus => {
            return (
              <li key={campus.id} className='list-group-item'>
                <Link to={`/campuses/${campus.id}`}>
                  {campus.name}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ campuses }) => {
  return { campuses };
};

export default connect(mapStateToProps)(CampusList);
