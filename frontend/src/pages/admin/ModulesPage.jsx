import React, { useState } from 'react';
import axios from 'axios';

const ModulesPage = () => {
  const [module, setModule] = useState({ modName: '', modCredits: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!module.modName || !module.modCredits) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3004/api/modules', module);
      setMessage('Module created successfully!');
      setModule({ modName: '', modCredits: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating module');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Create Module</h2>

          {message && (
            <div className={`alert mt-2 ${message.includes('Error') || message.includes('Please') ? 'alert-error' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-control gap-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text">Module Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter module name"
                value={module.modName}
                onChange={e => setModule({ ...module, modName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Credits</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter credit value"
                min="1"
                value={module.modCredits}
                onChange={e => setModule({ ...module, modCredits: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={loading}
            >
              {loading ? 'Creating Module...' : 'Create Module'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModulesPage;
