import { useState, useEffect } from "react";
import { FaPlus, FaSync } from "react-icons/fa";
import MarksTable from "../../components/tables/MarksTable";
import MarkFormModal from "./MarkFormModal";

const MarksPage = () => {
  const [marks, setMarks] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [trades, setTrades] = useState([]);
  const [modules, setModules] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMark, setCurrentMark] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [marksRes, traineesRes, tradesRes, modulesRes, usersRes] =
        await Promise.all([
          fetch("http://localhost:3004/api/marks"),
          fetch("http://localhost:3004/api/trainees"),
          fetch("http://localhost:3004/api/trades"),
          fetch("http://localhost:3004/api/modules"),
          fetch("http://localhost:3004/api/users"),
        ]);

      if (!marksRes.ok) throw new Error("Failed to fetch marks");
      if (!traineesRes.ok) throw new Error("Failed to fetch trainees");
      if (!tradesRes.ok) throw new Error("Failed to fetch trades");
      if (!modulesRes.ok) throw new Error("Failed to fetch modules");
      if (!usersRes.ok) throw new Error("Failed to fetch users");

      const [marksData, traineesData, tradesData, modulesData, usersData] =
        await Promise.all([
          marksRes.json(),
          traineesRes.json(),
          tradesRes.json(),
          modulesRes.json(),
          usersRes.json(),
        ]);

      setMarks(marksData);
      setTrainees(traineesData);
      setTrades(tradesData);
      setModules(modulesData);
      setUsers(usersData);
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
      const response = await fetch(`http://localhost:3004/api/marks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete mark");
      setMarks(marks.filter((mark) => mark.markId !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (markData) => {
    try {
      const url = currentMark
        ? `http://localhost:3004/api/marks/${currentMark.markId}`
        : "http://localhost:3004/api/marks";

      const method = currentMark ? "PUT" : "POST";

      // Calculate total marks
      const total = (
        (parseFloat(markData.formative_ass) || 0) * 0.3 +
        (parseFloat(markData.summative_ass) || 0) * 0.3 +
        (parseFloat(markData.comprehensive_ass) || 0) * 0.4
      ).toFixed(2);

      const payload = {
        ...markData,
        total_marks_100: total,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error(`Failed to ${currentMark ? "update" : "create"} mark`);

      fetchData();
      setIsModalOpen(false);
      setCurrentMark(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Marks Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" /> Add Marks
          </button>
          <button onClick={fetchData} className="btn btn-ghost">
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
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
            <MarksTable
              marks={marks}
              trainees={trainees}
              trades={trades}
              modules={modules}
              users={users}
              onEdit={(mark) => {
                setCurrentMark(mark);
                setIsModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}

      <MarkFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentMark(null);
        }}
        onSubmit={handleSubmit}
        mark={currentMark}
        trainees={trainees}
        trades={trades}
        modules={modules}
        users={users}
      />
    </div>
  );
};


export default MarksPage