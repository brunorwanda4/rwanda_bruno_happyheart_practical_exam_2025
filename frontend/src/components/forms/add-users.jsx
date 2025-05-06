import React, { useState } from 'react';
import axios from 'axios';

const AddUsers = () => {
  const [user, setUser] = useState({ username: '', hash_password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3004/api/users', user);
      setMessage('User created successfully!');
      setUser({ username: '', hash_password: '' });
    } catch (error) {
      setMessage('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Create User</h2>

          {message && (
            <div className={`alert mt-2 ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-control gap-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={user.username}
                onChange={e => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={user.hash_password}
                onChange={e => setUser({ ...user, hash_password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
