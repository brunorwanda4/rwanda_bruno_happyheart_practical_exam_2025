import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

/**
 * Displays a table of modules.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.modules - Array of module objects to display.
 * @param {function(number): void} [props.onEdit] - Callback function when edit is clicked. Receives module_id.
 * @param {function(number): void} [props.onDelete] - Callback function when delete is clicked. Receives module_id.
 */
const ModulesTable = ({ modules, onEdit, onDelete }) => {
  if (!modules || modules.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No module data available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4"> {/* Added overflow for responsiveness */}
      {/* Using DaisyUI table class and Tailwind for margin-top */}
      <table className="table w-full table-zebra">
        {/* table-zebra adds alternating row colors */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Module Name</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            // Using module_id as a unique key
            <tr key={module.module_id}>
              <td>{module.module_id}</td>
              <td>{module.modName}</td>
              <td>{module.modCredits}</td>
              <td>
                <div className="flex items-center space-x-2">
                  {/* Edit Button with React Icon and DaisyUI/Tailwind classes */}
                  {onEdit && (
                    <button
                      className="btn btn-ghost btn-xs" // DaisyUI button classes
                      onClick={() => onEdit(module.module_id)}
                       aria-label={`Edit module ${module.modName}`}
                    >
                      <FaEdit />
                    </button>
                  )}
                  {/* Delete Button with React Icon and DaisyUI/Tailwind classes */}
                  {onDelete && (
                    <button
                      className="btn btn-ghost btn-xs text-error" // DaisyUI button classes, text-error for red icon
                      onClick={() => onDelete(module.module_id)}
                       aria-label={`Delete module ${module.modName}`}
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

export default ModulesTable;
