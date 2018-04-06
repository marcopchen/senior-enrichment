import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ path, students, campuses }) => {
  return (
    <div>
      <ul>
        {
          path === '/' ? <li>Home</li> : <li><Link to="/">Home</Link></li>
        }
        {
          path === '/students' ? <li>All Students ({students.length})</li> : <li><Link to="/students">All Students</Link> ({students.length})</li>
        }
        {
          path === '/campuses' ? <li>All Campuses ({campuses.length})</li> : <li><Link to="/campuses">All Campuses</Link> ({campuses.length})</li>
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ students, campuses }) => {
  return { students, campuses };
};

export default connect(mapStateToProps)(Nav);
