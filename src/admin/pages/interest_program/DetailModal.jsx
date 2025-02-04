import React from "react";
import { Modal, Button } from "react-bootstrap";
import { STATUS_OPTIONS } from "./Interest";
import moment from "moment";

const DetailModal = ({ show, onClose, prospectData }) => {
  if (!prospectData) return null;

  const selectedStatus = STATUS_OPTIONS.find(
    (opt) => opt.value === String(prospectData.status)
  );

  const children = prospectData.children || [];

  const imageUrl = prospectData.gambar || "path/to/default/image.jpg";

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detail Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap">
          <div className="mr-3" style={{ flex: 18, maxWidth: "10000px" }}>
            <img
              src={imageUrl}
              alt={prospectData.name}
              className="img-fluid"
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex-grow-1">
            <div className="mb-1 d-flex">
              <strong className="col-4">ID</strong>
              <span className="col-8">: {prospectData.invoice}</span>
            </div>
            <div className="mb-1 d-flex">
              <strong className="col-4">Nama</strong>
              <span className="col-8">: {prospectData.name}</span>
            </div>
            <div className="mb-1 d-flex">
              <strong className="col-4">No HP</strong>
              <span className="col-8">: {prospectData.phone}</span>
            </div>
            <div className="mb-1 d-flex">
              <strong className="col-4">Email</strong>
              <span className="col-8">: {prospectData.email}</span>
            </div>
            <div className="mb-1 d-flex">
              <strong className="col-4">Learning Centre</strong>
              <span className="col-8">: {prospectData.kd_cbg}</span>
            </div>
            <div className="mb-1 d-flex">
              <strong className="col-4">Status</strong>
              <span className="col-8">
                :{/* : {selectedStatus ? selectedStatus.label : " "} */}
              </span>
            </div>
            <div className="mb-1 d-flex">
              <strong className="col-4">Tgl Daftar</strong>
              <span className="col-8">
                : {moment(prospectData.created_at).format("DD MMM YYYY, HH:mm")}
              </span>
            </div>
            <div className="mb-1 d-flex border-bottom">
              {/* <strong className="col-4">Source</strong> */}
              {/* <span className="col-8">: {prospectData.source}</span> */}
            </div>

            {/* Menampilkan data anak-anak (children) */}
            {children.length > 0 && (
              <div className="mt-3">
                <strong>Students:</strong>
                <ul>
                  {children.map((student, index) => (
                    <li key={index}>
                      <div className="mb-1 d-flex">
                        <strong className="col-4">Nama</strong>
                        <span className="col-8">: {prospectData.name}</span>
                      </div>
                      <div className="mb-1 d-flex">
                        <strong className="col-4">Program</strong>
                        <span className="col-8">: {student.program_name}</span>
                      </div>
                      {/* <div className="mb-1 d-flex">
                        <strong className="col-4">Birthdate</strong>
                        <span className="col-8">
                          : {moment(student.tgl_lahir).format("DD-MM-YYYY")}
                        </span>
                      </div> */}
                      <div className="mb-1 d-flex">
                        <strong className="col-4">No HP</strong>
                        <span className="col-8">: {student.tlp_murid}</span>
                      </div>
                      <hr className="my-3 border-gray-400" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailModal;
