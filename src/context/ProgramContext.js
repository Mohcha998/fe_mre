import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const ProgramContext = createContext();

export const useProgram = () => {
  return useContext(ProgramContext);
};

export const ProgramProvider = ({ children }) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/programs");
      setPrograms(response.data);
    } catch (err) {
      setError("Failed to load programs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <ProgramContext.Provider value={{ programs, loading, error }}>
      {children}
    </ProgramContext.Provider>
  );
};
