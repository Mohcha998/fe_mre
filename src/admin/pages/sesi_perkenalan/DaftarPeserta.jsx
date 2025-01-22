import React, { useState } from "react";
import moment from "moment";
import PaymentModal from "./PaymentModal";
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

const TableRow = ({ index, item, onSignUp, handleCheckin, updateFU }) => {
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

  const handleCheckinClick = async () => {
    try {
      await handleCheckin(item.id);
    } catch (error) {
      console.error("Check-in failed:", error);
    }
  };

  return (
    <tr className="text-center">
      <td>{index}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.program_name}</td>
      <td>{item.cabang}</td>
      <td>
        {STATUS_OPTIONS.find((opt) => opt.value === String(item.status))
          ?.label || "N/A"}
      </td>
      <td>
        {item.tgl_checkin ? moment(item.tgl_checkin).format("DD-MM-YYYY") : "-"}
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
          className="btn btn-primary btn-sm w-100"
          onClick={handleCheckinClick}
          disabled={item.tgl_checkin}
        >
          Check-in
        </button>
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

const DaftarPeserta = () => {
  const {
    prgprospects,
    loading,
    filterProspects,
    handleCheckin,
    updateProspect,
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

  const filteredProspects = prgprospects
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
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Urutan data terbaru di atas

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
          <h5 className="mb-0">List Peserta</h5>
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
                    "Tanggal SP",
                    "Source",
                    "Follow-up",
                    "Hadir",
                    "Sign-Up",
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
                  filteredProspects.map((item, index) => (
                    <TableRow
                      key={item.id}
                      index={index + 1} // Kirim nomor urut
                      item={item}
                      handleCheckin={handleCheckin}
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

      <PaymentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreatePayment}
        prospectData={selectedProspect}
      />
    </div>
  );
};

export default DaftarPeserta;
