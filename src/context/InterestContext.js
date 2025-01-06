import React, { createContext, useContext } from "react";
import axiosInstance from "../api/axiosInstance"; // Pastikan axiosInstance sudah terkonfigurasi dengan benar
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Membuat context untuk Interest
const InterestContext = createContext();

// Hook untuk mengakses context
export const useInterestContext = () => {
  return useContext(InterestContext);
};

// Fungsi untuk mengambil data interests dari server
const fetchInterests = async () => {
  const response = await axiosInstance.get("interest-call");
  return response.data;
};

// InterestProvider untuk menyediakan data ke komponen lain
export const InterestProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Query untuk mengambil data interest
  const {
    data: interests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["interest-call"],
    queryFn: fetchInterests,
  });

  // Mutation untuk menghandle pengiriman interest
  const interestMutation = useMutation({
    mutationFn: async (interestData) => {
      const response = await axiosInstance.put("payment/update", interestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (newData) => {
      console.log("New Data from Mutation:", newData);

      // Update cache dengan data baru setelah mutation berhasil
      queryClient.setQueryData(["interests"], (oldData = []) => {
        const updatedData = [...oldData, newData];
        console.log("Updated Data in Cache:", updatedData);
        return updatedData;
      });

      // Invalidate query untuk memastikan data terbaru diambil dari server
      queryClient.invalidateQueries(["interest-call"]);

      // Memaksa refetch query untuk mengambil data terbaru
      queryClient.refetchQueries(["interest-call"]);
    },
    onError: (err) => {
      console.error("Error updating interest:", err);
    },
  });

  // Fungsi untuk mengirimkan data interest
  const handleInterestSubmission = async (interestData) => {
    try {
      // Log data yang akan dikirimkan
      console.log("Interest Data being submitted:", interestData);
      await interestMutation.mutateAsync(interestData);
    } catch (error) {
      console.error("Error during interest submission:", error);
    }
  };

  return (
    <InterestContext.Provider
      value={{
        interests,
        handleInterestSubmission,
        error: error || interestMutation.error,
      }}
    >
      {children}
    </InterestContext.Provider>
  );
};
