import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentList = ({ students }) => {
  return (
    <div className='container'>
      <div className='user-list'>
        {
          students && students.sort(function (a, b) {
            if (a.firstName < b.firstName) return -1;
            if (a.firstName > b.firstName) return 1;
            return 0;
          }).map(student => {
            return (
              <div className='list-group-item min-content user-item' key={student.id}>
                <div className='media'>
                  <div className='media-left media-middle icon-container'>
                    <img className='media-object img-circle' src={student.imageURL} />
                  </div>
                  <Link to={`/students/${student.id}`} className='media-body'>
                    <h5 className='media-heading tucked'>
                      <span>{student.name}</span>
                    </h5>
                  </Link>
                </div>
              </div>
            );
          })
        }
      </div>
      {!students.length && <p>No students registered.</p>}
    </div>
  );
};

const mapStateToProps = ({ students }, { campus_id }) => {
  return {
    students: !campus_id ? students : students.filter(student => {
      return student.campus_id === campus_id;
    })
  };
};

export default connect(mapStateToProps)(StudentList);
