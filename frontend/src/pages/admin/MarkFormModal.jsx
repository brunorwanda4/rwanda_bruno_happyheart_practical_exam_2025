import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const MarkFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  mark, 
  trainees, 
  trades, 
  modules, 
  users 
}) => {
  const [formData, setFormData] = useState({
    trainee_id: trainees[0]?.trainee_id || '',
    trade_id: trades[0]?.id || '',
    module_id: modules[0]?.module_id || '',
    user_id: users[0]?.user_id || '',
    formative_ass: 0,
    summative_ass: 0,
    comprehensive_ass: 0
  });

  const [filteredTrades, setFilteredTrades] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);

  useEffect(() => {
    if (mark) {
      setFormData({
        trainee_id: mark.trainee_id,
        trade_id: mark.trade_id,
        module_id: mark.module_id,
        user_id: mark.user_id,
        formative_ass: mark.formative_ass || 0,
        summative_ass: mark.summative_ass || 0,
        comprehensive_ass: mark.comprehensive_ass || 0
      });
      filterTrades(mark.trainee_id);
      filterModules(mark.trade_id);
    } else if (trainees.length > 0 && trades.length > 0 && modules.length > 0 && users.length > 0) {
      setFormData({
        trainee_id: trainees[0].trainee_id,
        trade_id: '',
        module_id: '',
        user_id: users[0].user_id,
        formative_ass: 0,
        summative_ass: 0,
        comprehensive_ass: 0
      });
      filterTrades(trainees[0].trainee_id);
    }
  }, [mark, trainees, trades, modules, users]);

  const filterTrades = (traineeId) => {
    const trainee = trainees.find(t => t.trainee_id === traineeId);
    if (trainee) {
      const tradesForTrainee = trades.filter(t => t.id === trainee.trade_id);
      setFilteredTrades(tradesForTrainee);
      setFormData(prev => ({
        ...prev,
        trade_id: tradesForTrainee[0]?.id || ''
      }));
      filterModules(tradesForTrainee[0]?.id);
    }
  };

  const filterModules = (tradeId) => {
    // In a real app, you might filter modules based on trade
    // For now, we'll show all modules
    setFilteredModules(modules);
    setFormData(prev => ({
      ...prev,
      module_id: modules[0]?.module_id || ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'trainee_id') {
      filterTrades(value);
    } else if (name === 'trade_id') {
      filterModules(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: name.endsWith('_ass') ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const calculateTotal = () => {
    return (
      (formData.formative_ass * 0.3) +
      (formData.summative_ass * 0.3) +
      (formData.comprehensive_ass * 0.4)
    ).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {mark ? 'Edit Marks' : 'Add New Marks'}
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Trainee</span>
              </label>
              <select
                name="trainee_id"
                className="select select-bordered w-full"
                value={formData.trainee_id}
                onChange={handleChange}
                required
              >
                {trainees.map(trainee => (
                  <option key={trainee.trainee_id} value={trainee.trainee_id}>
                    {trainee.firstName} {trainee.lastName}
                  </option>
                ))}
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
                // disabled={filteredTrades.length <= 1}
              >
                {filteredTrades.map(trade => (
                  <option key={trade.id} value={trade.id}>
                    {trade.trade_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Module</span>
              </label>
              <select
                name="module_id"
                className="select select-bordered w-full"
                value={formData.module_id}
                onChange={handleChange}
                required
              >
                {filteredModules.map(module => (
                  <option key={module.module_id} value={module.module_id}>
                    {module.modName} ({module.modCredits} credits)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Entered By</span>
              </label>
              <select
                name="user_id"
                className="select select-bordered w-full"
                value={formData.user_id}
                onChange={handleChange}
                required
              >
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Formative Assessment (30%)</span>
              </label>
              <input
                type="number"
                name="formative_ass"
                min="0"
                max="100"
                step="0.01"
                className="input input-bordered w-full"
                value={formData.formative_ass}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Summative Assessment (30%)</span>
              </label>
              <input
                type="number"
                name="summative_ass"
                min="0"
                max="100"
                step="0.01"
                className="input input-bordered w-full"
                value={formData.summative_ass}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Comprehensive Assessment (40%)</span>
              </label>
              <input
                type="number"
                name="comprehensive_ass"
                min="0"
                max="100"
                step="0.01"
                className="input input-bordered w-full"
                value={formData.comprehensive_ass}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Total Marks</span>
              </label>
              <div className="p-2 border rounded-lg bg-base-200">
                <span className={`text-lg font-bold ${
                  calculateTotal() >= 80 ? 'text-green-500' :
                  calculateTotal() >= 60 ? 'text-blue-500' :
                  calculateTotal() >= 40 ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {calculateTotal()}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="modal-action mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {mark ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkFormModal;