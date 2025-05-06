import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const TraineeFormModal = ({ isOpen, onClose, onSubmit, trainee, trades }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    trade_id: trades[0]?.id || ''
  });

  useEffect(() => {
    if (trainee) {
      setFormData({
        firstName: trainee.firstName,
        lastName: trainee.lastName,
        gender: trainee.gender,
        trade_id: trainee.trade_id
      });
    } else if (trades.length > 0) {
      setFormData(prev => ({
        ...prev,
        trade_id: trades[0].id
      }));
    }
  }, [trainee, trades]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {trainee ? 'Edit Trainee' : 'Add New Trainee'}
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="input input-bordered w-full"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="input input-bordered w-full"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                name="gender"
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Trade</span>
              </label>
              <select
                name="trade_id"
                className="select select-bordered w-full"
                value={formData.trade_id}
                onChange={handleChange}
                required
              >
                {trades.map(trade => (
                  <option key={trade.id} value={trade.id}>
                    {trade.trade_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="modal-action mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {trainee ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TraineeFormModal;