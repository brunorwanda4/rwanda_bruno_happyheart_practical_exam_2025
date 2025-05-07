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

  // Function to fetch trainees and trades data
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
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching data:", err); // Log the error for debugging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Handler for deleting a trainee
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3004/api/trainees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete trainee');
      // Update the state by removing the deleted trainee
      setTrainees(trainees.filter(trainee => trainee.trainee_id !== id));
    } catch (err) {
      console.error("Error deleting trainee:", err); // Log the error for debugging
      setError(err.message);
    }
  };

  // Handler for submitting the trainee form (add or update)
  const handleSubmit = async (traineeData) => {
    try {
      let url;
      let method;

      // Determine if we are adding or updating based on currentTrainee state
      if (currentTrainee) {
        // --- FIX FOCUS ---
        // Ensure currentTrainee has a trainee_id before attempting update
        if (!currentTrainee.trainee_id) {
            console.error("Error: currentTrainee is set but trainee_id is missing!");
            setError("Cannot update trainee: ID is missing.");
            setIsModalOpen(false); // Close the modal
            setCurrentTrainee(null); // Reset currentTrainee
            return; // Stop the submission process
        }
        url = `http://localhost:3004/api/trainees/${currentTrainee.trainee_id}`;
        method = 'PUT';
      } else {
        url = 'http://localhost:3004/api/trainees';
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(traineeData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get more details from the response
        throw new Error(`Failed to ${currentTrainee ? 'update' : 'create'} trainee: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Refetch data to update the table after successful operation
      fetchData();
      // Close the modal and reset currentTrainee state
      setIsModalOpen(false);
      setCurrentTrainee(null);
    } catch (err) {
      console.error("Error submitting trainee form:", err); // Log the error for debugging
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trainees Management</h1>
        <div className="flex gap-2">
          {/* Button to open the modal for adding a new trainee */}
          <button
            onClick={() => {
              setCurrentTrainee(null); // Ensure no trainee is selected when adding
              setIsModalOpen(true);
            }}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" /> Add Trainee
          </button>
          {/* Button to refresh the data */}
          <button
            onClick={fetchData}
            className="btn btn-ghost"
            disabled={loading} // Disable button while loading
          >
            <FaSync className={loading ? 'animate-spin' : ''} /> {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Display error message if there is one */}
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

      {/* Display loading spinner or the trainees table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="card bg-base-100 shadow">
          <div className="card-body p-0">
            {/* Trainees table component */}
            <TraineesTable
              trainees={trainees}
              trades={trades}
              // Handler for editing a trainee - THIS IS WHERE THE FULL TRAINEE OBJECT NEEDS TO BE PASSED FROM TraineesTable
              onEdit={(trainee) => {
                // Ensure the trainee object passed from TraineesTable contains trainee_id
                if (trainee && trainee.trainee_id !== undefined) {
                    setCurrentTrainee(trainee);
                    setIsModalOpen(true);
                } else {
                    console.error("Attempted to edit trainee, but trainee object or trainee_id is missing:", trainee);
                    setError("Could not prepare trainee for editing: ID missing.");
                }
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}

      {/* Trainee form modal component */}
      <TraineeFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentTrainee(null); // Reset currentTrainee on modal close
        }}
        onSubmit={handleSubmit}
        trainee={currentTrainee} // Pass the selected trainee data to the modal
        trades={trades}
      />
    </div>
  );
};

export default TraineesPage;
