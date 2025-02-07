import React, { useState, useEffect } from "react";
import moment from "moment";
import { useProspects } from "../../../context/ProspectContext";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import DetailModal from "../interest_program/DetailModal";
import ExcelExport from "../../../context/ExcelContext";
import PaymentModal from "../interest_program/PaymentModal";
import { FaWhatsapp } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import {
  MdClose,
  MdCheck,
  MdWifiCalling1,
  MdWifiCalling2,
  MdWifiCalling3,
} from "react-icons/md";
import Select from "react-select";

const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  kd_cbg: "",
  status: "",
  source: "",
};

const STATUS_OPTIONS = [
  // { value: "0", label: "Pending" },
  { value: "1", label: " " },
  // { value: "2", label: "Expired" },
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

const itemsPerPage = 10;
const maxPageDisplay = 5;

const formatLabel = (name) => {
  if (name === "kd_cbg") return "Learning Centre";
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

const TableRow = ({ item, index, updateFU, onViewDetail }) => {
  const handleFUChange = async (selectedOption) => {
    try {
      const updatedData = await updateFU(item.id, {
        call4: selectedOption.value,
      });
      if (updatedData) {
        item.call4 = selectedOption.value;
      }
    } catch (error) {
      console.error("Error updating FU:", error);
    }
  };

  return (
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      {/* <td>{item.program_name}</td> */}
      <td>{item.kd_cbg}</td>
      <td>{moment(item.created_at).format("DD MMM YYYY, HH:mm")}</td>
      <td>
        {STATUS_OPTIONS.find((opt) => opt.value === String(item.status))
          ?.label || "N/A"}
      </td>
      {/* <td>
        {item.tgl_checkin
          ? moment(item.tgl_checkin).format("DD-MM-YYYY")
          : "SU NO SP"}
      </td> */}
      <td>{item.source}</td>
      <td>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={FOLLOW_UP_OPTIONS}
          defaultValue={FOLLOW_UP_OPTIONS.find(
            (opt) => opt.value === item.call4
          )}
          onChange={handleFUChange}
          isSearchable={false}
        />
      </td>
      <td>
        <button
          className="btn btn-info btn-sm"
          onClick={() => onViewDetail(item)}
          disabled={item.status === 0}
        >
          Detail
        </button>
      </td>
    </tr>
  );
};

const SignUp = () => {
  const {
    interestprospects,
    loading,
    filterProspects,
    updateProspect,
    exportedToExcel,
  } = useProspects();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [filteredProspects, setFilteredProspects] = useState([]);

  useEffect(() => {
    applyFilters();
  }, [interestprospects, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filteredData = interestprospects.filter((item) => {
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
        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    });

    setFilteredProspects(
      filteredData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    );
    setCurrentPage(1);
    setPageGroup(0);
  };

  const handleViewDetail = (prospect) => {
    setSelectedProspect(prospect);
    setShowDetailModal(true); // Hanya satu baris untuk setShowDetailModal
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProspect(null);
  };

  const totalPages = Math.ceil(filteredProspects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProspects = filteredProspects.slice(startIndex, endIndex);

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mt-1">
        <div className="card-header">
          <h5 className="fs-5 fw-bold">Filter</h5>
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
                  ...new Set(
                    interestprospects.map((p) => p[key]).filter(Boolean)
                  ),
                ]}
              />
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={applyFilters} >
            Filter
          </button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fs-5 fw-bold">List Customer</h5>
          {/* <ExcelExport data={exportedToExcel} fileName="Export Excel" /> */}
        </div>

        <div className="card-body px-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {[
                    "No",
                    "Nama",
                    "HP",
                    "Email",
                    // "Program",
                    "Learning Centre",
                    "Tgl Daftar",
                    "Status",
                    // "Tanggal SP",
                    "Source",
                    "Follow-up",
                    "Detail",
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
                    <td colSpan="12" className="text-center">
                      No data available
                    </td>
                  </tr>
                ) : (
                  filteredProspects
                    .slice(startIndex, endIndex)
                    .map((item, index) => (
                      <TableRow
                        key={`${item.id}-${index}`} // Kombinasi id dan index untuk memastikan key unik
                        index={startIndex + index} // Berikan indeks untuk nomor urut
                        item={item}
                        updateFU={updateProspect}
                        onViewDetail={handleViewDetail}
                      />
                    ))
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="ms-auto">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className="btn btn-light"
              >
                <MdArrowBack />
              </button>
              {generatePageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={index}>...</span>
                ) : (
                  <button
                    key={page}
                    className={`btn btn-light ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                className="btn btn-light"
              >
                <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>

      <DetailModal
        show={showDetailModal}
        onClose={handleCloseDetailModal}
        prospectData={selectedProspect}
      />
    </div>
  );
};

export default SignUp;
