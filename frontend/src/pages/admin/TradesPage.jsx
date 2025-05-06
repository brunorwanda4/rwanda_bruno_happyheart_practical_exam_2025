import React, { useState } from 'react';
import axios from 'axios';

const TradesPage = () => {
  const [trade, setTrade] = useState({ trade_name: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3004/api/trades', trade);
      setMessage('Trade created successfully!');
      setTrade({ trade_name: '' });
    } catch (error) {
      setMessage('Error creating trade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Create Trade</h2>

          {message && (
            <div className={`alert mt-2 ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-control gap-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text">Trade Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={trade.trade_name}
                onChange={e => setTrade({ ...trade, trade_name: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Trade'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TradesPage;
