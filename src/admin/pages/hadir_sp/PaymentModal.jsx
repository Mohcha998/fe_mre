import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useProgram } from "../../../context/ProgramContext";
import { useDaftarHadirContext } from "../../../context/DaftarHadirContext"; // Import context

const PaymentModal = ({ show, onClose, onSubmit, prospectData }) => {
  const { programs, loading, error } = useProgram();
  const {
    handleManualPayment,
    loading: paymentLoading,
    error: paymentError,
    message,
  } = useDaftarHadirContext();

  const [selectedProgram, setSelectedProgram] = useState(
    prospectData?.id_program || ""
  );
  const [paymentStatus, setPaymentStatus] = useState("1");
  const [course, setCourse] = useState("1");
  const [numChildren, setNumChildren] = useState(1);
  const [voucherCode, setVoucherCode] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const handleStatusChange = (e) => {
    setPaymentStatus(e.target.value);
  };

  const handleStatusCourse = (e) => {
    setCourse(e.target.value);
  };

  const handleNumChildrenChange = (e) => {
    setNumChildren(e.target.value);
  };

  const handleVoucherCodeChange = (e) => {
    setVoucherCode(e.target.value);
  };

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  useEffect(() => {
    setSelectedProgram(prospectData?.id_program || "");
  }, [prospectData]);

  const handleProgramChange = (e) => {
    setSelectedProgram(e.target.value);
  };

  const handleSubmit = () => {
    // Persiapkan data pembayaran yang akan dikirim
    const paymentData = {
      parent_id: prospectData?.id,
      program_id: selectedProgram,
      course: course,
      num_children: numChildren,
      voucher_code: voucherCode,
      total: paymentAmount,
      payment_status: paymentStatus,
      payment_method: paymentStatus === "1" ? "bank_transfer" : "",
    };

    handleManualPayment(paymentData);
    onClose(); // Menutup modal setelah submit
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="id_program" className="form-label">
              Program
            </label>
            <input type="text" id="parent_id" value={prospectData?.id} />
            {loading ? (
              <p>Loading programs...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <select
                className="form-select"
                id="id_program"
                onChange={handleProgramChange}
              >
                <option value="">Select Program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <select
              className="form-select"
              id="course"
              onChange={handleStatusCourse}
            >
              <option value="1">Full Program</option>
              <option value="2">Modul</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="num_children" className="form-label">
              Number of Children
            </label>
            <input
              type="number"
              id="num_children"
              className="form-control"
              min="1"
              onChange={handleNumChildrenChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="voucher_code" className="form-label">
              Voucher Code (Optional)
            </label>
            <input
              type="text"
              id="voucher_code"
              className="form-control"
              onChange={handleVoucherCodeChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="paymentAmount" className="form-label">
              Payment Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="paymentAmount"
              onChange={handlePaymentAmountChange}
              placeholder="Enter payment amount"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="paymentStatus" className="form-label">
              Payment Status
            </label>
            <select
              className="form-select"
              id="paymentStatus"
              onChange={handleStatusChange}
            >
              <option value="0">Pending</option>
              <option value="1">Paid</option>
            </select>
          </div>

          {paymentStatus === "1" && (
            <div className="mb-3">
              <label htmlFor="paymentMethod" className="form-label">
                Payment Method
              </label>
              <select className="form-select" id="paymentMethod">
                <option value="1">Bank Transfer</option>
                <option value="2">Credit Card</option>
              </select>
            </div>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={paymentLoading}
        >
          Create Payment
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
