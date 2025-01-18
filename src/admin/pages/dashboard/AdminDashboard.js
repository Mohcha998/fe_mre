import React, { useState } from "react";
import ApexCharts from "react-apexcharts";

const allTimeData = [
  { no: 1, branch: "PI", revenue: 100000000 },
  { no: 2, branch: "BSD", revenue: 100000000 },
  { no: 3, branch: "KG", revenue: 100000000 },
  { no: 4, branch: "PH", revenue: 100000000 },
  { no: 5, branch: "Plm", revenue: 100000000 },
  { no: 6, branch: "GS", revenue: 100000000 },
  { no: 7, branch: "Klm", revenue: 100000000 },
  { no: 8, branch: "Gjm", revenue: 100000000 },
  { no: 9, branch: "GG", revenue: 100000000 },
  { no: 10, branch: "Snt", revenue: 100000000 },
  { no: 11, branch: "Srby-MS", revenue: 100000000 },
  { no: 12, branch: "Srby-MG", revenue: 100000000 },
  { no: 13, branch: "Bndng-Mkr", revenue: 100000000 },
  { no: 14, branch: "Bndng-Smm", revenue: 100000000 },
  { no: 15, branch: "Sol-SB", revenue: 100000000 },
  { no: 16, branch: "Sol-Skh", revenue: 100000000 },
  { no: 17, branch: "Smrng", revenue: 100000000 },
  { no: 18, branch: "Mlng", revenue: 100000000 },
  { no: 19, branch: "Mdn-Prd", revenue: 100000000 },
  { no: 20, branch: "Mkssr", revenue: 100000000 },
  { no: 21, branch: "Jypr", revenue: 100000000 },
  { no: 22, branch: "Pngklpnng", revenue: 100000000 },
  { no: 23, branch: "Btm", revenue: 100000000 },
];

const monthlyData = [
  { no: 1, branch: "PI", revenue: 100000000 },
  { no: 2, branch: "BSD", revenue: 100000000 },
  { no: 3, branch: "KG", revenue: 100000000 },
  { no: 4, branch: "PH", revenue: 100000000 },
  { no: 5, branch: "Plm", revenue: 100000000 },
  { no: 6, branch: "GS", revenue: 100000000 },
  { no: 7, branch: "Klm", revenue: 100000000 },
  { no: 8, branch: "Gjm", revenue: 100000000 },
  { no: 9, branch: "GG", revenue: 100000000 },
  { no: 10, branch: "Snt", revenue: 100000000 },
  { no: 11, branch: "Srby-MS", revenue: 100000000 },
  { no: 12, branch: "Srby-MG", revenue: 100000000 },
  { no: 13, branch: "Bndng-Mkr", revenue: 100000000 },
  { no: 14, branch: "Bndng-Smm", revenue: 100000000 },
  { no: 15, branch: "Sol-SB", revenue: 100000000 },
  { no: 16, branch: "Sol-Skh", revenue: 100000000 },
  { no: 17, branch: "Smrng", revenue: 100000000 },
  { no: 18, branch: "Mlng", revenue: 100000000 },
  { no: 19, branch: "Mdn-Prd", revenue: 100000000 },
  { no: 20, branch: "Mkssr", revenue: 100000000 },
  { no: 21, branch: "Jypr", revenue: 100000000 },
  { no: 22, branch: "Pngklpnng", revenue: 100000000 },
  { no: 23, branch: "Btm", revenue: 100000000 },
];

