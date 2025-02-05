import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "../../../helper/pagination"; // Import Pagination
import { StudentContext } from "../../../context/StudentContext"; // Import the context

const STATUS_OPTIONS = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Paid" },
  { value: "2", label: "Expired" },
];

const formatLabel = (name) => {
  if (name === "branch_name") {
    return "Learning Centre";
  } else if (name === "course_name") {
    return "Jenis";
  }
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
};

const itemsPerPage = 10;

const DataStudent = () => {
  const { students, loading, error } = useContext(StudentContext);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    branch_name: "",
    program_name: "",
    course_name: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah item per halaman

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = students.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "status") return item.status === Number(value);
      if (key === "startDate" || key === "endDate") {
        const itemDate = new Date(item.tgl_lahir);
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

  // Hitung total halaman
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  // Ambil data sesuai halaman yang aktif
  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mt-1">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(filters).map((key) => (
              <div key={key} className="col-md-2">
                <label className="form-label">{formatLabel(key)}</label>
                <select
                  className="form-select"
                  name={key}
                  value={filters[key]}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  {key === "status"
                    ? STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))
                    : Array.from(new Set(students.map((p) => p[key]))).map(
                        (option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        )
                      )}
                </select>
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3">Filter</button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header text-white">
          <h5 className="mb-0">Data Students</h5>
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
                    "Learning Centre",
                    "Program",
                    "Jenis",
                    "Kelas",
                    "Action",
                  ].map((header) => (
                    <th key={header} className="text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedStudents.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No data available
                    </td>
                  </tr>
                ) : (
                  displayedStudents.map((item, index) => (
                    <tr key={item.id} className="text-center">
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phone ? item.phone : "-"}</td>
                      <td>{item.email}</td>
                      <td>{item.branch_name}</td>
                      <td>{item.program_name}</td>
                      <td>{item.course_name}</td>
                      <td>{item.kelas_name}</td>
                      <td>
                        <Link
                          to={`/admin/edit-student/${item.id}`}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔹 Panggil Pagination di sini */}
        <div className="card-footer d-flex justify-content-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DataStudent;
