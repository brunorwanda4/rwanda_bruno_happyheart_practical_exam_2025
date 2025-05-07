import React from 'react'; // Import React if using JSX

const TraineesTable = ({ trainees, trades, onEdit, onDelete }) => {

  // Helper function to find the trade name by trade_id
  const getTradeName = (tradeId) => {
    const trade = trades.find(trade => trade.id === tradeId);
    return trade ? trade.trade_name : 'Unknown Trade';
  };

  return (
    // Using Tailwind CSS classes for styling the table
    <div className="overflow-x-auto"> {/* Add overflow for responsiveness */}
      <table className="table w-full">
        {/* Table header */}
        <thead>
          <tr>
            <th>ID</th> {/* Assuming your trainee object has an 'id' or 'trainee_id' */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Trade</th>
            <th className="text-right">Actions</th> {/* Align actions to the right */}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Check if trainees array is not empty before mapping */}
          {trainees && trainees.length > 0 ? (
            trainees.map(trainee => (
              // Use trainee_id as the key for list rendering
              <tr key={trainee.trainee_id}>
                <td>{trainee.trainee_id}</td> {/* Display the trainee ID */}
                <td>{trainee.firstName}</td>
                <td>{trainee.lastName}</td>
                <td>{trainee.gender}</td>
                {/* Display the trade name using the helper function */}
                <td>{getTradeName(trainee.trade_id)}</td>
                <td className="flex justify-end gap-2"> {/* Use flexbox to space buttons */}
                  {/* Edit Button */}
                  <button
                    className="btn btn-sm btn-ghost"
                    // --- FIX FOCUS ---
                    // IMPORTANT: Pass the entire trainee object to onEdit
                    onClick={() => onEdit(trainee)}
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    className="btn btn-sm btn-error"
                    // Pass the trainee_id to onDelete
                    onClick={() => onDelete(trainee.trainee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            // Display a message if there are no trainees
            <tr>
              <td colSpan="6" className="text-center py-4">No trainees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TraineesTable;
