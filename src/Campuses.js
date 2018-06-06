import React from 'react';
import { Link } from 'react-router-dom';
import CampusList from './CampusList';

const Campuses = () => {
  return (
    <div className='campus-container'>
      <h2>Campuses</h2>
      <div className='container'>
        <Link to='/campuses/add'>
          <button type='button' className='btn btn-primary'>
            Add Campus
          </button>
        </Link>
      </div>
      <br />
      <CampusList />
    </div>
  );
};

export default Campuses;
