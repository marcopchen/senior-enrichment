import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CampusList = ({ campuses }) => {
  return (
    <div className='student-list'>
      {!campuses.length && <div className='alert'>No campuses registered.</div>}
      <ul className='list-group'>
        {
          campuses.map(campus => {
            return (
              <Link key={campus.id} to={`/campuses/${campus.id}`}>
                <li className='list-group-item min-content user-item'>
                  {campus.name}
                </li>
              </Link>
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
