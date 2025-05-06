import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

/**
 * Displays a table of trainees.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.trainees - Array of trainee objects to display.
 * @param {function(number): void} [props.onEdit] - Callback function when edit is clicked. Receives trainee_id.
 * @param {function(number): void} [props.onDelete] - Callback function when delete is clicked. Receives trainee_id.
 */
const TraineesTable = ({ trainees, onEdit, onDelete }) => {
  if (!trainees || trainees.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No trainee data available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4"> {/* Added overflow for responsiveness */}
      {/* Using DaisyUI table class and Tailwind for margin-top */}
      <table className="table w-full table-zebra">
        {/* table-zebra adds alternating row colors */}
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Trade ID</th>
            {/* You might want to display Trade Name instead of ID.
                If your data fetch includes trade_name, change 'Trade ID' to 'Trade Name'
                and trainee.trade_id to trainee.trade_name below. */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainees.map((trainee) => (
            // Using trainee_id as a unique key
            <tr key={trainee.trainee_id}>
              <td>{trainee.trainee_id}</td>
              <td>{trainee.firstName}</td>
              <td>{trainee.lastName}</td>
              <td>{trainee.gender}</td>
              <td>{trainee.trade_id}</td>
              {/* If you have trade_name: <td>{trainee.trade_name}</td> */}
              <td>
                <div className="flex items-center space-x-2">
                  {/* Edit Button with React Icon and DaisyUI/Tailwind classes */}
                  {onEdit && (
                    <button
                      className="btn btn-ghost btn-xs" // DaisyUI button classes
                      onClick={() => onEdit(trainee.trainee_id)}
                      aria-label={`Edit ${trainee.firstName} ${trainee.lastName}`}
                    >
                      <FaEdit />
                    </button>
                  )}
                  {/* Delete Button with React Icon and DaisyUI/Tailwind classes */}
                  {onDelete && (
                    <button
                      className="btn btn-ghost btn-xs text-error" // DaisyUI button classes, text-error for red icon
                      onClick={() => onDelete(trainee.trainee_id)}
                       aria-label={`Delete ${trainee.firstName} ${trainee.lastName}`}
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

export default TraineesTable;
