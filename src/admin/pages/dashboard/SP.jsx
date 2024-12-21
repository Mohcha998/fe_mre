import React, { useState } from "react";
import { useProspects } from "../../../context/ProspectContext";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePendingActions, MdPaid, MdClose, MdCheck, MdWifiCalling1, MdWifiCalling2, MdWifiCalling3  } from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa"
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

// Card Component
const Card = ({ card, onCardClick }) => (
  <div className="col-12 col-sm-6 col-md-3">
    <div
      className="card h-100 shadow-sm"
      role="button"
      onClick={() => onCardClick(card.id)}
    >
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="mb-2">{card.icon}</div>
        <h6 className="card-title mb-1">{card.title}</h6>
        <p className="fw-bold mb-0">{card.count}</p>
      </div>
    </div>
  </div>
);

// Card Data
const cardData = [
  {
    id: "totalStudent",
    icon: <PiStudentBold style={{ fontSize: "28px", color: "#4CAF50" }} />,
    title: "Total Prospect",
    count: "12,628",
  },
  {
    id: "pending",
    icon: <MdOutlinePendingActions style={{ fontSize: "28px", color: "#FFC107" }} />,
    title: "Pending",
    count: "12,628",
  },
  {
    id: "expired",
    icon: <RiPassExpiredLine style={{ fontSize: "28px", color: "#F44336" }} />,
    title: "Expired",
    count: "2,456",
  },
  {
    id: "paid",
    icon: <MdPaid style={{ fontSize: "28px", color: "#2196F3" }} />,
    title: "Paid",
    count: "14,857",
  },
];

// Filter Input Component
const FilterInput = ({ name, value, onChange, options }) => {
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  if (name === "status") {
    // Khusus untuk status, hanya tampilkan angka dengan label yang sesuai
    const statusOptions = [
      { value: "0", label: "Pending" },
      { value: "1", label: "Paid" },
      { value: "2", label: "Expired" },
    ];

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
          {statusOptions.map((option) => (
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

const options = [
  { value: "0", label: <FaWhatsapp style={{ color: "green" }} /> },
  { value: "1", label: <FcCallback /> },
  { value: "2", label: <MdClose style={{ color: "red" }} /> },
  { value: "3", label: <MdCheck style={{ color: "green" }} /> },
  { value: "4", label: <MdWifiCalling1 style={{ color: "red"}} /> },
  { value: "5", label: <MdWifiCalling2 style={{ color: "red"}} /> },
  { value: "6", label: <MdWifiCalling3 style={{ color: "red"}} /> },
];

// TableRow Component
const TableRow = ({ item, updateFU }) => {
  const handleFUChange = async (selectedOption) => {
    try {
      const newFU = selectedOption.value; // Ambil nilai dari opsi yang dipilih
      await updateFU(item.id, { call: newFU });
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
      <td>
        {item.status === 0 ? "Pending" : item.status === 1 ? "Paid" : item.status === 2 ? "Expired" : "N/A"}
      </td>
      <td>{item.source}</td>
      <td>
      <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={options}
            defaultValue={options.find((opt) => opt.value === item.call)}
            onChange={handleFUChange}
          />
      </td>
    </tr>
  );
};

// Main Component
const SPProgram = ({ setActiveDetail }) => {
  const { prospects, loading, filterProspects, updateProspect } = useProspects(); // Get update function from context
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredProspects = prospects.filter((item) => {
    if (filters.status && item.status != Number(filters.status)) {
      return false;
    }
    return true;
  });

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {cardData.map((card) => (
          <Card key={card.id} card={card} onCardClick={setActiveDetail} />
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
                options={[...new Set(prospects.map((p) => p[key]))]}
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
                    "Branch",
                    "Invitation Code",
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
                {filteredProspects.map((item) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    updateFU={updateProspect} // Pass update function
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

export default SPProgram;
