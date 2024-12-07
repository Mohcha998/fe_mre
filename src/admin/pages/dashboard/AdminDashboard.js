import React, { useState } from "react";
import SPProgram from "./SPProgram";
import ProgramDashboard from "./ProgramDashboard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("SP");
  const [activeDetail, setActiveDetail] = useState("totalStudent");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    branch: "",
    program: "",
    kelas: "",
    statusBayar: "",
  });
  const [activeFilters, setActiveFilters] = useState({});

  const tableData = {
    totalStudent: [
      { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "PS", branch: "PI", invitationCode: "ABC123", status: "Active", FU: "FU1" },
      { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "SL", branch: "BSD", invitationCode: "DEF456", status: "Active", FU: "FU2" },
      { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LS", branch: "KG", invitationCode: "GHI789", status: "Pending", FU: "FU3" },
      { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "PSA", branch: "PI", invitationCode: "JKL012", status: "Pending", FU: "FU4" },
      { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "PCPS", branch: "BSD", invitationCode: "MNO345", status: "Expired", FU: "FU5" },
      { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "HP", branch: "KG", invitationCode: "PQR678", status: "Expired", FU: "FU6" },
      { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "IAY", branch: "PI", invitationCode: "STU901", status: "Paid", FU: "FU7" },
      { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "PS", branch: "BSD", invitationCode: "VWX234", status: "Paid", FU: "FU8" },
    ],
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>HP</th>
        <th>Email</th>
        <th>Program</th>
        <th>Branch</th>
        <th>Invitation Code</th>
        <th>Status</th>
        <th>FU</th>
        <th>Action</th>
      </tr>
    </thead>
  );

  const renderTableBody = (data) => (
    <tbody>
      {data.map(({ id, name, hp, email, program, branch, invitationCode, status, FU }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{hp}</td>
          <td>{email}</td>
          <td>{program}</td>
          <td>{branch}</td>
          <td>{invitationCode}</td>
          <td>{status}</td>
          <td>{FU}</td>
          <td>Action</td>
        </tr>
      ))}
    </tbody>
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    setActiveFilters(filters);
    setFilters({
      startDate: "",
      endDate: "",
      branch: "",
      program: "",
      kelas: "",
      statusBayar: "",
    });
  };

  const filterData = (data) => {
    return data.filter((item) => {
      const isWithinDateRange =
        (!activeFilters.startDate || new Date(item.date) >= new Date(activeFilters.startDate)) &&
        (!activeFilters.endDate || new Date(item.date) <= new Date(activeFilters.endDate));
      const isProgram = !activeFilters.program || item.program === activeFilters.program;
      const isBranch = !activeFilters.branch || item.branch === activeFilters.branch;
      const isKelas = !activeFilters.kelas || item.kelas === activeFilters.kelas;
      const isStatus = !activeFilters.statusBayar || item.status === activeFilters.statusBayar;

      return isWithinDateRange && isProgram && isBranch && isKelas && isStatus;
    });
  };

  const renderDetailHeader = () => {
    const detailHeaders = {
      totalStudent: "Total Student",
      pending: "Pending",
      expired: "Expired",
      paid: "Paid",
    };
    return detailHeaders[activeDetail] || "Detail";
  };

  const renderFilterInput = (label, type, name, value, options) => {
    if (type === "select") {
      return (
        <div className="col-md-2">
          <label className="form-label">{label}</label>
          <select className="form-select" name={name} value={value} onChange={handleFilterChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return (
      <div className="col-md-2">
        <label className="form-label">{label}</label>
        <input type={type} className="form-control" name={name} value={value} onChange={handleFilterChange} />
      </div>
    );
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex justify-content-left gap-3 mb-3">
        {["Sesi Perkenalan", "Program"].map((tab) => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Sesi Perkenalan" && <SPProgram setActiveDetail={setActiveDetail} />}
      {activeTab === "Program" && <ProgramDashboard />}

      {/* Filter Section */}
      <div className="card mt-4">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {renderFilterInput("Start Date", "date", "startDate", filters.startDate)}
            {renderFilterInput("End Date", "date", "endDate", filters.endDate)}
            {renderFilterInput("Program", "select", "program", filters.program, [
              { value: "", label: "All" },
              { value: "PS", label: "PS" },
              { value: "SL", label: "SL" },
              { value: "LS", label: "LS" },
              { value: "PSA", label: "PSA" },
              { value: "PCPS", label: "PCPS" },
              { value: "HP", label: "HP" },
              { value: "IAY", label: "IAY" },
            ])}
            {renderFilterInput("Branch", "select", "branch", filters.branch, [
              { value: "", label: "All" },
              { value: "PI", label: "PI" },
              { value: "BSD", label: "BSD" },
              { value: "KG", label: "KG" },
            ])}
            {renderFilterInput("Class", "select", "kelas", filters.kelas, [
              { value: "", label: "All" },
              { value: "A", label: "A" },
              { value: "B", label: "B" },
            ])}
            {renderFilterInput("Status", "select", "statusBayar", filters.statusBayar, [
              { value: "", label: "All" },
              { value: "Active", label: "Active" },
              { value: "Pending", label: "Pending" },
              { value: "Expired", label: "Expired" },
              { value: "Paid", label: "Paid" },
            ])}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilterSubmit}>
            Filter
          </button>
        </div>
      </div>

      {/* Table Section */}
      {activeDetail && tableData[activeDetail] && (
        <div className="card mt-4">
          <div className="card-header">
            <h5>Detail {renderDetailHeader()}</h5>
          </div>
          <div className="card-body">
            <table className="table">
              {renderTableHeader()}
              {renderTableBody(filterData(tableData[activeDetail]))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
