import React, { useState } from "react";
import SPProgram from "./SPProgram";
import ProgramDashboard from "./ProgramDashboard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("SP");
  const [activeDetail, setActiveDetail] = useState("totalStudent");

  const tableData = {
    totalStudent: [
      { id: 1, name: "Alice", status: "Active" },
      { id: 2, name: "Bob", status: "Active" },
    ],
    pending: [
      { id: 1, name: "Charlie", status: "Pending" },
      { id: 2, name: "David", status: "Pending" },
    ],
    expired: [
      { id: 1, name: "Eve", status: "Expired" },
      { id: 2, name: "Frank", status: "Expired" },
    ],
    paid: [
      { id: 1, name: "Grace", status: "Paid" },
      { id: 2, name: "Hank", status: "Paid" },
    ],
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {/* Navigation Buttons */}
      <div className="d-flex justify-content-left gap-3 mb-3">
        {["SP", "Program"].map((tab) => (
          <button
            key={tab}
            className={`btn ${
              activeTab === tab ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Dashboard
          </button>
        ))}
      </div>

      {/* Conditional Rendering */}
      {activeTab === "SP" && <SPProgram setActiveDetail={setActiveDetail} />}
      {activeTab === "Program" && <ProgramDashboard />}

      {/* Tampilkan tabel berdasarkan activeDetail */}
      {activeDetail && tableData[activeDetail] && (
        <div className="card mt-4">
          <div className="card-header">
            <h5>
              Detail {activeDetail === "totalStudent" && "Total Student"}
              {activeDetail === "pending" && "Pending"}
              {activeDetail === "expired" && "Expired"}
              {activeDetail === "paid" && "Paid"}
            </h5>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData[activeDetail].map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;