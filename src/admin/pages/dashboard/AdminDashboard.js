import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import { useDashboard } from "../../../context/DashboardContext";
import { formatRupiah } from "../../../helper/helper";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("all-time");

  const {
    branchStd,
    branchTotal,
    topBranches,
    branchesRevenue = [],
    branchesRevenueMonth = [],
    totalRevenue,
    topBranchesRevenue,
    topBranchesRevenueMonth,
    studentLastThreeMonths,
    paymentLastThreeMonths,
    labelStudent,
    labelPayment,
    isLoading,
    error,
  } = useDashboard();

  // console.log(studentLastThreeMonths);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const labels = topBranches.map((branch) => branch.name);
  const series = topBranches.map((branch) => branch.total_students);

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

  const orderStatistic = {
    chart: {
      height: 165,
      width: 130,
      type: "donut",
    },
    labels: labels,
    series: series,
    colors: ["#4635B1", "#AEEA94", "#C4D9FF"],
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
              label: "Total",
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tableData =
    activeTab === "all-time" ? branchesRevenue : branchesRevenueMonth;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {/* Total Student*/}
        <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-6">
          <div className="card" style={{ height: "650px" }}>
            <div className="card-header d-flex justify-content-between">
              <div className="card-title mb-0">
                <h5 className="mb-1 me-2">Total Leads</h5>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-6">
                <div className="d-flex flex-column align-items-center gap-1">
                  <h3 className="mb-1">{branchTotal}</h3>
                  <small>Total Leads</small>
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
                style={{ maxHeight: "380px", overflowY: "auto" }}
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Learning Centre</th>
                      <th>Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchStd.map((data, index) => (
                      <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.kode_cabang}</td>
                        <td>{data.total_students}</td>
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
                  <h3 className="mb-1">{formatRupiah(currentTotalRevenue)}</h3>
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

        {/* Grafik Student */}
        <div className="col-lg-4 col-12">
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
  );
};

export default AdminDashboard;
