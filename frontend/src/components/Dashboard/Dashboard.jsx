import React from "react";

const Dashboard = () => {
  const stats = {
    total: 10,
    completed: 6,
    pending: 4,
  };

  return (
    <div className="container">
      <h2>📊 Dashboard</h2>

      <div className="card">
        <p>Total Tasks: {stats.total}</p>
        <p>Completed: {stats.completed}</p>
        <p>Pending: {stats.pending}</p>
      </div>
    </div>
  );
};

export default Dashboard;