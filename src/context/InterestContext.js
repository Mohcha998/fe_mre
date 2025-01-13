import React, { createContext, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const InterestContext = createContext();

export const useInterestContext = () => {
  return useContext(InterestContext);
};

// Fungsi untuk mengupdate interest
const updateInterest = async (interestData) => {
  const response = await axiosInstance.put("payment/update", interestData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const InterestProvider = ({ children }) => {
  // Menggunakan useMutation dengan format object
  const mutation = useMutation({
    mutationFn: updateInterest, // Fungsi untuk melakukan mutasi
  });

  return (
    <InterestContext.Provider
      value={{
        handleInterestSubmission: mutation.mutate, // Function to trigger the mutation
        loading: mutation.isLoading, // Loading state
        error: mutation.error, // Error state
        message: mutation.data?.message, // Success message
      }}
    >
      {children}
    </InterestContext.Provider>
  );
};
