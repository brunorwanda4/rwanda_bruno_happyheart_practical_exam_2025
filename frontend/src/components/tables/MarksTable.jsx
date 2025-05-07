import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

const MarksTable = ({ marks, onEdit, onDelete }) => {
  if (!marks || marks.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No mark data available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4"> {/* Added overflow for responsiveness */}
      {/* Using DaisyUI table class and Tailwind for margin-top */}
      <table className="table w-full table-zebra">
        {/* table-zebra adds alternating row colors */}
        <thead>
          <tr>
            <th>Mark ID</th>
            <th>Trainee Name</th> {/* Combined first and last name */}
            <th>Trade</th>
            <th>Module</th>
            <th>Username</th>
            <th>Formative Ass.</th>
            <th>Summative Ass.</th>
            <th>Comprehensive Ass.</th>
            <th>Total Marks (100)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            // Using markId as a unique key
            <tr key={mark.markId}>
              <td>{mark.markId}</td>
              {/* Displaying Trainee First and Last Name */}
              <td>{`${mark.trainee_firstName} ${mark.trainee_lastName}`}</td>
              {/* Displaying Trade Name */}
              <td>{mark.trade_name}</td>
              {/* Displaying Module Name */}
              <td>{mark.modName}</td>
              {/* Displaying Username */}
              <td>{mark.username}</td>
              <td>{mark.formative_ass}</td>
              <td>{mark.summative_ass}</td>
              <td>{mark.comprehensive_ass}</td>
              <td>{mark.total_marks_100}</td>
              <td>
                <div className="flex items-center space-x-2">
                  {/* Edit Button with React Icon and DaisyUI/Tailwind classes */}
                  {onEdit && (
                    <button
                      className="btn btn-ghost btn-xs" // DaisyUI button classes
                      onClick={() => onEdit(mark)} // Pass the entire mark object or mark.markId depending on onEdit
                      aria-label={`Edit mark ${mark.markId}`}
                    >
                      <FaEdit />
                    </button>
                  )}
                  {/* Delete Button with React Icon and DaisyUI/Tailwind classes */}
                  {onDelete && (
                    <button
                      className="btn btn-ghost btn-xs text-error" // DaisyUI button classes, text-error for red icon
                      onClick={() => onDelete(mark.markId)}
                      aria-label={`Delete mark ${mark.markId}`}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;