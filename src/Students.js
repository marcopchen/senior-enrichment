import React from 'react';
import { Link } from 'react-router-dom';
import StudentList from './StudentList';

const Students = () => {
  return (
    <div>
      <h2>Students</h2>
      <button>
        <Link to={`/students/add`}>
          Add Student
          </Link>
      </button>
      <StudentList />
    </div>
  );
};

export default Students;
