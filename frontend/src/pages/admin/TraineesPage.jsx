import { useState, useEffect } from 'react';
import { FaPlus, FaSync } from 'react-icons/fa';
import TraineesTable from '../../components/tables/TraineesTable';
import TraineeFormModal from '../../components/model/TraineeFormModal';
const TraineesPage = () => {
  const [trainees, setTrainees] = useState([]);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrainee, setCurrentTrainee] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [traineesRes, tradesRes] = await Promise.all([
        fetch('http://localhost:3004/api/trainees'),
        fetch('http://localhost:3004/api/trades')
      ]);
      
      if (!traineesRes.ok) throw new Error('Failed to fetch trainees');
      if (!tradesRes.ok) throw new Error('Failed to fetch trades');
      
      const [traineesData, tradesData] = await Promise.all([
        traineesRes.json(),
        tradesRes.json()
      ]);
      
      setTrainees(traineesData);
      setTrades(tradesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3004/api/trainees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete trainee');
      setTrainees(trainees.filter(trainee => trainee.trainee_id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (traineeData) => {
    try {
      const url = currentTrainee 
        ? `http://localhost:3004/api/trainees/${currentTrainee.trainee_id}`
        : 'http://localhost:3004/api/trainees';
      
      const method = currentTrainee ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(traineeData),
      });

      if (!response.ok) throw new Error(`Failed to ${currentTrainee ? 'update' : 'create'} trainee`);
      
      fetchData();
      setIsModalOpen(false);
      setCurrentTrainee(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trainees Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" /> Add Trainee
          </button>
          <button 
            onClick={fetchData}
            className="btn btn-ghost"
          >
            <FaSync className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="card bg-base-100 shadow">
          <div className="card-body p-0">
            <TraineesTable
              trainees={trainees}
              trades={trades}
              onEdit={(trainee) => {
                setCurrentTrainee(trainee);
                setIsModalOpen(true);
              }} 
              onDelete={handleDelete} 
            />
          </div>
        </div>
      )}

      <TraineeFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentTrainee(null);
        }}
        onSubmit={handleSubmit}
        trainee={currentTrainee}
        trades={trades}
      />
    </div>
  );
};

export default TraineesPage;