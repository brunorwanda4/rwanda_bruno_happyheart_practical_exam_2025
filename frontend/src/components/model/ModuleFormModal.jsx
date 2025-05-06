import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ModuleFormModal = ({ isOpen, onClose, onSubmit, module }) => {
  const [formData, setFormData] = useState({
    modName: '',
    modCredits: 0
  });

  useEffect(() => {
    if (module) {
      setFormData({
        modName: module.modName,
        modCredits: module.modCredits
      });
    } else {
      setFormData({
        modName: '',
        modCredits: 0
      });
    }
  }, [module]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'modCredits' ? parseInt(value) || 0 : value
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
            {module ? 'Edit Module' : 'Add New Module'}
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Module Name</span>
            </label>
            <input
              type="text"
              name="modName"
              className="input input-bordered w-full"
              value={formData.modName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Credits</span>
            </label>
            <input
              type="number"
              name="modCredits"
              min="0"
              className="input input-bordered w-full"
              value={formData.modCredits}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="modal-action mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {module ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleFormModal;