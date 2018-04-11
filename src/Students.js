import React from 'react';
import { Link } from 'react-router-dom';
import StudentList from './StudentList';

const Students = () => {
  return (
    <div>
      <h2>Students</h2>
      <div className='container'>
        <button type='button' className='btn btn-default'>
          <Link to='/students/add'>Add Student</Link>
        </button>
      </div>
      <StudentList />
    </div>
  );
};

export default Students;
