import { FaEdit, FaTrash } from 'react-icons/fa';

const TradesTable = ({ trades, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Trade Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.id}</td>
              <td>{trade.trade_name}</td>
              <td className="flex gap-2">
                <button 
                  onClick={() => onEdit(trade)} 
                  className="btn btn-sm btn-primary"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => onDelete(trade.id)} 
                  className="btn btn-sm btn-error"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradesTable;