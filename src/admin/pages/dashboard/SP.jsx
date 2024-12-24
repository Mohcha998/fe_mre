import React, { useState } from "react";
import { useProspects } from "../../../context/ProspectContext";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePendingActions, MdPaid, MdClose, MdCheck, MdWifiCalling1, MdWifiCalling2, MdWifiCalling3 } from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import Select from "react-select";

// Constants
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

const FOLLOW_UP_OPTIONS = [
  { value: "0", label: <FaWhatsapp style={{ color: "green" }} /> },
  { value: "1", label: <FcCallback /> },
  { value: "2", label: <MdClose style={{ color: "red" }} /> },
  { value: "3", label: <MdCheck style={{ color: "green" }} /> },
  { value: "4", label: <MdWifiCalling1 style={{ color: "red" }} /> },
  { value: "5", label: <MdWifiCalling2 style={{ color: "red" }} /> },
  { value: "6", label: <MdWifiCalling3 style={{ color: "red" }} /> },
];

const CARD_DATA = [
  { id: "totalStudent", icon: <PiStudentBold style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Total Prospect", count: "12,628" },
  { id: "pending", icon: <MdOutlinePendingActions style={{ fontSize: "28px", color: "#FFC107" }} />, title: "Pending", count: "12,628" },
  { id: "expired", icon: <RiPassExpiredLine style={{ fontSize: "28px", color: "#F44336" }} />, title: "Expired", count: "2,456" },
  { id: "paid", icon: <MdPaid style={{ fontSize: "28px", color: "#2196F3" }} />, title: "Paid", count: "14,857" },
];

// Utility Functions
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

// Components
const Card = ({ card, onClick }) => (
  <div className="col-12 col-sm-6 col-md-3">
    <div className="card h-100 shadow-sm" role="button" onClick={() => onClick(card.id)}>
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="mb-2">{card.icon}</div>
        <h6 className="card-title mb-1">{card.title}</h6>
        <p className="fw-bold mb-0">{card.count}</p>
      </div>
    </div>
  </div>
);

const FilterInput = ({ name, value, onChange, options }) => {
  const label = formatLabel(name);

  if (name === "status") {
    return (
      <div className="col-md-2">
        <label className="form-label">{label}</label>
        <select className="form-select" name={name} value={value} onChange={onChange}>
          <option value="">All</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (name.toLowerCase().includes("date")) {
    return (
      <div className="col-md-2">
        <label className="form-label">{label}</label>
        <input type="date" className="form-control" name={name} value={value} onChange={onChange} />
      </div>
    );
  }

  return (
    <div className="col-md-2">
      <label className="form-label">{label}</label>
      <select className="form-select" name={name} value={value} onChange={onChange}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

const TableRow = ({ item, updateFU }) => {
  const handleFUChange = async (selectedOption) => {
    try {
      const updatedData = await updateFU(item.id, { call: selectedOption.value });
      if (updatedData) {
        item.call = selectedOption.value;
      }
    } catch (error) {
      console.error("Error updating FU:", error);
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
      <td>{item.invitationCode || "-"}</td>
      <td>{STATUS_OPTIONS.find((opt) => opt.value === String(item.status))?.label || "N/A"}</td>
      <td>{item.source}</td>
      <td>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={FOLLOW_UP_OPTIONS}
          defaultValue={FOLLOW_UP_OPTIONS.find((opt) => opt.value === item.call)}
          onChange={handleFUChange}
          isSearchable={false}
        />
      </td>
    </tr>
  );
};

// Main Component
const SPProgram = ({ setActiveDetail }) => {
  const { prospects, loading, filterProspects, updateProspect } = useProspects();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    filterProspects(filters);
  };

  const filteredProspects = prospects.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "status") return item.status === Number(value);
      return item[key]?.toString() === value;
    });
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {CARD_DATA.map((card) => (
          <Card key={card.id} card={card} onClick={setActiveDetail} />
        ))}
      </div>

      <div className="card mt-4">
        <div className="card-header"><h5>Filter</h5></div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(INITIAL_FILTERS).map((key) => (
              <FilterInput
                key={key}
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                options={[...new Set(prospects.map((p) => p[key]).filter(Boolean))]}
              />
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={applyFilters}>Filter</button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header text-white"><h5 className="mb-0">List Prospect</h5></div>
        <div className="card-body px-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {["No", "Name", "HP", "Email", "Program", "Branch", "Invitation Code", "Status", "Source", "FU"].map((header) => (
                    <th key={header} className="text-center">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProspects.map((item) => (
                  <TableRow key={item.id} item={item} updateFU={updateProspect} />
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
