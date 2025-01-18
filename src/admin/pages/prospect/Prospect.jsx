import React from "react";

const Prospect = () => {
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
                <li className="list-group-item d-flex justify-content-between">
                  Total Leads Today <span>70</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Total Pending Today <span>10</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Total Expired Today <span>10</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Total Paid Today <span>10</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Total Free Today <span>10</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Total Hadir Today <span>10</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Total Sign-Up Today <span>10</span>
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
              <div className="card text-center">
                <div className="card-body">
                  <h6 className="card-title">Leads</h6>
                  <p className="card-text fs-5 fw-bold">100</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center">
                <div className="card-body">
                  <h6 className="card-title">Pending</h6>
                  <p className="card-text fs-5 fw-bold">100</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center">
                <div className="card-body">
                  <h6 className="card-title">Expired</h6>
                  <p className="card-text fs-5 fw-bold">100</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center">
                <div className="card-body">
                  <h6 className="card-title">Paid</h6>
                  <p className="card-text fs-5 fw-bold">100</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center">
                <div className="card-body">
                  <h6 className="card-title">Free</h6>
                  <p className="card-text fs-5 fw-bold">100</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center">
                <div className="card-body">
                  <h6 className="card-title">Hadir</h6>
                  <p className="card-text fs-5 fw-bold">100</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center">
                <div className="card-body">
                  <h6 className="card-title">Sign-Up</h6>
                  <p className="card-text fs-5 fw-bold">100</p>
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
            <div className="card-header bg-secondary text-white">
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
            <div className="card-header bg-secondary text-white">
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
