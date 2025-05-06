import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMarks = () => {
  const [marks, setMarks] = useState({
    trainee_id: '',
    trade_id: '',
    module_id: '',
    user_id: '',
    formative_ass: '',
    summative_ass: '',
    comprehensive_ass: '',
    total_marks_100: ''
  });

  const [trainees, setTrainees] = useState([]);
  const [trades, setTrades] = useState([]);
  const [modules, setModules] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [calculatedTotal, setCalculatedTotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [traineesRes, tradesRes, modulesRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3004/api/trainees'),
          axios.get('http://localhost:3004/api/trades'),
          axios.get('http://localhost:3004/api/modules'),
          axios.get('http://localhost:3004/api/users')
        ]);
        setTrainees(traineesRes.data);
        setTrades(tradesRes.data);
        setModules(modulesRes.data);
        setUsers(usersRes.data);
      } catch  {
        setMessage('Failed to load required data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (marks.formative_ass && marks.summative_ass && marks.comprehensive_ass) {
      const total = (
        parseFloat(marks.formative_ass) * 0.3 +
        parseFloat(marks.summative_ass) * 0.4 +
        parseFloat(marks.comprehensive_ass) * 0.3
      ).toFixed(2);
      setCalculatedTotal(total);
      setMarks(prev => ({ ...prev, total_marks_100: total }));
    }
  }, [marks.formative_ass, marks.summative_ass, marks.comprehensive_ass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/api/marks', marks);
      setMessage('Marks recorded successfully!');
      setMarks({
        trainee_id: '',
        trade_id: '',
        module_id: '',
        user_id: '',
        formative_ass: '',
        summative_ass: '',
        comprehensive_ass: '',
        total_marks_100: ''
      });
      setCalculatedTotal(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error recording marks');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarks(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center mt-10">Loading data...</div>;

  return (
    <div className="min-h-screen bg-base-200 p-6 flex justify-center">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Record Marks</h2>

          {message && (
            <div className={`alert mt-4 ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-control gap-4 mt-6">
            <div>
              <label className="label"><span className="label-text">Trainee</span></label>
              <select name="trainee_id" className="select select-bordered" value={marks.trainee_id} onChange={handleChange} required>
                <option value="">Select Trainee</option>
                {trainees.map(t => (
                  <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label"><span className="label-text">Trade</span></label>
              <select name="trade_id" className="select select-bordered" value={marks.trade_id} onChange={handleChange} required>
                <option value="">Select Trade</option>
                {trades.map(t => (
                  <option key={t.id} value={t.id}>{t.trade_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label"><span className="label-text">Module</span></label>
              <select name="module_id" className="select select-bordered" value={marks.module_id} onChange={handleChange} required>
                <option value="">Select Module</option>
                {modules.map(m => (
                  <option key={m.id} value={m.id}>{m.modName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label"><span className="label-text">Assessor</span></label>
              <select name="user_id" className="select select-bordered" value={marks.user_id} onChange={handleChange} required>
                <option value="">Select Assessor</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.username}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 border-t border-base-300 pt-4">
              <h3 className="text-lg font-semibold mb-2">Assessment Marks</h3>

              <div>
                <label className="label"><span className="label-text">Formative Assessment (30%)</span></label>
                <input
                  type="number"
                  name="formative_ass"
                  className="input input-bordered"
                  min="0"
                  max="100"
                  value={marks.formative_ass}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label"><span className="label-text">Summative Assessment (40%)</span></label>
                <input
                  type="number"
                  name="summative_ass"
                  className="input input-bordered"
                  min="0"
                  max="100"
                  value={marks.summative_ass}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label"><span className="label-text">Comprehensive Assessment (30%)</span></label>
                <input
                  type="number"
                  name="comprehensive_ass"
                  className="input input-bordered"
                  min="0"
                  max="100"
                  value={marks.comprehensive_ass}
                  onChange={handleChange}
                  required
                />
              </div>

              {calculatedTotal && (
                <div className="mt-4 p-3 bg-info text-info-content rounded">
                  <strong>Calculated Total: {calculatedTotal}/100</strong>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary mt-6" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Record Marks'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMarks;
