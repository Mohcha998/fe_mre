import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentContext } from "../../../context/StudentContext";

const EditStudent = () => {
  const { id } = useParams();
  const {
    fetchStudentById,
    updateStudent,
    student,
    loading,
    error,
    dropdownData,
  } = useContext(StudentContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    tgl_lahir: "",
    id_course: "",
    id_branch: "",
    id_program: "",
    asal_sekolah: "",
    jenis_kelamin: "",
    jadwal: "",
    father: { name: "", phone: "", email: "" },
    mother: { name: "", phone: "", email: "" },
  });

  const [dropdownLoading, setDropdownLoading] = useState(true); // Loading state for dropdown data

  const navigate = useNavigate();
  const hasFetched = useRef(false); // Prevent multiple API calls

  // Fetch student data once when component mounts
  useEffect(() => {
    if (!hasFetched.current) {
      fetchStudentById(id);
      hasFetched.current = true;
    }
  }, [id]);

  // Update form state when student data is available
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        phone: student.phone || "",
        email: student.email || "",
        tgl_lahir: student.tgl_lahir || "",
        id_course: student.id_course || "",
        id_branch: student.id_branch || "",
        id_program: student.id_program || "",
        asal_sekolah: student.asal_sekolah || "",
        jenis_kelamin: student.jenis_kelamin || "",
        jadwal: student.jadwal || "",
        father: {
          name: student.father?.name || "",
          phone: student.father?.phone || "",
          email: student.father?.email || "",
        },
        mother: {
          name: student.mother?.name || "",
          phone: student.mother?.phone || "",
          email: student.mother?.email || "",
        },
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, field] = name.split(".");

      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(id, formData); // Sending data to the backend
    navigate("/students");
  };

  if (loading) return <div>Loading student data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-12 col-xl-12">
          <div className="card shadow-lg">
            <div className="card-header d-flex justify-content-between">
              <h4>Edit Student</h4>
              <button
                onClick={() => navigate("/admin/data-student")}
                className="btn btn-secondary btn-sm"
              >
                Back
              </button>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="tgl_lahir"
                        value={formData.tgl_lahir}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>School Origin</label>
                      <input
                        type="text"
                        name="asal_sekolah"
                        value={formData.asal_sekolah}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Dropdown for Course, Branch, and Program */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Course</label>
                      <select
                        name="id_course"
                        value={formData.id_course}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="">Select Course</option>
                        {dropdownData.courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Branch</label>
                      <select
                        name="id_branch"
                        value={formData.id_branch}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="">Select Branch</option>
                        {dropdownData.branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Program</label>
                      <select
                        name="id_program"
                        value={formData.id_program}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="">Select Program</option>
                        {dropdownData.programs.map((program) => (
                          <option key={program.id} value={program.id}>
                            {program.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Father's Info */}
                <h3>Father's Info</h3>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Father's Name</label>
                      <input
                        type="text"
                        name="father.name"
                        value={formData.father.name}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Father's Phone</label>
                      <input
                        type="text"
                        name="father.phone"
                        value={formData.father.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Father's Email</label>
                      <input
                        type="email"
                        name="father.email"
                        value={formData.father.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Mother's Info */}
                <h3>Mother's Info</h3>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Mother's Name</label>
                      <input
                        type="text"
                        name="mother.name"
                        value={formData.mother.name}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Mother's Phone</label>
                      <input
                        type="text"
                        name="mother.phone"
                        value={formData.mother.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Mother's Email</label>
                      <input
                        type="email"
                        name="mother.email"
                        value={formData.mother.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
