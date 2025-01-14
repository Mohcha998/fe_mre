import React, { useState } from "react";
import ApexCharts from "react-apexcharts";

const allTimeData = [
  { no: 1, branch: "Branch 1", revenue: 5000 },
  { no: 2, branch: "Branch 2", revenue: 4000 },
  { no: 3, branch: "Branch 3", revenue: 3000 },
  { no: 4, branch: "Branch 4", revenue: 2000 },
  { no: 5, branch: "Branch 5", revenue: 1000 },
  { no: 5, branch: "Branch 5", revenue: 1000 },
  { no: 5, branch: "Branch 5", revenue: 1000 },
  { no: 5, branch: "Branch 5", revenue: 1000 },
  { no: 5, branch: "Branch 5", revenue: 1000 },
  { no: 5, branch: "Branch 5", revenue: 1000 },
];

const monthlyData = [
  { no: 1, branch: "Branch 1", revenue: 400 },
  { no: 2, branch: "Branch 2", revenue: 350 },
  { no: 3, branch: "Branch 3", revenue: 300 },
  { no: 4, branch: "Branch 4", revenue: 200 },
  { no: 5, branch: "Branch 5", revenue: 150 },
  { no: 5, branch: "Branch 5", revenue: 150 },
  { no: 5, branch: "Branch 5", revenue: 150 },
  { no: 5, branch: "Branch 5", revenue: 150 },
  { no: 5, branch: "Branch 5", revenue: 150 },
  { no: 5, branch: "Branch 5", revenue: 150 },
];

const studentData = [
  { no: 1, branch: "Branch 1", students: 400 },
  { no: 2, branch: "Branch 2", students: 350 },
  { no: 3, branch: "Branch 3", students: 300 },
  { no: 4, branch: "Branch 4", students: 200 },
  { no: 5, branch: "Branch 5", students: 150 },
  { no: 5, branch: "Branch 5", students: 150 },
  { no: 5, branch: "Branch 5", students: 150 },
  { no: 5, branch: "Branch 5", students: 150 },
  { no: 5, branch: "Branch 5", students: 150 },
  { no: 5, branch: "Branch 5", students: 150 },
  { no: 5, branch: "Branch 5", students: 150 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("all-time");

  const allTimeConfig = {
    chart: {
      height: 165,
      width: 130,
      type: "donut",
    },
    labels: ["Electronic", "Sports", "Decor", "Fashion"],
    series: [85, 15, 50, 50],
    colors: ["#3b82f6", "#d1d5db", "#10b981", "#f97316"],
    stroke: {
      width: 5,
      colors: ["#ffffff"],
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${parseInt(val)}%`,
    },
    legend: {
      show: false,
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        right: 15,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            value: {
              fontSize: "1.5rem",
              fontFamily: "Public Sans",
              color: "#000000",
              offsetY: -15,
              formatter: (val) => `${parseInt(val)}%`,
            },
            name: {
              offsetY: 20,
              fontFamily: "Public Sans",
            },
            total: {
              show: true,
              fontSize: "0.8125rem",
              color: "#666",
              label: "Weekly",
              formatter: () => "38%",
            },
          },
        },
      },
    },
  };

  const monthlyConfig = {
    chart: {
      height: 165,
      width: 130,
      type: "donut",
    },
    labels: ["January", "February", "March", "April"],
    series: [60, 40, 30, 20],
    colors: ["#3b82f6", "#d1d5db", "#10b981", "#f97316"],
    stroke: {
      width: 5,
      colors: ["#ffffff"],
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${parseInt(val)}%`,
    },
    legend: {
      show: false,
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        right: 15,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            value: {
              fontSize: "1.5rem",
              fontFamily: "Public Sans",
              color: "#000000",
              offsetY: -15,
              formatter: (val) => `${parseInt(val)}%`,
            },
            name: {
              offsetY: 20,
              fontFamily: "Public Sans",
            },
            total: {
              show: true,
              fontSize: "0.8125rem",
              color: "#666",
              label: "Monthly",
              formatter: () => "25%",
            },
          },
        },
      },
    },
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Set table data based on active tab
  const tableData = activeTab === "all-time" ? allTimeData : monthlyData;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3">Dashboard MRE</h4>

      <div className="row g-3">
        {/* Total Student*/}
        <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-6">
          <div className="card" style={{ height: "620px" }}>
            <div className="card-header d-flex justify-content-between">
              <div className="card-title mb-0">
                <h5 className="mb-1 me-2">Total Students</h5>
                <p className="card-subtitle">42.82k Total Students</p>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-6">
                <div className="d-flex flex-column align-items-center gap-1">
                  <h3 className="mb-1">8,258</h3>
                  <small>Total Students</small>
                </div>
                <div id="orderStatisticsChart"></div>
              </div>
              <div
                className="table-responsive mt-4"
                style={{ maxHeight: "350px", overflowY: "auto" }}
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Branch</th>
                      <th>Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((data) => (
                      <tr key={data.no}>
                        <td>{data.no}</td>
                        <td>{data.branch}</td>
                        <td>{data.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-6">
          <div className="card" style={{ height: "620px" }}>
            <div className="card-header d-flex justify-content-between">
              <div className="card-title mb-0">
                <ul className="nav nav-pills" role="tablist">
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${
                        activeTab === "all-time" ? "active" : ""
                      }`}
                      role="tab"
                      onClick={() => handleTabClick("all-time")}
                    >
                      All Time
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${
                        activeTab === "monthly" ? "active" : ""
                      }`}
                      role="tab"
                      onClick={() => handleTabClick("monthly")}
                    >
                      Monthly
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-6">
                <div className="d-flex flex-column align-items-center gap-1">
                  <h3 className="mb-1">8,258</h3>
                  <small>Total Orders</small>
                </div>
                <div id="monthlyConfig">
                  <ApexCharts
                    options={
                      activeTab === "all-time" ? allTimeConfig : monthlyConfig
                    }
                    series={
                      activeTab === "all-time"
                        ? allTimeConfig.series
                        : monthlyConfig.series
                    }
                    type="donut"
                    height={165}
                    width={130}
                  />
                </div>
              </div>
              <div
                className="table-responsive mt-4"
                style={{ maxHeight: "350px", overflowY: "auto" }}
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Branch</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data) => (
                      <tr key={data.no}>
                        <td>{data.no}</td>
                        <td>{data.branch}</td>
                        <td>{data.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-4 mb-6">
          <div class="card" style={{ height: "298px" }}>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center flex-sm-row flex-column gap-10">
                <div class="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                  <div class="card-title mb-6">
                    <h5 class="text-nowrap mb-1">Student Report</h5>
                    <span class="badge bg-label-warning">YEAR 2024</span>
                  </div>
                </div>
              </div>
              <div id="incomeChart"></div>
            </div>
          </div>

          <div class="card mt-4 mb-4" style={{ height: "298px" }}>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center flex-sm-row flex-column gap-10">
                <div class="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                  <div class="card-title mb-6">
                    <h5 class="text-nowrap mb-1">Profile Report</h5>
                    <span class="badge bg-label-warning">YEAR 2024</span>
                  </div>
                </div>
              </div>
              <div id="revenueChart"></div>
            </div>
          </div>
        </div>

        {/*sss */}
      </div>
    </div>
  );
};

export default AdminDashboard;
