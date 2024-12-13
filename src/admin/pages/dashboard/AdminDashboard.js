import React, { useState } from "react";
import { 
  FaUserGraduate, 
  FaMicrophoneAlt, 
  FaBrain, 
  FaRocket, 
  FaChalkboardTeacher, 
  FaUserTie, 
  FaPlane, 
  FaVideo 
} from "react-icons/fa";

// Constants
const PROGRAMS = ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"];
const BRANCHES = ["KG", "BSD", "PI"];
const CLASSES = ["A", "B"];
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
  status: STATUSES
};

const DASHBOARD_CARDS = [
  {
    id: "totalStudentActive",
    icon: <FaUserGraduate style={{ fontSize: "28px", color: "#4CAF50" }} />,
    title: "Total Student Active",
    count: "5000"
  },
  {
    id: "ps",
    icon: <FaMicrophoneAlt style={{ fontSize: "28px", color: "#FF5733" }} />,
    title: "Public Speaking",
    count: "1000"
  },
  {
    id: "sl", 
    icon: <FaBrain style={{ fontSize: "28px", color: "#6A5ACD" }} />,
    title: "Smart Learning",
    count: "1000"
  },
  {
    id: "ls",
    icon: <FaRocket style={{ fontSize: "28px", color: "#FF9800" }} />,
    title: "Life & Success",
    count: "1000"
  },
  {
    id: "psa",
    icon: <FaChalkboardTeacher style={{ fontSize: "28px", color: "#4CAF50" }} />,
    title: "Public Speaking Academy",
    count: "1000"
  },
  {
    id: "iam",
    icon: <FaVideo style={{ fontSize: "28px", color: "#E91E63" }} />,
    title: "I Am YouTuber",
    count: "1000"
  },
  {
    id: "pcps",
    icon: <FaUserTie style={{ fontSize: "28px", color: "#2196F3" }} />,
    title: "Private Coaching Public Speaking",
    count: "450"
  },
  {
    id: "hp",
    icon: <FaPlane style={{ fontSize: "28px", color: "#FFC107" }} />,
    title: "Holiday Program",
    count: "325"
  },
];

const MOCK_DATA = [
  {
    id: 1,
    name: "Alice",
    hp: "1234567890",
    email: "alice@example.com",
    program: "PS",
    branch: "PI",
    class: "A",
    status: "Active",
    date: "2022-01-01"
  },
  // ... other mock data entries
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

const ProgramDashboard = () => (
  <div className="container-xxl flex-grow-1 container-p-y">
    <div className="row g-3">
      {DASHBOARD_CARDS.map(card => (
        <DashboardCard key={card.id} {...card} />
      ))}
    </div>
  </div>
);

const FilterInput = ({ type, name, value, onChange, options = [] }) => {
  const inputProps = {
    className: type === "date" ? "form-control" : "form-select",
    name,
    value,
    onChange
  };

  if (type === "date") {
    return <input type="date" {...inputProps} />;
  }

  return (
    <select {...inputProps}>
      <option value="">All</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};

const StudentTable = ({ data }) => {
  const headers = ["No", "Name", "HP", "Email", "Program", "Branch", "Class", "Status"];
  
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} className="text-center">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, hp, email, program, branch, class: className, status }) => (
            <tr key={id} className="text-center">
              <td>{id}</td>
              <td>{name}</td>
              <td>{hp}</td>
              <td>{email}</td>
              <td>{program}</td>
              <td>{branch}</td>
              <td>{className}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminDashboard = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [activeFilters, setActiveFilters] = useState({});
  const [data] = useState(MOCK_DATA);

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    setActiveFilters(filters);
    setFilters(INITIAL_FILTERS);
  };

  const filterData = (data) => {
    return data.filter(item => {
      const startDate = activeFilters.startDate ? new Date(activeFilters.startDate) : null;
      const endDate = activeFilters.endDate ? new Date(activeFilters.endDate) : null;
      const itemDate = new Date(item.date);

      const isWithinDateRange = (!startDate || itemDate >= startDate) && 
                               (!endDate || itemDate <= endDate);

      return isWithinDateRange && 
             Object.entries(activeFilters).every(([key, value]) => 
               !value || key.includes("Date") || item[key] === value
             );
    });
  };

  const renderFilterInputs = () => (
    Object.entries(INITIAL_FILTERS).map(([key, _]) => (
      <div className="col-12 col-md-6 col-lg-4" key={key}>
        <label className="form-label">
          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </label>
        <FilterInput
          type={key.includes("Date") ? "date" : "select"}
          name={key}
          value={filters[key]}
          onChange={handleFilterChange}
          options={FILTER_OPTIONS[key]}
        />
      </div>
    ))
  );

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <ProgramDashboard />
      
      <div className="card mt-4 mx-3">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {renderFilterInputs()}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilterSubmit}>
            Filter
          </button>
        </div>
      </div>

      <div className="card mt-4 shadow-sm mx-3">
        <div className="card-header text-white">
          <h5 className="mb-0">List Student</h5>
        </div>
        <div className="card-body px-0">
          <StudentTable data={filterData(data)} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
