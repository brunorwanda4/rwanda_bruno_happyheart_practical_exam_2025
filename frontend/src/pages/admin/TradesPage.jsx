import { useState, useEffect } from 'react';
import { FaPlus, FaSync } from 'react-icons/fa';
import TradesTable from '../../components/tables/TradesTable';
import TradeFormModal from '../../components/model/TradeFormModal';

const TradesPage = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrade, setCurrentTrade] = useState(null);

  const fetchTrades = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3004/api/trades');
      if (!response.ok) throw new Error('Failed to fetch trades');
      const data = await response.json();
      setTrades(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3004/api/trades/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete trade');
      setTrades(trades.filter(trade => trade.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (tradeData) => {
    try {
      const url = currentTrade 
        ? `http://localhost:3004/api/trades/${currentTrade.id}`
        : 'http://localhost:3004/api/trades';
      
      const method = currentTrade ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tradeData),
      });

      if (!response.ok) throw new Error(`Failed to ${currentTrade ? 'update' : 'create'} trade`);
      
      fetchTrades();
      setIsModalOpen(false);
      setCurrentTrade(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trades Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" /> Add Trade
          </button>
          <button 
            onClick={fetchTrades}
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
            <TradesTable
              trades={trades} 
              onEdit={(trade) => {
                setCurrentTrade(trade);
                setIsModalOpen(true);
              }} 
              onDelete={handleDelete} 
            />
          </div>
        </div>
      )}

      <TradeFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentTrade(null);
        }}
        onSubmit={handleSubmit}
        trade={currentTrade}
      />
    </div>
  );
};

export default TradesPage;