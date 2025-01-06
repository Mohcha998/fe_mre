import React, { createContext, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Context creation
export const DaftarHadirContext = createContext();

export const useDaftarHadirContext = () => {
  return useContext(DaftarHadirContext);
};

// Fetching data with React Query
const fetchDaftarHadir = async () => {
  const response = await axiosInstance.get("prgcall");
  return response.data;
};

export const DaftarHadirProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    branch_name: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    data: attendanceRecords = [],
    isLoading: attendanceLoading,
    error: attendanceError,
  } = useQuery({
    queryKey: ["attendanceRecords"],
    queryFn: fetchDaftarHadir,
  });

  const handleManualPayment = async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("manual", paymentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage(response.data.message);

      // Invalidate manualPayments query to refresh data
      queryClient.invalidateQueries(["  "]);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DaftarHadirContext.Provider
      value={{
        attendanceRecords,
        handleManualPayment,
        loading,
        error,
        message,
        filters,
        setFilters,
      }}
    >
      {children}
    </DaftarHadirContext.Provider>
  );
};
