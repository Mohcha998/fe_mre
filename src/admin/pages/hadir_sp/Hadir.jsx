import React, { useState } from "react";
import moment from "moment";
import PaymentModal from "./PaymentModal";
import { useProspects } from "../../../context/ProspectContext";
import { FaWhatsapp } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import { LuMapPinCheckInside } from "react-icons/lu";
import {
  MdClose,
  MdCheck,
  MdWifiCalling1,
  MdWifiCalling2,
  MdWifiCalling3,
  MdOutlinePayments,
  MdPaid,
} from "react-icons/md";
import Select from "react-select";

const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  branch_name: "",
  program_name: "",
  status: "",
  source: "",
};

const Card = ({ card }) => (
  <div className="col-12 col-sm-6 col-md-4">
    <div className="card h-100 shadow-sm" role="button">
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="mb-2">{card.icon}</div>
        <h6 className="card-title mb-1">{card.title}</h6>
        <p className="fw-bold mb-0">{card.count}</p>
      </div>
    </div>
  </div>
);

const STATUS_OPTIONS = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Paid" },
  { value: "2", label: "Expired" },
];

const formatLabel = (name) => {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
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

const TableRow = ({ item, onSignUp, updateFU }) => {
  const handleFUChange = async (selectedOption) => {
    try {
      const updatedData = await updateFU(item.id, {
        call3: selectedOption.value,
      });
      if (updatedData) {
        item.call3 = selectedOption.value;
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
      <td>
        {STATUS_OPTIONS.find((opt) => opt.value === String(item.status))
          ?.label || "N/A"}
      </td>
      <td>
        {item.tgl_checkin
          ? moment(item.tgl_checkin).format("DD-MM-YYYY")
          : "SU NO SP"}
      </td>
      <td>{item.source}</td>
      <td>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={FOLLOW_UP_OPTIONS}
          defaultValue={FOLLOW_UP_OPTIONS.find(
            (opt) => opt.value === item.call3
          )}
          onChange={handleFUChange}
          isSearchable={false}
        />
      </td>
      <td>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onSignUp(item)}
        >
          Sign Up
        </button>
      </td>
    </tr>
  );
};

//Main component
const Hadir = ({ setActiveDetail }) => {
  const {
    prgprospects,
    loading,
    filterProspects,
    updateProspect,
    HadirCount,
    paidCount,
    checkinCount,
  } = useProspects();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [showModal, setShowModal] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    await filterProspects(filters);
  };

  const handleSignUp = (prospect) => {
    setSelectedProspect(prospect);
    setShowModal(true);
  };

  const handleCreatePayment = (prospectData) => {
    console.log("Creating payment for:", prospectData);
    // Logika untuk membuat pembayaran
  };

  const CARD_DATA = [
    {
      id: "totalPaid",
      icon: (
        <MdOutlinePayments style={{ fontSize: "28px", color: "#4CAF50" }} />
      ),
      title: "Total Paid",
      count: HadirCount ?? "Loading...",
    },
    {
      id: "paidToday",
      icon: <MdPaid style={{ fontSize: "28px", color: "#2196F3" }} />,
      title: "Paid Today",
      count: paidCount ?? "Loading...",
    },
    {
      id: "checkin",
      icon: (
        <LuMapPinCheckInside style={{ fontSize: "28px", color: "#FFC107" }} />
      ),
      title: "Check-in",
      count: checkinCount ?? "Loading...",
    },
  ];

  if (loading) return <div>Loading...</div>;

  const filteredProspects = prgprospects.filter((item) => {
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

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {CARD_DATA.map((card) => (
          <Card key={card.id} card={card} onClick={setActiveDetail} />
        ))}
      </div>

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
                  ...new Set(prgprospects.map((p) => p[key]).filter(Boolean)),
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
          <h5 className="mb-0">List Hadir SP</h5>
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
                    "Action",
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
                      onSignUp={handleSignUp}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreatePayment}
        prospectData={selectedProspect}
      />
    </div>
  );
};

export default Hadir;
