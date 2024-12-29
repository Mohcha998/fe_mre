import React, { createContext, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";

const InterestContext = createContext();

export const useInterestContext = () => {
  return useContext(InterestContext);
};

export const InterestProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleInterestSubmission = async (interestData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put("payment/update", interestData, {
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
    <InterestContext.Provider
      value={{ handleInterestSubmission, loading, error, message }}
    >
      {children}
    </InterestContext.Provider>
  );
};
