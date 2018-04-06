import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CampusList = ({ campuses }) => {
  return (
    <div>
      <ul>
        {
          campuses.map(campus => {
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
      {!campuses.length && <p>No campuses registered.</p>}
    </div>
  );
};

const mapStateToProps = ({ campuses }) => {
  return { campuses };
};

export default connect(mapStateToProps)(CampusList);
