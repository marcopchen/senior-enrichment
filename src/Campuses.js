import React from 'react';
import { Link } from 'react-router-dom';
import CampusList from './CampusList';

const Campuses = () => {
  return (
    <div>
      <h2>Campuses</h2>
      <Link to={`/campuses/new-campus`}>
        <button>Add Campus</button>
      </Link>
      <CampusList />
    </div>
  );
};

export default Campuses;
