// src/context/StudentContext.js

import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownData, setDropdownData] = useState({
    courses: [],
    branches: [],
    programs: [],
  });
  const cache = new Map();

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("studentsall");
      setStudents(response.data);
    } catch (error) {
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentById = async (id) => {
    if (cache.has(id)) {
      setStudent(cache.get(id));
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.get(`students-ds/${id}`);
      setStudent(response.data);
      cache.set(id, response.data);
    } catch (error) {
      setError("Failed to fetch student data");
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, studentData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `students-ds/${id}`,
        studentData
      );
      setStudent(response.data.student); // Menyimpan data yang diperbarui
    } catch (error) {
      setError("Failed to update student data");
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const response = await axiosInstance.get("dropdownData");
      setDropdownData({
        courses: response.data.courses,
        branches: response.data.branches,
        programs: response.data.programs,
      });
    } catch (error) {
      setError("Failed to fetch dropdown data");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchDropdownData();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students,
        student,
        loading,
        error,
        dropdownData,
        fetchStudents,
        fetchStudentById,
        updateStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
