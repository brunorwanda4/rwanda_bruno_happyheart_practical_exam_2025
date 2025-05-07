import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaChartBar,
  FaUserGraduate,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    trainees: 0,
    trades: 0,
    modules: 0,
    users: 0,
    marks: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentTrainees, setRecentTrainees] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [weakPerformers, setWeakPerformers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [
          traineesRes,
          tradesRes,
          modulesRes,
          usersRes,
          marksRes,
          recentTraineesRes,
          performanceRes,
        ] = await Promise.all([
          fetch("http://localhost:3004/api/trainees"),
          fetch("http://localhost:3004/api/trades"),
          fetch("http://localhost:3004/api/modules"),
          fetch("http://localhost:3004/api/users"),
          fetch("http://localhost:3004/api/marks"),
          fetch(
            "http://localhost:3004/api/trainees?_limit=5&_sort=trainee_id&_order=desc"
          ),
          fetch(
            "http://localhost:3004/api/marks?_expand=trainee&_sort=total_marks_100&_order=desc&_limit=5"
          ),
        ]);

        if (!traineesRes.ok) throw new Error("Failed to fetch trainees");
        if (!tradesRes.ok) throw new Error("Failed to fetch trades");
        if (!modulesRes.ok) throw new Error("Failed to fetch modules");
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        if (!marksRes.ok) throw new Error("Failed to fetch marks");
        if (!recentTraineesRes.ok)
          throw new Error("Failed to fetch recent trainees");
        if (!performanceRes.ok)
          throw new Error("Failed to fetch performance data");

        const [
          traineesData,
          tradesData,
          modulesData,
          usersData,
          marksData,
          recentTraineesData,
          performanceData,
        ] = await Promise.all([
          traineesRes.json(),
          tradesRes.json(),
          modulesRes.json(),
          usersRes.json(),
          marksRes.json(),
          recentTraineesRes.json(),
          performanceRes.json(),
        ]);

        // Calculate average score
        const avgScore =
          marksData.length > 0
            ? marksData.reduce(
                (sum, mark) => sum + parseFloat(mark.total_marks_100),
                0
              ) / marksData.length
            : 0;

        setStats({
          trainees: traineesData.length,
          trades: tradesData.length,
          modules: modulesData.length,
          users: usersData.length,
          marks: marksData.length,
          averageScore: avgScore.toFixed(2),
        });

        setRecentTrainees(recentTraineesData);

        // Get top 5 and bottom 5 performers
        const sortedMarks = [...performanceData].sort(
          (a, b) => b.total_marks_100 - a.total_marks_100
        );
        setTopPerformers(sortedMarks.slice(0, 5));
        setWeakPerformers(sortedMarks.slice(-5).reverse());

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg max-w-4xl mx-auto mt-8">
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
          <span>Error loading dashboard data: {error}</span>
        </div>
      </div>
    );
  }
  const storedToken = localStorage.getItem("authToken");

  const decodedToken = jwtDecode(storedToken);
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">SOS MIS Dashboard</h1>
        <p>Welcome back {decodedToken.username} ☺️</p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/trainees"
          className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
        >
          <div className="card-body">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FaUserGraduate size={24} />
              </div>
              <div>
                <h2 className="card-title">Trainees</h2>
                <p className="text-3xl font-bold">{stats.trainees}</p>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/trades"
          className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
        >
          <div className="card-body">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FaChalkboardTeacher size={24} />
              </div>
              <div>
                <h2 className="card-title">Trades</h2>
                <p className="text-3xl font-bold">{stats.trades}</p>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/modules"
          className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
        >
          <div className="card-body">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FaBook size={24} />
              </div>
              <div>
                <h2 className="card-title">Modules</h2>
                <p className="text-3xl font-bold">{stats.modules}</p>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/users"
          className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
        >
          <div className="card-body">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <FaUsers size={24} />
              </div>
              <div>
                <h2 className="card-title">Users</h2>
                <p className="text-3xl font-bold">{stats.users}</p>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/marks"
          className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
        >
          <div className="card-body">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                <FaClipboardList size={24} />
              </div>
              <div>
                <h2 className="card-title">Marks Recorded</h2>
                <p className="text-3xl font-bold">{stats.marks}</p>
              </div>
            </div>
          </div>
        </Link>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <FaChartBar size={24} />
              </div>
              <div>
                <h2 className="card-title">Average Score</h2>
                <p
                  className={`text-3xl font-bold ${
                    stats.averageScore >= 80
                      ? "text-green-500"
                      : stats.averageScore >= 60
                      ? "text-blue-500"
                      : stats.averageScore >= 40
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {stats.averageScore}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trainees */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Recent Trainees</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrainees.slice(0, 5).map((trainee) => (
                    <tr key={trainee.trainee_id}>
                      <td>
                        {trainee.firstName} {trainee.lastName}
                      </td>
                      <td>{trainee.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link
                to="/admin/trainees"
                className="btn btn-sm btn-primary w-full"
              >
                View All {recentTrainees.length}
              </Link>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Top Performers</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Trainee</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {topPerformers.map((mark) => (
                    <tr key={mark.markId}>
                      <td>
                        {mark.trainee_firstName} {mark.trainee_lastName}
                      </td>
                      <td className="font-bold text-green-500">
                        {mark.total_marks_100}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link to="/admin/marks" className="btn btn-sm btn-primary w-full">
                View All {topPerformers.length}
              </Link>
            </div>
          </div>
        </div>

        {/* Weak Performers */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Need Improvement</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Trainee</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {weakPerformers.map((mark) => (
                    <tr key={mark.markId}>
                      <td>
                        {mark.trainee_firstName} {mark.trainee_lastName}
                      </td>
                      <td className="font-bold text-red-500">
                        {mark.total_marks_100}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link to="/admin/marks" className="btn btn-sm btn-primary w-full">
                View All {weakPerformers.length}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
