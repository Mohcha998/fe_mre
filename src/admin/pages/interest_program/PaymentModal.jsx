import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useProgram } from "../../../context/ProgramContext";
import { useInterestContext } from "../../../context/InterestContext";

const PaymentModal = ({ show, onClose, onSubmit, prospectData }) => {
  const { programs, loading, error } = useProgram();
  const {
    handleInterestSubmission,
    loading: paymentLoading,
    error: paymentError,
    message,
  } = useInterestContext();

  // State untuk form input
  const [selectedProgram, setSelectedProgram] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("1");
  const [course, setCourse] = useState("1");
  const [numChildren, setNumChildren] = useState(1);
  const [voucherCode, setVoucherCode] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  // Saat modal terbuka, sinkronkan state dengan data dari prospectData
  useEffect(() => {
    if (prospectData) {
      setSelectedProgram(prospectData.id_program || "");
      setCourse(prospectData.course || "1");
      setNumChildren(prospectData.num_children || 1);
      setVoucherCode(prospectData.voucher_code || "");
      setPaymentAmount(prospectData.total || "");
      setPaymentStatus(prospectData.status_pembayaran || "0");
    }
  }, [prospectData]);

  const handleSubmit = () => {
    const paymentData = {
      parent_id: prospectData?.id,
      program_id: selectedProgram,
      course,
      payment_id: prospectData?.id_payment,
      num_children: numChildren,
      voucher_code: voucherCode,
      total: paymentAmount,
      payment_status: paymentStatus,
      payment_method: paymentStatus === "1" ? "bank_transfer" : "",
    };

    handleInterestSubmission(paymentData);
    onClose();
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
            <input type="text" id="parent_id" value={prospectData?.id} hidden />
            <input
              type="text"
              id="payment_id"
              value={prospectData?.id_payment}
              hidden
            />
            {loading ? (
              <p>Loading programs...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <select
                className="form-select"
                id="id_program"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
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
              value={course}
              onChange={(e) => setCourse(e.target.value)}
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
              value={numChildren}
              min="1"
              onChange={(e) => setNumChildren(e.target.value)}
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
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
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
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
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
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
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
