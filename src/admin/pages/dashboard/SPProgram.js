import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePendingActions, MdPaid, MdOutlinePayments } from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";

const SPProgram = ({ setActiveDetail }) => (
  <div className="container-xxl flex-grow-1 container-p-y">
    {/* SP */}
    <div className="row">
      <div className="col-12">
        <h5 className="section-title">Student SP</h5>
        <hr className="section-divider" />
      </div>
      <div className="col-lg-4 col-md-4 order-1">
        <div className="row">
          {/* Card Component */}
          {[
            { id: "totalStudent", icon: <PiStudentBold style={{ fontSize: "35px" }} />, title: "Total Prospect", count: "12,628" },
            { id: "pending", icon: <MdOutlinePendingActions style={{ fontSize: "35px" }} />, title: "Pending", count: "12,628" }
          ].map((card, index) => (
            <div className="col-lg-6 col-md-12 col-6 mb-4" key={index}>
              <div className="card" onClick={() => setActiveDetail(card.id)}>
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="avatar flex-shrink-0">
                      {card.icon}
                    </div>
                    <div className="dropdown">
                      <button
                        className="btn p-0"
                        type="button"
                        id={`cardOpt${index}`}
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="bx bx-dots-vertical-rounded" />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby={`cardOpt${index}`}
                      >
                        <a className="dropdown-item" href="#">
                          View More
                        </a>
                        <a className="dropdown-item" href="#">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                  <span className="fw-semibold d-block mb-1">
                    {card.title}
                  </span>
                  <h3 className="card-title mb-2">{card.count}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-lg-8 col-md-8 order-3 order-md-2">
        <div className="row">
          {/* Card Component */}
          {[
            { id: "expired", icon: <RiPassExpiredLine style={{ fontSize: "35px" }} />, title: "Expired", count: "2,456" },
            { id: "paid", icon: <MdPaid style={{ fontSize: "35px" }} />, title: "Paid", count: "14,857" }
          ].map((card, index) => (
            <div className="col-lg-3 col-md-6 col-6 mb-4" key={index}>
              <div className="card" onClick={() => setActiveDetail(card.id)}>
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="avatar flex-shrink-0">
                      {card.icon}
                    </div>
                    <div className="dropdown">
                      <button
                        className="btn p-0"
                        type="button"
                        id={`cardOpt${index + 2}`}
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="bx bx-dots-vertical-rounded" />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby={`cardOpt${index + 2}`}
                      >
                        <a className="dropdown-item" href="#">
                          View More
                        </a>
                        <a className="dropdown-item" href="#">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                  <span className="d-block mb-1">{card.title}</span>
                  <h3 className="card-title text-nowrap mb-2">{card.count}</h3>
                </div>
              </div>
            </div>
          ))}
          {/* Profile Report */}
          <div className="col-lg-6 col-md-12 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                  <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                    <div className="card-title">
                      <h5 className="text-nowrap mb-2">Payment Report</h5>
                      <span className="badge bg-label-warning rounded-pill">Year</span>
                    </div>
                    <div className="mt-sm-auto">
                      <small className="text-success text-nowrap fw-semibold">
                        <i className="bx bx-chevron-up" /> 68.2%
                      </small>
                      <h3 className="mb-0">$84,686k</h3>
                    </div>
                  </div>
                  <div id="profileReportChart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SPProgram;