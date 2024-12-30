import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { StudentContext } from "../../../context/StudentContext"; // Import the context

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

const TableRow = ({ item }) => {
  return (
    <tr className="text-center">
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>
        {item.tgl_lahir
          ? moment(item.tgl_lahir).format("DD-MM-YYYY")
          : "SU NO SP"}
      </td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.program_name}</td>
      <td>{item.branch_name}</td>
      <td>{item.course_name}</td>
      <td>{item.kelas_name}</td>
      <td>{item.status === 0 ? "Inactive" : "Active"}</td>
      <td>
        <button className="btn btn-primary btn-sm">Sign Up</button>
      </td>
    </tr>
  );
};

const DataStudent = () => {
  const { students, loading, error } = useContext(StudentContext); // Use the context here
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    branch_name: "",
    program_name: "",
    status: "",
    source: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = students.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "status") return item.status === Number(value);
      if (key === "startDate" || key === "endDate") {
        const itemDate = new Date(item.tgl_lahir); // Adjusted to match schema
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
                    "Tanggal Lahir",
                    "HP",
                    "Email",
                    "Program",
                    "Branch",
                    "Course",
                    "Kelas",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <th key={header} className="text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center">
                      No data available
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((item) => (
                    <TableRow key={item.id} item={item} />
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

export default DataStudent;
