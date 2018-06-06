import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ students, campuses }) => {
  return (
    <div>
      <nav className='navbar navbar-default'>
        <div className='container'>
          <div className='navbar-header'>
            <button
              type='button'
              className='navbar-toggle collapsed'
              data-toggle='collapse'
              data-target='.navbar-collapse'>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
          </div>
          <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              {
                <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
              }
              {
                <li><NavLink to='/students' activeClassName='active'>Students ({students.length})</NavLink></li>
              }
              {
                <li><NavLink to='/campuses' activeClassName='active'>Campuses ({campuses.length})</NavLink></li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ students, campuses }) => {
  return { students, campuses };
};

export default connect(mapStateToProps)(Nav);
