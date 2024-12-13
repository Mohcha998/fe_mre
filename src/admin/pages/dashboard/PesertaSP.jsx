import React, { useState } from "react";

// Constants
const PROGRAMS = ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"];
const BRANCHES = ["KG", "BSD", "PI"];
const STATUSES = ["Pending", "Expired", "Paid", "N/A"];
const SOURCES = ["merryriana", "instagram", "ads", "google", "whatsapp", "email", "others"];

const initialFilters = {
  "start date": "",
  "end date": "",
  program: "",
  branch: "",
  status: "",
  source: "",
};

const tableData = [
  { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "PS", branch: "PI", status: "Pending", date: "2022-01-01", spDate: "10 Jan 2022", source: "whatsapp" },
  { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "SL", branch: "BSD", status: "Pending", date: "2022-02-01", spDate: "10 Feb 2022", source: "instagram" },
  { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LS", branch: "KG", status: "Expired", date: "2022-03-01", spDate: "10 Mar 2022", source: "ads" },
  { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "PSA", branch: "PI", status: "Expired", date: "2022-04-01", spDate: "10 Apr 2022", source: "google" },
  { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "PCPS", branch: "BSD", status: "Paid", date: "2022-05-01", spDate: "10 May 2022", source: "merryriana" },
  { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "HP", branch: "KG", status: "Paid", date: "2022-06-01", spDate: "10 Jun 2022", source: "email" },
  { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "IAY", branch: "PI", status: "N/A", date: "2022-07-01", spDate: "10 Jul 2022", source: "others" },
  { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "PS", branch: "BSD", status: "N/A", date: "2022-08-01", spDate: "10 Aug 2022", source: "whatsapp" },
];

const TableHeader = () => (
  <thead>
    <tr>
      {["No", "Name", "HP", "Email", "Program", "Branch", "Status", "Tanggal SP", "Source", "Action"].map(header => (
        <th key={header} className="text-center">{header}</th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({ id, name, hp, email, program, branch, status, spDate, source, onCheckIn }) => (
  <tr>
    <td className="text-center">{id}</td>
    <td>{name}</td>
    <td>{hp}</td>
    <td>{email}</td>
    <td>{program}</td>
    <td>{branch}</td>
    <td className="text-center">{status}</td>
    <td className="text-center">{spDate}</td>
    <td className="text-center">{source}</td>
    <td className="text-center">
      <button className="btn btn-primary btn-sm w-100" onClick={() => onCheckIn(id)}>Check-in</button>
    </td>
  </tr>
);

const TableBody = ({ data, onCheckIn }) => (
  <tbody>
    {data.map(item => (
      <TableRow key={item.id} {...item} onCheckIn={onCheckIn} />
    ))}
  </tbody>
);

const FilterInput = ({ name, value, onChange, type = "select", options = [] }) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-2">
    <label className="form-label">{name.replace(/^\w/, c => c.toUpperCase())}</label>
    {type === "date" ? (
      <input 
        type="date"
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
    ) : (
      <select 
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    )}
  </div>
);

const PesertaSP = ({ setActiveDetail }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    setActiveFilters(filters);
    setFilters(initialFilters);
  };

  const getFilterOptions = (filterKey) => {
    const optionsMap = {
      program: PROGRAMS,
      branch: BRANCHES,
      status: STATUSES,
      source: SOURCES
    };
    return optionsMap[filterKey] || [];
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

  return (
    <div className="container-fluid p-4">
      <div className="card mb-4">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.entries(initialFilters).map(([key, value]) => (
              <FilterInput
                key={key}
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                type={key.includes("date") ? "date" : "select"}
                options={getFilterOptions(key)}
              />
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilterSubmit}>
            Filter
          </button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header text-white">
          <h5 className="mb-0">List Peserta SP</h5>
        </div>
        <div className="card-body px-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <TableHeader />
              <TableBody data={filterData(tableData)} onCheckIn={setActiveDetail} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PesertaSP;
