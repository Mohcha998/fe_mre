import React, { useState } from "react";
import { MdOutlineCancel, MdPaid } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { formatRupiah } from "../../../helper/helper";
import { useDashboard } from "../../../context/DashboardContext";
import ApexCharts from "react-apexcharts";
import { FaUserGraduate } from "react-icons/fa";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all-time");

  const {
    branchesRevenue = [],
    branchesRevenueMonth = [],
    totalRevenue,
    topBranchesRevenue,
    topBranchesRevenueMonth,
    studentLastThreeMonths,
    paymentLastThreeMonths,
    labelStudent,
    labelPayment,
    todaySign,
    todayPending,
    todayExpired,
    todayPaid,
    todaySigny,
    todayPendingy,
    todayExpiredy,
    todayPaidy,
  } = useDashboard();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const CARD_TODAY = [
    { title: "Total Sign Up", count: todaySign.user_count || "0" },
    { title: "Pending", count: todayPending.count || "0" },
    { title: "Expired", count: todayExpired.count || "0" },
    { title: "Paid", count: todayPaid.count || "0" },
  ];

  const CARD_YTD = [
    {
      icon: <FaUserGraduate style={{ fontSize: "28px", color: "#4CAF50" }} />,
      title: "Total Sign Up",
      count: todaySigny?.user_count || "0",
    }, // Student
    {
      icon: <LuClock3 style={{ fontSize: "28px", color: "#2196F3" }} />,
      title: "Pending",
      count: todayPendingy.count || "0",
    }, // Pending (menunggu)
    {
      icon: <MdOutlineCancel style={{ fontSize: "28px", color: "#FF5722" }} />,
      title: "Expired",
      count: todayExpiredy.count || "0",
    }, // Expired (dibatalkan/kadaluarsa)
    {
      icon: <MdPaid style={{ fontSize: "28px", color: "#FFC107" }} />,
      title: "Paid",
      count: todayPaidy.count || "0",
    }, // Paid (dibayar)
  ];

  const CardYtd = ({ card }) => (
    <div className="col">
      <div className="card text-center" role="button">
        <div className="card-body">
          <div className="mb-2">{card.icon}</div>
          <h6 className="card-title mb-1">{card.title}</h6>
          <p className="fw-bold mb-0">{card.count}</p>
        </div>
      </div>
    </div>
  );

  const CardToday = ({ title, count }) => (
    <div className="col-auto">
      <div
        className="card shadow-sm"
        style={{ width: "200px", height: "50px" }}
        role="button"
      >
        <div className="card-body d-flex justify-content-between align-items-center p-2">
          <h6 className="card-title mb-0">{title}</h6>
          <h6 className="fw-bold mb-0">{count}</h6>
        </div>
      </div>
    </div>
  );

  const currentTotalRevenue =
    activeTab === "all-time"
      ? branchesRevenue.reduce(
          (acc, item) => acc + parseInt(item.total_revenue || 0, 10),
          0
        )
      : branchesRevenueMonth.reduce(
          (acc, item) => acc + parseInt(item.total_revenue || 0, 10),
          0
        );

  const labelsRev =
    topBranchesRevenue?.map((branchrev) => branchrev.name) || [];

  const seriesRev = topBranchesRevenue?.map((branchrev) =>
    parseInt(branchrev.total_revenue, 10)
  );

  const labelsRevm =
    topBranchesRevenueMonth?.map((branchrevm) => branchrevm.name) || [];

  const seriesRevm = topBranchesRevenueMonth?.map((branchrevm) =>
    parseInt(branchrevm.total_revenue, 10)
  );

  const tableData =
    activeTab === "all-time" ? branchesRevenue : branchesRevenueMonth;

  const allTimeConfig = {
    chart: {
      height: 165,
      width: 130,
      type: "donut",
    },
    labels: labelsRev,
    series: seriesRev,
    colors: ["#3b82f6", "#10b981", "#f97316"],
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
              fontSize: "0.9rem",
              fontFamily: "Public Sans",
              color: "#000000",
              offsetY: -15,
              formatter: (val) => `${parseInt(val)}`,
            },
            name: {
              offsetY: 20,
              fontFamily: "Public Sans",
            },
            total: {
              show: true,
              fontSize: "0.8125rem",
              color: "#666",
              label: "Total Revenue",
              formatter: () => `${formatRupiah(totalRevenue)}`,
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
    labels: labelsRevm,
    series: seriesRevm,
    colors: ["#4635B1", "#5B913B", "#638C6D"],
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
              fontSize: "0.9rem",
              fontFamily: "Public Sans",
              color: "#000000",
              offsetY: -15,
              formatter: (val) => `${parseInt(val)}`,
            },
            name: {
              offsetY: 20,
              fontFamily: "Public Sans",
            },
            total: {
              show: true,
              fontSize: "0.8125rem",
              color: "#666",
              label: "Total Revenue",
              formatter: () => `${formatRupiah(currentTotalRevenue)}`,
            },
          },
        },
      },
    },
  };

  const chartatas = {
    series: [
      {
        name: "STUDENT COUNT", // Example name, you can customize this
        data: studentLastThreeMonths[0] || [26, 35, 50],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      labels: labelStudent || ["", "Nov", "Dec", "Jan"],
      xaxis: {
        type: "category",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  };

  const chartbawah = {
    series: [
      {
        name: "PAYMENT COUNT",
        data: paymentLastThreeMonths[0] || [26, 35, 50],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      labels: labelPayment || ["", "Nov", "Dec", "Jan"],
      xaxis: {
        type: "category",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  };

  return (
    // Today
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-2">
        <div className="row g-3">
          <div className="h5 font-weight-bold text-dark">TODAY</div>
          {CARD_TODAY.map((card, index) => (
            <CardToday key={index} title={card.title} count={card.count} />
          ))}
        </div>

        {/* YTD */}
        <div className="row g-3">
          <div className="h5 font-weight-bold text-dark mb-4">YTD</div>
          {CARD_YTD.map((card) => (
            <CardYtd key={card.id} card={card} />
          ))}
        </div>

        {/* Total Revenue */}
        <div className="row g-3">
          <div className="col-md-6 col-lg-4 col-xl-6 order-0 mb-6">
            <div className="card" style={{ height: "650px" }}>
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
                        Yearly
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
                    <h3 className="mb-1">
                      {formatRupiah(currentTotalRevenue)}
                    </h3>
                    <small>Total Revenue</small>
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
                      type={allTimeConfig.chart.type}
                      height={allTimeConfig.chart.height}
                      width={allTimeConfig.chart.width}
                    />
                  </div>
                </div>
                <div
                  className="table-responsive mt-2"
                  style={{ maxHeight: "380px", overflowY: "auto" }}
                >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Learning Centre</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.length > 0 ? (
                        tableData.map((data, index) => (
                          <tr key={data.id || index}>
                            <td>{index + 1}</td>
                            <td>{data.kode_cabang || "N/A"}</td>
                            <td>{formatRupiah(data.total_revenue || 0)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Total Student */}
          <div className="col-md-6 col-lg-4 col-xl-6 order-0 mb-4">
            <div className="card mb-2" style={{ height: "650px" }}>
              <div className="card-header d-flex justify-content-between py-2">
                <div className="card-title mb-0">
                  <h5 className="mb-3 mt-3">Total Student</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Program</th>
                        <th>Student</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Public Speaking</td>
                        <td>100</td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td></td>
                        <td>
                          <strong>100</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Source */}
          <div className="col-md-6 col-lg-4 col-xl-6 order-0 mb-4">
            <div
              className="card"
              style={{
                height: "650px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header Card */}
              <div className="card-header d-flex justify-content-between py-2">
                <h5 className="mb-3 mt-3">Source</h5>
              </div>

              {/* Body Card */}
              <div className="card-body" style={{ flex: 1, overflowY: "auto" }}>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th>Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ad</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>WiCi</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>SocMed</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Referral</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Website</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>WAB</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td>
                          <strong>0</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Grafik Student */}
          <div className="col-lg-6 col-12">
            <div className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">Grafik Student</h5>
                <div id="chartatas">
                  <ApexCharts
                    options={chartatas.options}
                    series={chartatas.series}
                    type="area"
                    height={225}
                  />
                </div>
              </div>
            </div>

            {/* Grafik Revenue */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Grafik Revenue</h5>
                <div id="chartbawah">
                  <ApexCharts
                    options={chartbawah.options}
                    series={chartbawah.series}
                    type="area"
                    height={225}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
