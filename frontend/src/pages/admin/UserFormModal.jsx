import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const UserFormModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    username: '',
    hash_password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        hash_password: '' // Don't pre-fill password for security
      });
    } else {
      setFormData({
        username: '',
        hash_password: ''
      });
    }
  }, [user]);

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
            {user ? 'Edit User' : 'Add New User'}
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">
                {user ? 'New Password (leave blank to keep current)' : 'Password'}
              </span>
            </label>
            <input
              type="password"
              name="hash_password"
              className="input input-bordered w-full"
              value={formData.hash_password}
              onChange={handleChange}
              required={!user}
            />
          </div>
          
          <div className="modal-action mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {user ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;