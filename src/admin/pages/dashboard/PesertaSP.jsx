import React, { useState } from "react";

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

const TableHeader = () => {
  const headers = ["No", "Name", "HP", "Email", "Program", "Branch", "Status", "Tanggal SP", "Source", "Action"];
  return (
    <thead>
      <tr>
        {headers.map(header => (
          <th key={header} className="text-center">{header}</th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = ({ data, onCheckIn }) => (
  <tbody>
    {data.map(({ id, name, hp, email, program, branch, status, spDate, source }) => (
      <tr key={id}>
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
          <button className="btn btn-primary" onClick={() => onCheckIn(id)}>Check-in</button>
        </td>
      </tr>
    ))}
  </tbody>
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

  const filterData = (data) => {
    return data.filter(item => {
      const isWithinDateRange = (!activeFilters["start date"] || new Date(item.date) >= new Date(activeFilters["start date"])) &&
                                (!activeFilters["end date"] || new Date(item.date) <= new Date(activeFilters["end date"]));
      return isWithinDateRange && Object.keys(activeFilters).every(key => 
        !activeFilters[key] || item[key] === activeFilters[key]
      );
    });
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mt-4 mx-3">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(initialFilters).map(filterKey => (
              <div className="col-md-2" key={filterKey}>
                <label className="form-label">{filterKey.replace(/^\w/, c => c.toUpperCase())}</label>
                {filterKey.includes("date") ? (
                  <input type="date" className="form-control" name={filterKey} value={filters[filterKey]} onChange={handleFilterChange} />
                ) : (
                  <select className="form-select" name={filterKey} value={filters[filterKey]} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterKey === "program" && ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "branch" && ["KG", "BSD", "PI"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "status" && ["Pending", "Expired", "Paid", "N/A"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "source" && ["merryriana", "instagram", "ads", "google", "whatsapp", "email", "others"].map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
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
          <h5 className="mb-0">List Peserta SP</h5>
        </div>
        <div className="card-body">
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
