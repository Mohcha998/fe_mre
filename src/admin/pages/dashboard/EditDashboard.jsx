import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import Swal

const EditDashboard = ({ participant, onSave, onCancel }) => {
  const [formData, setFormData] = useState({});

  // Daftar opsi dropdown
  const programOptions = ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"];
  const branchOptions = ["KG", "BSD", "PI"];
  const classOptions = ["A", "B"];
  const statusOptions = ["Active", "Pending", "Expired", "Paid"];

  useEffect(() => {
    setFormData(participant || {});
  }, [participant]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    Swal.fire({
      title: 'Success!',
      text: 'Participant details have been saved.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Participant</h5>
            <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Input untuk ID (readonly) */}
                <div className="col-md-6">
                  <label className="form-label">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id || ""}
                    readOnly
                    className="form-control"
                  />
                </div>

                {/* Input lainnya */}
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">HP</label>
                  <input
                    type="text"
                    name="hp"
                    value={formData.hp || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Dropdown Program */}
                <div className="col-md-6">
                  <label className="form-label">Program</label>
                  <select
                    name="program"
                    value={formData.program || ""}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {programOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown Branch */}
                <div className="col-md-6">
                  <label className="form-label">Branch</label>
                  <select
                    name="branch"
                    value={formData.branch || ""}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {branchOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown Class */}
                <div className="col-md-6">
                  <label className="form-label">Class</label>
                  <select
                    name="class"
                    value={formData.class || ""}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {classOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown Status */}
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status || ""}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Invitation Code</label>
                  <input
                    type="text"
                    name="invitationCode"
                    value={formData.invitationCode || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">FU</label>
                  <input
                    type="text"
                    name="FU"
                    value={formData.FU || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="btn btn-success me-2">
                  Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDashboard;
