import React from 'react';
import { Link } from 'react-router-dom';
import CampusList from './CampusList';

const Campuses = () => {
  return (
    <div>
      <h2>Campuses</h2>
      <div className='container'>
        <button type='button' className='btn btn-default'>
          <Link to='/campuses/add'>
            Add Campus
          </Link>
        </button>
      </div>
      <CampusList />
    </div>
  );
};

export default Campuses;
