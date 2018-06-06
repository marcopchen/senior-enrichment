import React from 'react';
import { Link } from 'react-router-dom';
import StudentList from './StudentList';

const Students = () => {
  return (
    <div className='campus-container'>
      <h2>Students</h2>
      <div className='container'>
        <Link to='/students/add'>
          <button type='button' className='btn btn-primary'>
            Add Student
          </button>
        </Link>
      </div>
      <br />
      <StudentList />
    </div>
  );
};

export default Students;
