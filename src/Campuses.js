import React from 'react';
import { Link } from 'react-router-dom';
import CampusList from './CampusList';

const Campuses = () => {
  return (
    <div>
      <h2>Campuses</h2>
      <p><Link to={`/campuses/new-campus`}>Add Campus</Link></p>
      <CampusList />
    </div>
  );
};

export default Campuses;
