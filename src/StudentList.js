import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentList = ({ students }) => {
  return (
    <div>
      <ul>
        {
          students && students.map(student => {
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.name}
                </Link>
              </li>
            );
          })
        }
      </ul>
      {!students.length && <p>No students registered.</p>}
    </div>
  );
};

const mapStateToProps = ({ students }, { campus_id }) => {
  return {
    students: !campus_id ? students : students.filter(student => {
      return student.campus_id === campus_id
    })
  };
};

export default connect(mapStateToProps)(StudentList);
