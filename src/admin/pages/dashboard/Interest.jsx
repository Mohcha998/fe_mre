import React, { useState } from "react";

// Constants
const PROGRAMS = ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"];
const BRANCHES = ["KG", "BSD", "PI"];
const STATUSES = ["Pending", "Expired", "Paid", "N/A"];
const SOURCES = ["merryriana", "instagram", "ads", "google", "whatsapp", "email", "others"];

const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  program: "",
  branch: "",
  status: "",
  source: ""
};

const MOCK_DATA = [
  {
    id: 1,
    name: "Alice",
    hp: "1234567890",
    email: "alice@example.com",
    program: "PS",
    branch: "PI",
    status: "Pending",
    date: "2022-01-01",
    spDate: "10 Jan 2022",
    source: "whatsapp"
  },
  {
    id: 2,
    name: "Bob",
    hp: "2345678901", 
    email: "bob@example.com",
    program: "SL",
    branch: "BSD",
    status: "Pending",
    date: "2022-02-01",
    spDate: "10 Feb 2022",
    source: "instagram"
  },
  {
    id: 3,
    name: "Charlie",
    hp: "3456789012",
    email: "charlie@example.com", 
    program: "LS",
    branch: "KG",
    status: "Expired",
    date: "2022-03-01",
    spDate: "10 Mar 2022",
    source: "ads"
  },
  {
    id: 4,
    name: "David",
    hp: "4567890123",
    email: "david@example.com",
    program: "PSA", 
    branch: "PI",
    status: "Expired",
    date: "2022-04-01",
    spDate: "10 Apr 2022",
    source: "google"
  },
  {
    id: 5,
    name: "Eve",
    hp: "5678901234",
    email: "eve@example.com",
    program: "PCPS",
    branch: "BSD",
    status: "Paid",
    date: "2022-05-01",
    spDate: "10 May 2022",
    source: "merryriana"
  },
  {
    id: 6,
    name: "Frank",
    hp: "6789012345",
    email: "frank@example.com",
    program: "HP",
    branch: "KG",
    status: "Paid",
    date: "2022-06-01",
    spDate: "10 Jun 2022",
    source: "email"
  },
  {
    id: 7,
    name: "Grace",
    hp: "7890123456",
    email: "grace@example.com",
    program: "IAY",
    branch: "PI",
    status: "N/A",
    date: "2022-07-01",
    spDate: "10 Jul 2022",
    source: "others"
  },
  {
    id: 8,
    name: "Hank",
    hp: "8901234567",
    email: "hank@example.com",
    program: "PS",
    branch: "BSD",
    status: "N/A",
    date: "2022-08-01",
    spDate: "10 Aug 2022",
    source: "whatsapp"
  }
];

const TABLE_HEADERS = [
  "No",
  "Name",
  "HP",
  "Email",
  "Program",
  "Branch",
  "Status",
  "Tanggal SP",
  "Source",
  "Action"
];

const FilterInput = ({ type, name, value, onChange, options = [] }) => {
  if (type === "date") {
    return (
      <input
        type="date"
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <select
      className="form-select"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">All</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const TableHeader = () => (
  <thead>
    <tr>
      {TABLE_HEADERS.map(header => (
        <th key={header} className="text-center">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const TableBody = ({ data, onCheckIn }) => (
  <tbody>
    {data.map(({ id, name, hp, email, program, branch, status, spDate, source }) => (
      <tr key={id} className="text-center">
        <td>{id}</td>
        <td>{name}</td>
        <td>{hp}</td>
        <td>{email}</td>
        <td>{program}</td>
        <td>{branch}</td>
        <td>{status}</td>
        <td>{spDate}</td>
        <td>{source}</td>
        <td>
          <button 
            className="btn btn-primary btn-sm w-100"
            onClick={() => onCheckIn(id)}
          >
            Sign Up
          </button>
        </td>
      </tr>
    ))}
  </tbody>
);

const Interest = ({ setActiveDetail }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterSubmit = () => {
    setActiveFilters(filters);
    setFilters(INITIAL_FILTERS);
  };

  const filterData = (data) => {
    return data.filter(item => {
      const startDate = activeFilters.startDate ? new Date(activeFilters.startDate) : null;
      const endDate = activeFilters.endDate ? new Date(activeFilters.endDate) : null;
      const itemDate = new Date(item.date);

      const isWithinDateRange = (!startDate || itemDate >= startDate) && 
                               (!endDate || itemDate <= endDate);

      return isWithinDateRange && 
             Object.entries(activeFilters).every(([key, value]) => 
               !value || key.includes("Date") || item[key] === value
             );
    });
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

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="m-0">Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(INITIAL_FILTERS).map(filterKey => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-2" key={filterKey}>
                <label className="form-label">
                  {filterKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <FilterInput
                  type={filterKey.includes("Date") ? "date" : "select"}
                  name={filterKey}
                  value={filters[filterKey]}
                  onChange={handleFilterChange}
                  options={getFilterOptions(filterKey)}
                />
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilterSubmit}>
            Filter
          </button>
        </div>
      </div>

      <div className="card mt-4 shadow-sm">
        <div className="card-header text-white">
          <h5 className="m-0">List Peserta SP</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <TableHeader />
              <TableBody 
                data={filterData(MOCK_DATA)}
                onCheckIn={setActiveDetail}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interest;
