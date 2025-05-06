import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const TradeFormModal = ({ isOpen, onClose, onSubmit, trade }) => {
  const [tradeName, setTradeName] = useState('');

  useEffect(() => {
    if (trade) {
      setTradeName(trade.trade_name);
    } else {
      setTradeName('');
    }
  }, [trade]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ trade_name: tradeName });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {trade ? 'Edit Trade' : 'Add New Trade'}
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Trade Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={tradeName}
              onChange={(e) => setTradeName(e.target.value)}
              required
            />
          </div>
          
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {trade ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeFormModal;