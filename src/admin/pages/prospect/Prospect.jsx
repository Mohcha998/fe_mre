import React, { useContext } from "react";
import {
  FaUsers,
  FaCalendarCheck,
  FaHourglassHalf,
  FaTimesCircle,
  FaDollarSign,
  FaGift,
  FaCheckCircle,
  FaUserPlus,
} from "react-icons/fa";
import { ProspectDashboardContext } from "../../../context/ProspectDashboardContext";

const Prospect = () => {
  const { data, loading, error } = useContext(ProspectDashboardContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-4">
        {/* Today's Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Today</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <FaUsers
                    style={{ color: "blue", fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  Total Leads Today <span>{data.countLeadsToday}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <FaHourglassHalf
                    style={{ color: "orange", fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  Total Pending Today <span>{data.countPendingToday}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <FaTimesCircle
                    style={{ color: "red", fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  Total Expired Today <span>{data.countExpiredToday}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <FaDollarSign
                    style={{ color: "green", fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  Total Paid Today <span>{data.countPaidToday}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <FaGift
                    style={{ color: "purple", fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  Total Free Today <span>{data.countFreeToday}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <FaCheckCircle
                    style={{ color: "teal", fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  Total Hadir Today <span>{data.countHadirToday}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <FaUserPlus
                    style={{ color: "darkblue", fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  Total Sign-Up Today <span>{data.countSignUpToday}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Empty space to take up 2/3 of the row */}
        <div className="col-md-8"></div>

        {/* Filters and Metrics */}
        <div className="row g-3">
          <div className="mb-1 col-md-2">
            <select id="time-filter" className="form-select p-2">
              <option>Orders</option>
              <option>Month to date</option>
              <option>Year to date</option>
            </select>
          </div>
          <div className="row g-3">
            <div className="col">
              <div className="card text-center bg-primary text-white">
                <div className="card-body">
                  <h6 className="card-title">
                    <FaUsers
                      style={{ color: "white", fontSize: "20px" }}
                      className="me-1"
                    />{" "}
                    Leads
                  </h6>
                  <p className="card-text fs-5 fw-bold text-white">
                    {data.countLeadsToday}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center bg-warning text-white">
                <div className="card-body">
                  <h6 className="card-title">
                    <FaHourglassHalf
                      style={{ color: "white", fontSize: "20px" }}
                      className="me-1"
                    />{" "}
                    Pending
                  </h6>
                  <p className="card-text fs-5 fw-bold text-white">
                    {data.countPendingToday}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center bg-danger text-white">
                <div className="card-body">
                  <h6 className="card-title">
                    <FaTimesCircle
                      style={{ color: "white", fontSize: "20px" }}
                      className="me-1"
                    />{" "}
                    Expired
                  </h6>
                  <p className="card-text fs-5 fw-bold text-white">
                    {data.countExpiredToday}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center bg-success text-white">
                <div className="card-body">
                  <h6 className="card-title">
                    <FaDollarSign
                      style={{ color: "white", fontSize: "20px" }}
                      className="me-1"
                    />{" "}
                    Paid
                  </h6>
                  <p className="card-text fs-5 fw-bold text-white">
                    {data.countPaidToday}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center bg-secondary text-white">
                <div className="card-body">
                  <h6 className="card-title">
                    <FaGift
                      style={{ color: "white", fontSize: "20px" }}
                      className="me-1"
                    />{" "}
                    Free
                  </h6>
                  <p className="card-text fs-5 fw-bold text-white">
                    {data.countFreeToday}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center bg-info text-white">
                <div className="card-body">
                  <h6 className="card-title">
                    <FaCheckCircle
                      style={{ color: "white", fontSize: "20px" }}
                      className="me-1"
                    />{" "}
                    Hadir
                  </h6>
                  <p className="card-text fs-5 fw-bold text-white">
                    {data.countHadirToday}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center bg-dark text-white">
                <div className="card-body">
                  <h6 className="card-title">
                    <FaUserPlus
                      style={{ color: "white", fontSize: "20px" }}
                      className="me-1"
                    />{" "}
                    Sign-Up
                  </h6>
                  <p className="card-text fs-5 fw-bold text-white"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="row g-4 mt-4">
        {/* Source Table */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-white">
              <h5 className="mb-0">Source</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ad</td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <td>WiCi</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>SocMed</td>
                    <td>200</td>
                  </tr>
                  <tr>
                    <td>Referral</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Website</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>WAB</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>200</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>1010</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sign-Up Table */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-white">
              <h5 className="mb-0">Sign-Up</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Sign-Up</th>
                    <th>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SP</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Non SP</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>150</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prospect;
