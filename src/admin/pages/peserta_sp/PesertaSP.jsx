import React, { useState } from "react";
import { useProspects } from "../../../context/ProspectContext";
import moment from "moment";
import { FaWhatsapp } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import { MdClose, MdCheck, MdWifiCalling1, MdWifiCalling2, MdWifiCalling3 } from "react-icons/md";
import Select from "react-select";

const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  branch_name: "",
  program_name: "",
  status: "",
  source: "",
};

const STATUS_OPTIONS = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Paid" },
  { value: "2", label: "Expired" },
];

const formatLabel = (name) => {
  switch (name) {
    case "startDate":
      return "Start Date";
    case "endDate":
      return "End Date";
    case "branch_name":
      return "Branch";
    case "program_name":
      return "Program";
    default:
      return name
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
  }
};

const FilterInput = ({ name, value, onChange, options }) => {
  const label = formatLabel(name);

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

const FOLLOW_UP_OPTIONS = [
  { value: "0", label: <FaWhatsapp style={{ color: "green" }} /> },
  { value: "1", label: <FcCallback /> },
  { value: "2", label: <MdClose style={{ color: "red" }} /> },
  { value: "3", label: <MdCheck style={{ color: "green" }} /> },
  { value: "4", label: <MdWifiCalling1 style={{ color: "red" }} /> },
  { value: "5", label: <MdWifiCalling2 style={{ color: "red" }} /> },
  { value: "6", label: <MdWifiCalling3 style={{ color: "red" }} /> },
];

const TableRow = ({ item, handleCheckin, updateFU }) => {
  const handleFUChange = async (selectedOption) => {
    try {
      const updatedData = await updateFU(item.id, {
        call2: selectedOption.value,
      });
      if (updatedData) {
        item.call2 = selectedOption.value;
      }
    } catch (error) {
      console.error("Error updating FU:", error);
    }
  };

  const handleCheckinClick = async () => {
    try {
      await handleCheckin(item.id);
    } catch (error) {
      console.error("Check-in failed:", error);
    }
  };

  return (
    <tr className="text-center">
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.program_name}</td>
      <td>{item.branch_name}</td>
      <td>
        {STATUS_OPTIONS.find((opt) => opt.value === String(item.status))
          ?.label || "N/A"}
      </td>
      <td>
        {item.tgl_checkin
          ? moment(item.tgl_checkin).format("DD-MM-YYYY HH:mm:ss")
          : "-"}
      </td>
      <td>{item.source}</td>
      <td>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={FOLLOW_UP_OPTIONS}
          defaultValue={FOLLOW_UP_OPTIONS.find(
            (opt) => opt.value === item.call2
          )}
          onChange={handleFUChange}
          isSearchable={false}
        />
      </td>
      <td>
        <button
          className="btn btn-primary btn-sm w-100"
          onClick={handleCheckinClick}
          disabled={item.tgl_checkin}
        >
          Check-in
        </button>
      </td>
    </tr>
  );
};

const PesertaSP = ({ setActiveDetail }) => {
  const { spprospects, loading, filterProspects, handleCheckin, updateProspect } = useProspects();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    await filterProspects(filters);
  };

  const filteredProspects = spprospects.filter((item) => {
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
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mt-1">
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
                  ...new Set(spprospects.map((p) => p[key]).filter(Boolean)),
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
          <h5 className="mb-0">List Peserta SP</h5>
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
                    "Branch",
                    "Status",
                    "Tanggal SP",
                    "Source",
                    "Follow-up",
                    "Check-in",
                  ].map((header) => (
                    <th key={header} className="text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProspects.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No data available
                    </td>
                  </tr>
                ) : (
                  filteredProspects.map((item) => (
                    <TableRow
                      key={item.id}
                      item={item}
                      updateFU={updateProspect}
                      handleCheckin={handleCheckin}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PesertaSP;
