import React from "react";
import * as XLSX from "xlsx"; // Ubah cara impor

const ExcelExport = ({ data, fileName }) => {
  const exportToExcel = () => {
    // Menambahkan kolom nomor urut
    const dataWithNumbers = data.map((item, index) => ({
      No: index + 1, // Kolom nomor dimulai dari 1
      ...item,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataWithNumbers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <button className="btn btn-primary" onClick={exportToExcel}>
      Export
    </button>
  );
};
export default ExcelExport;
