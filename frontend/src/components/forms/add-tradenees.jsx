import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTrainees = () => {
  const [trainee, setTrainee] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    trade_id: ''
  });
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get('http://localhost:3004/api/trades');
        setTrades(response.data);
      } catch (error) {
        setMessage('Error fetching trades');
      }
    };
    fetchTrades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3004/api/trainees', trainee);
      setMessage('Trainee added successfully!');
      setTrainee({ firstName: '', lastName: '', gender: 'Male', trade_id: '' });
    } catch (error) {
      setMessage('Error adding trainee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Add Trainee</h2>

          {message && (
            <div className={`alert mt-2 ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-control gap-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={trainee.firstName}
                onChange={e => setTrainee({ ...trainee, firstName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={trainee.lastName}
                onChange={e => setTrainee({ ...trainee, lastName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={trainee.gender}
                onChange={e => setTrainee({ ...trainee, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Trade</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={trainee.trade_id}
                onChange={e => setTrainee({ ...trainee, trade_id: e.target.value })}
                required
              >
                <option value="">Select a trade</option>
                {trades.map(trade => (
                  <option key={trade.id} value={trade.id}>{trade.trade_name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Trainee'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrainees;
