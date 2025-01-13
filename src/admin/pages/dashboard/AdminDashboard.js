import React from "react";

// Example branch data
const BRANCHES = [
  { name: "Branch 1", students: 5000, revenue: "Rp.500Jt" },
  { name: "Branch 2", students: 4000, revenue: "Rp.400Jt" },
  { name: "Branch 3", students: 3000, revenue: "Rp.300Jt" },
  { name: "Branch 4", students: 2000, revenue: "Rp.200Jt" },
  { name: "Branch 5", students: 1000, revenue: "Rp.100Jt" },
];

const AdminDashboard = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3">Dashboard MRE</h4>

      <div className="row g-3">
        {/* Total Students */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <div className="d-flex align-items-center">
                <div className="chart-circle me-3">
                  {/* Example circle */}
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "#4CAF50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "16px",
                    }}
                  >
                    10,000
                  </div>
                </div>
                <div>
                  {BRANCHES.map((branch, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between mb-1"
                    >
                      <span>{branch.name}</span>
                      <span>{branch.students}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <div className="d-flex align-items-center">
                <div className="chart-circle me-3">
                  {/* Example circle */}
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "#FF9800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "16px",
                    }}
                  >
                    Rp.1M
                  </div>
                </div>
                <div>
                  {BRANCHES.map((branch, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between mb-1"
                    >
                      <span>{branch.name}</span>
                      <span>{branch.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Toggle for All Time / Monthly */}
              <div className="mt-3">
                <button className="btn btn-outline-primary me-2">All Time</button>
                <button className="btn btn-outline-secondary">Monthly</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Grafik Student</h5>
              {/* Placeholder for chart */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#eaeaea",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Grafik Revenue</h5>
              {/* Placeholder for chart */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#eaeaea",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
