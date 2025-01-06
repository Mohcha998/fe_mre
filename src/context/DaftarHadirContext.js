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
  const response = await axiosInstance.get("daftarhadir");
  return response.data;
};

const fetchManualPayments = async () => {
  const response = await axiosInstance.get("manual-payments");
  return response.data;
};

const fetchAttendanceCount = async () => {
  const response = await axiosInstance.get("count_attendance");
  return response.data.count;
};

const fetchPendingPayments = async () => {
  const response = await axiosInstance.get("pending-payments");
  return response.data.count;
};

const fetchCompletedPayments = async () => {
  const response = await axiosInstance.get("completed-payments");
  return response.data.count;
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

  const { data: attendanceRecords = [], isLoading: attendanceLoading, error: attendanceError } = useQuery({
    queryKey: ["attendanceRecords"],
    queryFn: fetchDaftarHadir,
  });

  const { data: manualPayments = [], isLoading: paymentsLoading, error: paymentsError } = useQuery({
    queryKey: ["manualPayments"],
    queryFn: fetchManualPayments,
  });

  const { data: attendanceCount } = useQuery({
    queryKey: ["attendanceCount"],
    queryFn: fetchAttendanceCount,
  });

  const { data: pendingPayments } = useQuery({
    queryKey: ["pendingPayments"],
    queryFn: fetchPendingPayments,
  });

  const { data: completedPayments } = useQuery({
    queryKey: ["completedPayments"],
    queryFn: fetchCompletedPayments,
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
      queryClient.invalidateQueries(["manualPayments"]);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const registerAttendance = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("attendance/register", data);
      if (response.status === 201) {
        setMessage("Attendance registered successfully");

        // Invalidate attendanceRecords query to refresh data
        queryClient.invalidateQueries(["attendanceRecords"]);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to register attendance");
    } finally {
      setLoading(false);
    }
  };

  const paymentMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.put(`/payments/confirm/${id}`);
      return response.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["manualPayments"]);
      const previousData = queryClient.getQueryData(["manualPayments"]);
      queryClient.setQueryData(["manualPayments"], (old) =>
        old.map((payment) =>
          payment.id === id
            ? { ...payment, status: "Confirmed" }
            : payment
        )
      );
      return { previousData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["manualPayments"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["manualPayments"]);
    },
  });

  const handlePaymentConfirmation = async (id) => {
    try {
      await paymentMutation.mutateAsync(id);
    } catch {
      setError("Failed to confirm payment");
    }
  };

  return (
    <DaftarHadirContext.Provider
      value={{
        attendanceRecords,
        manualPayments,
        attendanceCount,
        pendingPayments,
        completedPayments,
        handleManualPayment,
        registerAttendance,
        handlePaymentConfirmation,
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
