import React, { useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePendingActions, MdPaid } from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";

// Constants
const BRANCHES = ["PI", "BSD", "KG"];
const PROGRAMS = ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"];
const STATUSES = ["Pending", "Expired", "Paid"];
const SOURCES = ["whatsapp", "email", "google", "instagram", "ads", "merryriana", "others"];
const FU_OPTIONS = ["wa", "v", "cb", "1", "2", "3", "x"];

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
  <div className="col-12 col-sm-6 col-md-3">
    <div className="card h-100 shadow-sm" role="button" onClick={() => setActiveDetail(card.id)}>
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="mb-2">{card.icon}</div>
        <h6 className="card-title mb-1">{card.title}</h6>
        <p className="fw-bold mb-0">{card.count}</p>
      </div>
    </div>
  </div>
);

const TableHeader = () => (
  <thead>
    <tr>
      {["No", "Name", "HP", "Email", "Program", "Branch", "Code", "Status", "Source", "FU"].map(header => (
        <th key={header} className="text-center">{header}</th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({ item, onFUChange }) => (
  <tr>
    <td className="text-center">{item.id}</td>
    <td>{item.name}</td>
    <td>{item.hp}</td>
    <td>{item.email}</td>
    <td>{item.program}</td>
    <td>{item.branch}</td>
    <td>{item.invitationCode}</td>
    <td className="text-center">{item.status}</td>
    <td className="text-center">{item.source}</td>
    <td className="text-center">
      <select
        className="form-select form-select-sm"
        value={item.FU}
        onChange={(e) => onFUChange(item.id, e.target.value)}
      >
        {FU_OPTIONS.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </td>
  </tr>
);

const FilterInput = ({ name, value, onChange, options }) => {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  
  if (name.includes("date")) {
    return (
      <div className="col-md-2">
        <label className="form-label">{label}</label>
        <input
          type="date"
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className="col-md-2">
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">All</option>
        {options?.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

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
    setData(prevData => 
      prevData.map(item => item.id === id ? { ...item, FU: value } : item)
    );
  };

  const filterData = (data) => {
    return data.filter(item => {
      const startDate = activeFilters["start date"] ? new Date(activeFilters["start date"]) : null;
      const endDate = activeFilters["end date"] ? new Date(activeFilters["end date"]) : null;
      const itemDate = new Date(item.date);

      const isWithinDateRange = 
        (!startDate || itemDate >= startDate) && 
        (!endDate || itemDate <= endDate);

      const matchesFilters = Object.entries(activeFilters)
        .filter(([key]) => !key.includes("date"))
        .every(([key, value]) => !value || item[key] === value);

      return isWithinDateRange && matchesFilters;
    });
  };

  const getFilterOptions = (filterKey) => {
    const optionsMap = {
      branch: BRANCHES,
      program: PROGRAMS,
      status: STATUSES,
      source: SOURCES,
      FU: FU_OPTIONS
    };
    return optionsMap[filterKey];
  };

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
            {Object.entries(filters).map(([key, value]) => (
              <FilterInput
                key={key}
                name={key}
                value={value}
                onChange={handleFilterChange}
                options={getFilterOptions(key)}
              />
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilterSubmit}>
            Filter
          </button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header text-white">
          <h5 className="mb-0">List Prospect</h5>
        </div>
        <div className="card-body px-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <TableHeader />
              <tbody>
                {filterData(data).map(item => (
                  <TableRow key={item.id} item={item} onFUChange={handleFUChange} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPProgram;
