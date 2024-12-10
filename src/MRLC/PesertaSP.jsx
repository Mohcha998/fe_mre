import React from "react";

const tableData = [
  { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "PS", branch: "PI", date: "2022-01-01" },
  { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "SL", branch: "BSD", date: "2022-02-01" },
  { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LS", branch: "KG", date: "2022-03-01" },
  { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "PSA", branch: "PI", date: "2022-04-01" },
  { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "PCPS", branch: "BSD", date: "2022-05-01" },
  { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "HP", branch: "KG", date: "2022-06-01" },
  { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "IAY", branch: "PI", date: "2022-07-01" },
  { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "PS", branch: "BSD", date: "2022-08-01" },
];

const TableHeader = () => (
  <thead>
    <tr>
      {["No", "Name", "HP", "Email", "Branch", "Program", "Action"].map((header) => (
        <th key={header} className="text-center">{header}</th>
      ))}
    </tr>
  </thead>
);

const TableBody = ({ data, onCheckIn }) => (
  <tbody>
    {data.map(({ id, name, hp, email, program, branch }) => (
      <tr key={id}>
        <td className="text-center">{id}</td>
        <td>{name}</td>
        <td>{hp}</td>
        <td>{email}</td>
        <td>{branch}</td>
        <td>{program}</td>
        <td className="text-center">
          <button className="btn btn-primary" onClick={() => onCheckIn(id)}>Check-in</button>
        </td>
      </tr>
    ))}
  </tbody>
);

const PesertaPS = ({ setActiveDetail }) => {
  const handleCheckIn = (id) => {
    // Logic for handling check-in can be added here
    setActiveDetail(id);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mt-4 shadow-sm">
        <div className="card-header text-white">
          <h5 className="mb-0">Daftar Peserta SP</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <TableHeader />
            <TableBody data={tableData} onCheckIn={handleCheckIn} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default PesertaPS;
