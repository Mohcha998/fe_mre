import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

// Membuat context untuk siswa
const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get("studentsall");
        setStudents(response.data);
      } catch (error) {
        setError("Failed to fetch students");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, loading, error }}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
