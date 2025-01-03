import React, { useState, useContext } from "react";
import {
  FaUserGraduate,
  FaMicrophoneAlt,
  FaBrain,
  FaRocket,
  FaChalkboardTeacher,
  FaUserTie,
  FaPlane,
  FaVideo,
} from "react-icons/fa";
import { StudentContext } from "../../../context/StudentContext"; // Import the context

// Constants
const PROGRAMS = ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"];
const BRANCHES = ["KG", "BSD", "PI"];
const CLASSES = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];
const STATUSES = ["Active", "Inactive"];

const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  program: "",
  branch: "",
  class: "",
  status: "",
};

const FILTER_OPTIONS = {
  program: PROGRAMS,
  branch: BRANCHES,
  class: CLASSES,
  status: STATUSES,
};

const DASHBOARD_CARDS = [
  {
    id: "totalStudentActive",
    icon: <FaUserGraduate style={{ fontSize: "28px", color: "#4CAF50" }} />,
    title: "Total Student Active",
    count: "5000",
  },
  {
    id: "ps",
    icon: <FaMicrophoneAlt style={{ fontSize: "28px", color: "#FF5733" }} />,
    title: "Public Speaking",
    count: "1000",
  },
  {
    id: "sl",
    icon: <FaBrain style={{ fontSize: "28px", color: "#6A5ACD" }} />,
    title: "Smart Learning",
    count: "1000",
  },
  {
    id: "ls",
    icon: <FaRocket style={{ fontSize: "28px", color: "#FF9800" }} />,
    title: "Life & Success",
    count: "1000",
  },
  {
    id: "psa",
    icon: (
      <FaChalkboardTeacher style={{ fontSize: "28px", color: "#4CAF50" }} />
    ),
    title: "Public Speaking Academy",
    count: "1000",
  },
  {
    id: "iam",
    icon: <FaVideo style={{ fontSize: "28px", color: "#E91E63" }} />,
    title: "I Am YouTuber",
    count: "1000",
  },
  {
    id: "pcps",
    icon: <FaUserTie style={{ fontSize: "28px", color: "#2196F3" }} />,
    title: "Private Coaching Public Speaking",
    count: "450",
  },
  {
    id: "hp",
    icon: <FaPlane style={{ fontSize: "28px", color: "#FFC107" }} />,
    title: "Holiday Program",
    count: "325",
  },
];

// Components
const DashboardCard = ({ icon, title, count }) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="mb-2">{icon}</div>
        <h6 className="card-title mb-1">{title}</h6>
        <p className="fw-bold mb-0">{count}</p>
      </div>
    </div>
  </div>
);

const FilterInput = ({ type, name, value, onChange, options = [] }) =>
  type === "date" ? (
    <input
      type="date"
      className="form-control"
      name={name}
      value={value}
      onChange={onChange}
    />
  ) : (
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
  );

const StudentTable = ({ data }) => (
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
            "Class",
            "Status",
          ].map((header) => (
            <th key={header} className="text-center">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(
          (
            {
              id,
              name,
              phone,
              email,
              program_name,
              branch_name,
              kelas_name,
              status,
            },
            index
          ) => (
            <tr key={id} className="text-center">
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{phone}</td>
              <td>{email}</td>
              <td>{program_name}</td>
              <td>{branch_name}</td>
              <td>{kelas_name}</td>
              <td>{status === 0 ? "Inactive" : "Active"}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

const AdminDashboard = () => {
  const { students, loading, error } = useContext(StudentContext); // Access the context here
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    setActiveFilters(filters);
  };

  const filteredData = students.filter((item) => {
    const { startDate, endDate, ...otherFilters } = activeFilters;
    const itemDate = new Date(item.date);

    const isDateValid =
      (!startDate || itemDate >= new Date(startDate)) &&
      (!endDate || itemDate <= new Date(endDate));

    return (
      isDateValid &&
      Object.entries(otherFilters).every(
        ([key, value]) => !value || item[key] === value
      )
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {DASHBOARD_CARDS.map((card) => (
          <DashboardCard key={card.id} {...card} />
        ))}
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(INITIAL_FILTERS).map((key) => (
              <div className="col-12 col-md-6 col-lg-4" key={key}>
                <label className="form-label">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <FilterInput
                  type={key.includes("Date") ? "date" : "select"}
                  name={key}
                  value={filters[key]}
                  onChange={handleFilterChange}
                  options={FILTER_OPTIONS[key] || []}
                />
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilterSubmit}>
            Apply Filters
          </button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5>Student List</h5>
        </div>
        <div className="card-body">
          <StudentTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
