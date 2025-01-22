import React, { useState } from "react";
import { useProspects } from "../../../context/ProspectContext";
import Select from "react-select";
import { FaWhatsapp } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import {
  MdClose,
  MdCheck,
  MdWifiCalling1,
  MdWifiCalling2,
  MdWifiCalling3,
} from "react-icons/md";

// Constants
const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  cabang: "",
  program_name: "",
  status: "",
  source: "",
};

const STATUS_OPTIONS = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Paid" },
  { value: "2", label: "Expired" },
];

const FOLLOW_UP_OPTIONS = [
  { value: "0", label: <FaWhatsapp style={{ color: "green" }} /> },
  { value: "1", label: <FcCallback /> },
  { value: "2", label: <MdClose style={{ color: "red" }} /> },
  { value: "3", label: <MdCheck style={{ color: "green" }} /> },
  { value: "4", label: <MdWifiCalling1 style={{ color: "red" }} /> },
  { value: "5", label: <MdWifiCalling2 style={{ color: "red" }} /> },
  { value: "6", label: <MdWifiCalling3 style={{ color: "red" }} /> },
];

const FilterInput = ({ name, value, onChange, options }) => {
  const label = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

  if (name === "status") {
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
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (name.toLowerCase().includes("date")) {
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
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const TableRow = ({ item, index, updateFU }) => {
  const handleFUChange = async (selectedOption) => {
    try {
      const updatedData = await updateFU(item.id, {
        call: selectedOption.value,
      });
      if (updatedData) {
        item.call = selectedOption.value;
      }
    } catch (error) {
      console.error("Error updating FU:", error);
    }
  };

  return (
    <tr className="text-center">
      <td>{index + 1}</td> {/* Nomor urut berdasarkan indeks */}
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.program_name}</td>
      <td>{item.cabang}</td>
      <td>
        {STATUS_OPTIONS.find((opt) => opt.value === String(item.status))
          ?.label || "N/A"}
      </td>
      <td>{item.source}</td>
      <td>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={FOLLOW_UP_OPTIONS}
          defaultValue={FOLLOW_UP_OPTIONS.find(
            (opt) => opt.value === item.call
          )}
          onChange={handleFUChange}
          isSearchable={false}
        />
      </td>
    </tr>
  );
};

const DaftarProspect = () => {
  const { prospects, loading, filterProspects, updateProspect } =
    useProspects();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    filterProspects(filters);
  };

  const filteredProspects = prospects
    .filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key === "status") return item.status === Number(value);
        if (key === "startDate" || key === "endDate") {
          const itemDate = new Date(item.created_at);
          const startDate = filters.startDate
            ? new Date(filters.startDate)
            : null;
          const endDate = filters.endDate ? new Date(filters.endDate) : null;
          return (
            (!startDate || itemDate >= startDate) &&
            (!endDate || itemDate <= endDate)
          );
        }
        return item[key]?.toString() === value;
      });
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sortir berdasarkan data terbaru

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mt-4">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(INITIAL_FILTERS).map((key) => (
              <FilterInput
                key={key}
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                options={[
                  ...new Set(prospects.map((p) => p[key]).filter(Boolean)),
                ]}
              />
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={applyFilters}>
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
              <thead>
                <tr>
                  {[
                    "No",
                    "Name",
                    "HP",
                    "Email",
                    "Program",
                    "Learning Centre",
                    "Status",
                    "Source",
                    "FU",
                  ].map((header) => (
                    <th key={header} className="text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProspects.map((item, index) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    index={index} // Pass index here
                    updateFU={updateProspect}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarProspect;
