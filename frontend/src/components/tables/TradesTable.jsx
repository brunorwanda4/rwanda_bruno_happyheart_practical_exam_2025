import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

/**
 * Displays a table of trades.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.trades - Array of trade objects to display.
 * @param {function(number): void} [props.onEdit] - Callback function when edit is clicked. Receives trade id.
 * @param {function(number): void} [props.onDelete] - Callback function when delete is clicked. Receives trade id.
 */
const TradesTable = ({ trades, onEdit, onDelete }) => {
  if (!trades || trades.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No trade data available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4"> {/* Added overflow for responsiveness */}
      {/* Using DaisyUI table class and Tailwind for margin-top */}
      <table className="table w-full table-zebra">
        {/* table-zebra adds alternating row colors */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Trade Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            // Using trade.id as a unique key
            <tr key={trade.id}>
              <td>{trade.id}</td>
              <td>{trade.trade_name}</td>
              <td>
                <div className="flex items-center space-x-2">
                  {/* Edit Button with React Icon and DaisyUI/Tailwind classes */}
                  {onEdit && (
                    <button
                      className="btn btn-ghost btn-xs" // DaisyUI button classes
                      onClick={() => onEdit(trade.id)}
                      aria-label={`Edit trade ${trade.trade_name}`}
                    >
                      <FaEdit />
                    </button>
                  )}
                  {/* Delete Button with React Icon and DaisyUI/Tailwind classes */}
                  {onDelete && (
                    <button
                      className="btn btn-ghost btn-xs text-error" // DaisyUI button classes, text-error for red icon
                      onClick={() => onDelete(trade.id)}
                       aria-label={`Delete trade ${trade.trade_name}`}
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

export default TradesTable;
