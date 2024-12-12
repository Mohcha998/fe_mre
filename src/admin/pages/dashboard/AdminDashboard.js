import React, { useState } from "react";
import { FaUserGraduate, FaMicrophoneAlt, FaBrain, FaRocket, FaChalkboardTeacher, FaUserTie, FaPlane, FaVideo } from "react-icons/fa";

const initialFilters = {
  "start date": "",
  "end date": "",
  program: "",
  branch: "",
  class: "",
  status: "",
};

const tableData = [
  { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "PS", branch: "PI", class: "A", status: "Active", date: "2022-01-01" },
  { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "SL", branch: "BSD", class: "B", status: "Active", date: "2022-02-01" },
  { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LS", branch: "KG", class: "A", status: "Active", date: "2022-03-01" },
  { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "PSA", branch: "PI", class: "B", status: "Active", date: "2022-04-01" },
  { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "PCPS", branch: "BSD", class: "A", status: "Inactive", date: "2022-05-01" },
  { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "HP", branch: "KG", class: "B", status: "Inactive", date: "2022-06-01" },
  { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "IAY", branch: "PI", class: "A", status: "Inactive", date: "2022-07-01" },
  { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "PS", branch: "BSD", class: "B", status: "Inactive", date: "2022-08-01" },
];

const AdminDashboard = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState({});
  const [data, setData] = useState(tableData);

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    setActiveFilters(filters);
    setFilters(initialFilters);
  };

  const filterData = (data) => {
    return data.filter(item => {
      const isWithinDateRange = (!activeFilters["start date"] || new Date(item.date) >= new Date(activeFilters["start date"])) &&
                                (!activeFilters["end date"] || new Date(item.date) <= new Date(activeFilters["end date"]));
      return isWithinDateRange && Object.keys(activeFilters).every(key => 
        !activeFilters[key] || item[key] === activeFilters[key]
      );
    });
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        {["No", "Name", "HP", "Email", "Program", "Branch", "Class", "Status"].map(header => (
          <th key={header} className="text-center">{header}</th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = (data) => (
    <tbody>
      {data.map(({ id, name, hp, email, program, branch, class: className, status }) => (
        <tr key={id} className="text-center">
          <td>{id}</td>
          <td>{name}</td>
          <td>{hp}</td>
          <td>{email}</td>
          <td>{program}</td>
          <td>{branch}</td>
          <td>{className}</td>
          <td>{status}</td>
        </tr>
      ))}
    </tbody>
  );

  const cardData = [
    { id: "totalStudentActive", icon: <FaUserGraduate style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Total Student Active", count: "5000" },
    { id: "ps", icon: <FaMicrophoneAlt style={{ fontSize: "28px", color: "#FF5733" }} />, title: "Public Speaking", count: "1000" },
    { id: "sl", icon: <FaBrain style={{ fontSize: "28px", color: "#6A5ACD" }} />, title: "Smart Learning", count: "1000" },
    { id: "ls", icon: <FaRocket style={{ fontSize: "28px", color: "#FF9800" }} />, title: "Life & Success", count: "1000" },
    { id: "psa", icon: <FaChalkboardTeacher style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Public Speaking Academy", count: "1000" },
    { id: "iam", icon: <FaVideo style={{ fontSize: "28px", color: "#E91E63" }} />, title: "I Am YouTuber", count: "1000" },
    { id: "pcps", icon: <FaUserTie style={{ fontSize: "28px", color: "#2196F3" }} />, title: "Private Coaching Public Speaking", count: "450" },
    { id: "hp", icon: <FaPlane style={{ fontSize: "28px", color: "#FFC107" }} />, title: "Holiday Program", count: "325" },
  ];

  const Card = ({ card }) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="card h-100 shadow-sm text-center" style={{ cursor: "pointer", borderRadius: "10px" }}>
        <div className="card-body d-flex flex-column align-items-center p-3">
          <div className="icon mb-2">{card.icon}</div>
          <h6 className="card-title mb-1" style={{ fontSize: "14px", fontWeight: "500" }}>{card.title}</h6>
          <p className="fw-bold mb-0" style={{ fontSize: "18px" }}>{card.count}</p>
        </div>
      </div>
    </div>
  );

  const ProgramDashboard = () => (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {cardData.map(card => <Card key={card.id} card={card} />)}
      </div>
    </div>
  );

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <ProgramDashboard />
      <div className="card mt-4 mx-3">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(initialFilters).map(filterKey => (
              <div className="col-12 col-md-6 col-lg-4" key={filterKey}>
                <label className="form-label">{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</label>
                {filterKey.includes("date") ? (
                  <input type="date" className="form-control" name={filterKey} value={filters[filterKey]} onChange={handleFilterChange} />
                ) : (
                  <select className="form-select" name={filterKey} value={filters[filterKey]} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterKey === "program" && ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "branch" && ["KG", "BSD", "PI"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "class" && ["A", "B"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "status" && ["Active", "Inactive"].map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                )}
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilterSubmit}>
            Filter
          </button>
        </div>
      </div>
      <div className="card mt-4 shadow-sm mx-3">
        <div className="card-header text-white">
          <h5 className="mb-0">List Student</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              {renderTableHeader()}
              {renderTableBody(filterData(data))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;