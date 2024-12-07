import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePendingActions, MdPaid } from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";

const cardData = [
  { id: "totalStudent", icon: <PiStudentBold style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Total Prospect", count: "12,628" },
  { id: "pending", icon: <MdOutlinePendingActions style={{ fontSize: "28px", color: "#FFC107" }} />, title: "Pending", count: "12,628" },
  { id: "expired", icon: <RiPassExpiredLine style={{ fontSize: "28px", color: "#F44336" }} />, title: "Expired", count: "2,456" },
  { id: "paid", icon: <MdPaid style={{ fontSize: "28px", color: "#2196F3" }} />, title: "Paid", count: "14,857" },
];

const Card = ({ card, setActiveDetail }) => (
  <div className="col-6 col-sm-4 col-md-3 mb-3">
    <div
      className="card h-100 shadow-sm text-center"
      onClick={() => setActiveDetail(card.id)}
      style={{ cursor: "pointer", borderRadius: "10px" }}
    >
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="icon mb-2">{card.icon}</div>
        <h6 className="card-title mb-1" style={{ fontSize: "14px", fontWeight: "500" }}>{card.title}</h6>
        <p className="fw-bold mb-0" style={{ fontSize: "18px" }}>{card.count}</p>
      </div>
    </div>
  </div>
);

const SPProgram = ({ setActiveDetail }) => (
  <div className="container-xxl flex-grow-1 container-p-y">
    <div className="row g-3">
      {cardData.map((card, index) => (
        <Card key={index} card={card} setActiveDetail={setActiveDetail} />
      ))}
    </div>
  </div>
);

export default SPProgram;
