import React, { useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePendingActions, MdPaid } from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";

const initialFilters = {
  "start date": "",
  "end date": "",
  branch: "",
  program: "",
  status: "",
  source: "",
};

const tableData = [
  { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "PS", branch: "PI", invitationCode: "ABC123", status: "Pending", FU: "wa", date: "2022-01-01", source: "whatsapp" },
  { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "SL", branch: "BSD", invitationCode: "DEF456", status: "Expired", FU: "x", date: "2022-02-01", source: "email" },
  { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LS", branch: "KG", invitationCode: "GHI789", status: "Paid", FU: "1", date: "2022-03-01", source: "google" },
  { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "PSA", branch: "PI", invitationCode: "JKL012", status: "Pending", FU: "2", date: "2022-04-01", source: "instagram" },
  { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "PCPS", branch: "BSD", invitationCode: "MNO345", status: "Expired", FU: "3", date: "2022-05-01", source: "ads" },
  { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "HP", branch: "KG", invitationCode: "PQR678", status: "Paid", FU: "wa", date: "2022-06-01", source: "merryriana" },
  { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "IAY", branch: "PI", invitationCode: "STU901", status: "Pending", FU: "x", date: "2022-07-01", source: "others" },
  { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "PS", branch: "BSD", invitationCode: "VWX234", status: "Expired", FU: "1", date: "2022-08-01", source: "whatsapp" },
];

const cardData = [
  { id: "totalStudent", icon: <PiStudentBold style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Total Prospect", count: "12,628" },
  { id: "pending", icon: <MdOutlinePendingActions style={{ fontSize: "28px", color: "#FFC107" }} />, title: "Pending", count: "12,628" },
  { id: "expired", icon: <RiPassExpiredLine style={{ fontSize: "28px", color: "#F44336" }} />, title: "Expired", count: "2,456" },
  { id: "paid", icon: <MdPaid style={{ fontSize: "28px", color: "#2196F3" }} />, title: "Paid", count: "14,857" },
];

const Card = ({ card, setActiveDetail }) => (
  <div className="col-6 col-sm-4 col-md-3 mb-3">
    <div className="card h-100 shadow-sm text-center" onClick={() => setActiveDetail(card.id)} style={{ cursor: "pointer", borderRadius: "10px" }}>
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="icon mb-2">{card.icon}</div>
        <h6 className="card-title mb-1" style={{ fontSize: "14px", fontWeight: "500" }}>{card.title}</h6>
        <p className="fw-bold mb-0" style={{ fontSize: "18px" }}>{card.count}</p>
      </div>
    </div>
  </div>
);

const SPProgram = ({ setActiveDetail }) => {
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

  const handleFUChange = (id, value) => {
    setData(prevData => prevData.map(item => (item.id === id ? { ...item, FU: value } : item)));
  };


  const filterData = (data) => {
    return data.filter(item => {
      const isWithinDateRange = (!activeFilters["start date"] || new Date(item.date) >= new Date(activeFilters["start date"])) &&
                                (!activeFilters["end date"] || new Date(item.date) <= new Date(activeFilters["end date"]));
      const matchesFilters = Object.entries(activeFilters).every(([key, value]) => !value || item[key] === value);
      return isWithinDateRange && matchesFilters;
    });
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        {["No", "Name", "HP", "Email", "Program", "Branch", "Invitation Code", "Status", "Source", "FU"].map(header => ( // Added 'FU' to the header
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = (data) => (
    <tbody>
      {data.map(({ id, name, hp, email, program, branch, invitationCode, status, FU, source }) => ( // Added 'FU' to the data mapping
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{hp}</td>
          <td>{email}</td>
          <td>{program}</td>
          <td>{branch}</td>
          <td>{invitationCode}</td>
          <td>{status}</td>
          <td>{source}</td>
          <td>
            <select
              className="form-select"
              value={FU}
              onChange={(e) => handleFUChange(id, e.target.value)}
            >
              {["wa", "v", "cb", "1", "2", "3", "x"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {cardData.map(card => (
          <Card key={card.id} card={card} setActiveDetail={setActiveDetail} />
        ))}
      </div>
      <div className="card mt-4">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(initialFilters).map(filterKey => (
              <div className="col-md-2" key={filterKey}>
                <label className="form-label">{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</label>
                {filterKey.includes("date") ? (
                  <input
                    type="date"
                    className="form-control"
                    name={filterKey}
                    value={filters[filterKey]}
                    onChange={handleFilterChange}
                  />
                ) : (
                  <select
                    className="form-select"
                    name={filterKey}
                    value={filters[filterKey]}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    {filterKey === "branch" && ["PI", "BSD", "KG"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "program" && ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "status" && ["Pending", "Expired", "Paid"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "source" && ["whatsapp", "email", "google", "instagram", "ads", "merryriana", "others"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "FU" && ["wa", "v", "cb", "1", "2", "3", "x"].map(option => <option key={option} value={option}>{option}</option>)}
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
      <div className="card mt-4">
        <div className="card-header">
          <h5>List Prospect</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              {renderTableHeader()}
              {renderTableBody(filterData(data))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPProgram;
