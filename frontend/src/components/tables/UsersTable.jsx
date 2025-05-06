import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

/**
 * Displays a table of users.
 * NOTE: It's generally NOT recommended to display hash_password client-side.
 * This component assumes you are handling data securely and only passing necessary fields.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.users - Array of user objects to display.
 * @param {function(number): void} [props.onEdit] - Callback function when edit is clicked. Receives user_id.
 * @param {function(number): void} [props.onDelete] - Callback function when delete is clicked. Receives user_id.
 */
const UsersTable = ({ users, onEdit, onDelete }) => {
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No user data available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4"> {/* Added overflow for responsiveness */}
      {/* Using DaisyUI table class and Tailwind for margin-top */}
      <table className="table w-full table-zebra">
        {/* table-zebra adds alternating row colors */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            {/* Avoid displaying hash_password for security reasons */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            // Using user_id as a unique key
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>
                <div className="flex items-center space-x-2">
                  {/* Edit Button with React Icon and DaisyUI/Tailwind classes */}
                  {onEdit && (
                    <button
                      className="btn btn-ghost btn-xs" // DaisyUI button classes
                      onClick={() => onEdit(user.user_id)}
                      aria-label={`Edit user ${user.username}`}
                    >
                      <FaEdit />
                    </button>
                  )}
                  {/* Delete Button with React Icon and DaisyUI/Tailwind classes */}
                  {onDelete && (
                    <button
                      className="btn btn-ghost btn-xs text-error" // DaisyUI button classes, text-error for red icon
                      onClick={() => onDelete(user.user_id)}
                       aria-label={`Delete user ${user.username}`}
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

export default UsersTable;
