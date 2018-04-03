import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Campuses from './Campuses';

const Nav = ({ path, students }) => {
  return (
    <div>
      <ul>
        {
          path === '/' ? <li>Home</li> : <li><Link to="/">Home</Link></li>
        }
        {
          path === '/students' ? <li>All Students ({students.length})</li> : <li><Link to="/students">All Students</Link> ({students.length})</li>
        }
      </ul>
      <Campuses />
    </div>
  );
};

const mapStateToProps = ({ students }) => {
  return { students };
};

export default connect(mapStateToProps)(Nav);