const studentData = [
  { no: 1, branch: "PI", students: 165 },
  { no: 2, branch: "BSD", students: 163 },
  { no: 3, branch: "KG", students: 188 },
  { no: 4, branch: "PH", students: 118 },
  { no: 5, branch: "Plm", students: 104 },
  { no: 6, branch: "GS", students: 175 },
  { no: 7, branch: "Klm", students: 126 },
  { no: 8, branch: "Gjm", students: 140 },
  { no: 9, branch: "GG", students: 125 },
  { no: 10, branch: "Snt", students: 142 },
  { no: 11, branch: "Srby-MS", students: 110 },
  { no: 12, branch: "Srby-MG", students: 150 },
  { no: 13, branch: "Bndng-Mkr", students: 140 },
  { no: 14, branch: "Bndng-Smm", students: 150 },
  { no: 15, branch: "Sol-SB", students: 129 },
  { no: 16, branch: "Sol-Skh", students: 100 },
  { no: 17, branch: "Smrng", students: 107 },
  { no: 18, branch: "Mlng", students: 137 },
  { no: 19, branch: "Mdn-Prd", students: 169 },
  { no: 20, branch: "Mkssr", students: 122 },
  { no: 21, branch: "Jypr", students: 163 },
  { no: 22, branch: "Pngklpnng", students: 153 },
  { no: 23, branch: "Btm", students: 150 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("all-time");

  const orderStatistic = {
    chart: {
      height: 165,
      width: 130,
      type: "donut",
    },
    labels: ["Electronic", "Sports", "Decor", "Fashion"],
    series: [85, 15, 50, 50],
    colors: ["#4635B1", "#AEEA94", "#C4D9FF", "#C890A7"],
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

  const chartOptions = {
    series: [
      {
        data: [26, 35, 50],
      },
    ],
    options: {
      chart: {
        height: 215,
        parentHeightOffset: 0,
        parentWidthOffset: 0,
        toolbar: {
          show: false,
        },
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
      legend: {
        show: false,
      },
      markers: {
        size: 6,
        colors: "transparent",
        strokeColors: "transparent",
        strokeWidth: 4,
        discrete: [
          {
            fillColor: "#ffffff",
            seriesIndex: 0,
            dataPointIndex: 7,
            strokeColor: "#7367F0", // Ganti dengan warna yang sesuai
            strokeWidth: 2,
            size: 6,
            radius: 8,
          },
        ],
        hover: {
          size: 7,
        },
      },
      colors: ["#7367F0"], // Ganti dengan warna yang sesuai
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.6,
          opacityFrom: 0.5,
          opacityTo: 0.25,
          stops: [0, 95, 100],
        },
      },
      grid: {
        borderColor: "#e7e7e7", // Ganti dengan warna grid
        strokeDashArray: 3,
        padding: {
          top: -20,
          bottom: -8,
          left: -10,
          right: 8,
        },
      },
      xaxis: {
        categories: ["", "Nov", "Des", "Jan"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          style: {
            fontSize: "13px",
            colors: "#6e6b7b", // Ganti dengan warna axis
          },
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        min: 10,
        max: 50,
        tickAmount: 4,
      },
    },
  };

  const chartbawah = {
    series: [
      {
        data: [26, 35, 50],
      },
    ],
    options: {
      chart: {
        height: 215,
        parentHeightOffset: 0,
        parentWidthOffset: 0,
        toolbar: {
          show: false,
        },
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
      legend: {
        show: false,
      },
      markers: {
        size: 6,
        colors: "transparent",
        strokeColors: "transparent",
        strokeWidth: 4,
        discrete: [
          {
            fillColor: "#ffffff",
            seriesIndex: 0,
            dataPointIndex: 7,
            strokeColor: "#7367F0", // Ganti dengan warna yang sesuai
            strokeWidth: 2,
            size: 6,
            radius: 8,
          },
        ],
        hover: {
          size: 7,
        },
      },
      colors: ["#7367F0"], // Ganti dengan warna yang sesuai
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.6,
          opacityFrom: 0.5,
          opacityTo: 0.25,
          stops: [0, 95, 100],
        },
      },
      grid: {
        borderColor: "#e7e7e7", // Ganti dengan warna grid
        strokeDashArray: 3,
        padding: {
          top: -20,
          bottom: -8,
          left: -10,
          right: 8,
        },
      },
      xaxis: {
        categories: ["", "Nov", "Des", "Jan"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          style: {
            fontSize: "13px",
            colors: "#6e6b7b", // Ganti dengan warna axis
          },
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        min: 10,
        max: 50,
        tickAmount: 4,
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
      <div className="row g-3">
        {/* Total Student*/}
        <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-6">
          <div className="card" style={{ height: "620px" }}>
            <div className="card-header d-flex justify-content-between">
              <div className="card-title mb-0">
                <h5 className="mb-1 me-2">Total Students</h5>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-6">
                <div className="d-flex flex-column align-items-center gap-1">
                  <h3 className="mb-1">3250</h3>
                  <small>Total Students</small>
                </div>
                <div id="orderStatistic">
                <ApexCharts
                    options={orderStatistic}
                    series={orderStatistic.series}
                    type={orderStatistic.chart.type}
                    height={orderStatistic.chart.height}
                    width={orderStatistic.chart.width}
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
            <div className="card-header d-flex justify-content-between py-2">
              <div className="card-title mb-0">
                <h5 className="mb-3 mt-3">Total Revenue</h5>
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
                className="table-responsive mt-2"
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

        {/* Grafik Student */}
        <div className="col-lg-4 col-12">
          <div className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">Grafik Student</h5>
              <span className="badge bg-label-warning">YEAR 2024</span>
              <div id="chartOptions">
                <ApexCharts
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="area"
                  height={200}
                />
              </div>
            </div>
          </div>

          {/* Grafik Revenue */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Grafik Revenue</h5>
              <span className="badge bg-label-warning">YEAR 2024</span>
              <div id="chartbawah">
                <ApexCharts
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="area"
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
