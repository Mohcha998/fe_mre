import React, { createContext, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";

// Membuat DaftarHadirContext
const DaftarHadirContext = createContext();

export const useDaftarHadirContext = () => {
  return useContext(DaftarHadirContext);
};

export const DaftarHadirProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

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
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DaftarHadirContext.Provider
      value={{ handleManualPayment, loading, error, message }}
    >
      {children}
    </DaftarHadirContext.Provider>
  );
};
