import { useState, useEffect } from "react";
import { FaPlus, FaSync } from "react-icons/fa";
import ModuleFormModal from "../../components/model/ModuleFormModal";
import ModulesTable from "../../components/tables/ModulesTable";

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3004/api/modules");
      if (!response.ok) throw new Error("Failed to fetch modules");
      const data = await response.json(); // This should receive and set an array of modules if the backend provides it
      setModules(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3004/api/modules/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete module");
      setModules(modules.filter((module) => module.module_id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (moduleData) => {
    try {
      const url = currentModule
        ? `http://localhost:3004/api/modules/${currentModule.module_id}`
        : "http://localhost:3004/api/modules";
      const method = currentModule ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      });

      if (!response.ok)
        throw new Error(
          `Failed to ${currentModule ? "update" : "create"} module`
        ); // Re-fetch modules after successful submit to update the list
      fetchModules();
      setIsModalOpen(false);
      setCurrentModule(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-bold">Modules Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            Add Module
          </button>
          <button onClick={fetchModules} className="btn btn-ghost">
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>
      {error && (
        <div className="alert alert-error mb-4 flex">
          <div className=" flex">
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
            <ModulesTable
              modules={modules} // This receives the array from state
              onEdit={(module) => {
                setCurrentModule(module);
                setIsModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
      <ModuleFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentModule(null);
        }}
        onSubmit={handleSubmit}
        module={currentModule}
      />
    </div>
  );
};

export default ModulesPage;
