import React from "react";
import { FaUserGraduate, FaMicrophoneAlt, FaBrain, FaRocket, FaChalkboardTeacher, FaUserTie, FaPlane, FaVideo} from "react-icons/fa";

const cardData = [
  { id: "totalStudentActive", icon: <FaUserGraduate style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Total Student Active", count: "12,628" },
  { id: "ps", icon: <FaMicrophoneAlt style={{ fontSize: "28px", color: "#FF5733" }} />, title: "Public Speaking", count: "1,234" },
  { id: "sl", icon: <FaBrain style={{ fontSize: "28px", color: "#6A5ACD" }} />, title: "Smart Learning", count: "1,025" },
  { id: "ls", icon: <FaRocket style={{ fontSize: "28px", color: "#FF9800" }} />, title: "Life & Success", count: "980" },
  { id: "psa", icon: <FaChalkboardTeacher style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Public Speaking Academy", count: "650" },
  { id: "pcps", icon: <FaUserTie style={{ fontSize: "28px", color: "#2196F3" }} />, title: "Private Coaching Public Speaking", count: "450" },
  { id: "hp", icon: <FaPlane style={{ fontSize: "28px", color: "#FFC107" }} />, title: "Holiday Program", count: "325" },
  { id: "iam", icon: <FaVideo style={{ fontSize: "28px", color: "#E91E63" }} />, title: "I Am YouTuber", count: "280" },
];

const Card = ({ card }) => (
  <div className="col-6 col-sm-4 col-md-3 mb-3">
    <div className="card h-100 shadow-sm text-center" style={{ cursor: "pointer", borderRadius: "10px" }}>
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="icon mb-2">{card.icon}</div>
        <h6 className="card-title mb-1" style={{ fontSize: "14px", fontWeight: "500" }}>{card.title}</h6>
        <p className="fw-bold mb-0" style={{ fontSize: "18px" }}>{card.count}</p>
      </div>
    </div>
  </div>
);

const ProgramDashboard = () => (
  <div className="container-xxl flex-grow-1 container-p-y">
    <div className="row g-3">
      {cardData.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  </div>
);

export default ProgramDashboard;
