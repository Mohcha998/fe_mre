import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const [branchStdResponse, branchTotalResponse] = await Promise.all([
        axiosInstance.get("branches_std"),
        axiosInstance.get("branches_dat"),
      ]);

      return {
        branchStd: branchStdResponse.data,
        branchTotal:
          branchTotalResponse.data.length > 0
            ? branchTotalResponse.data[0].total_students_all
            : 0,
      };
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const {
    data: topBranches,
    isLoading: isTopBranchesLoading,
    error: topBranchesError,
  } = useQuery({
    queryKey: ["topThreeBranches"],
    queryFn: async () => {
      const response = await axiosInstance.get("branches_donut");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const {
    data: topBranchesRevenue,
    isLoading: isTopBranchesRevenueLoading,
    error: topBranchesRevenueError,
  } = useQuery({
    queryKey: ["topThreeBranchesRevenue"],
    queryFn: async () => {
      const response = await axiosInstance.get("branch_top");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const {
    data: branchRevenue,
    isLoading: isBranchRevenueLoading,
    error: branchRevenueError,
  } = useQuery({
    queryKey: ["branchRevenue"],
    queryFn: async () => {
      const response = await axiosInstance.get("branch_rev");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const {
    data: topBranchesRevenueMonth,
    isLoading: isTopBranchesRevenueMonthLoading,
    error: topBranchesRevenueMonthError,
  } = useQuery({
    queryKey: ["topThreeBranchMonthRevenue"],
    queryFn: async () => {
      const response = await axiosInstance.get("branch_topm");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const {
    data: branchRevenueMonth,
    isLoading: isBranchRevenueMonthLoading,
    error: branchRevenueMonthError,
  } = useQuery({
    queryKey: ["branchRevenueMonth"],
    queryFn: async () => {
      const response = await axiosInstance.get("branch_revm");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const {
    data: studentLastThreeMonths,
    isLoading: isStudentLastThreeMonthsLoading,
    error: studentLastThreeMonthsError,
  } = useQuery({
    queryKey: ["studentLastThreeMonths"],
    queryFn: async () => {
      const response = await axiosInstance.get("student_month");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const {
    data: paymentLastThreeMonths,
    isLoading: isPaymentLastThreeMonthsLoading,
    error: paymentLastThreeMonthsError,
  } = useQuery({
    queryKey: ["paymentLastThreeMonths"],
    queryFn: async () => {
      const response = await axiosInstance.get("payment_month");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Fetch Today Sign Data
  const {
    data: todaySignData,
    isLoading: isTodaySignLoading,
    error: todaySignError,
  } = useQuery({
    queryKey: ["todaySignData"],
    queryFn: async () => {
      const response = await axiosInstance.get("today-sign");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Fetch Today Pending Data
  const {
    data: todayPendingData,
    isLoading: isTodayPendingLoading,
    error: todayPendingError,
  } = useQuery({
    queryKey: ["todayPendingData"],
    queryFn: async () => {
      const response = await axiosInstance.get("today-pending");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Fetch Today Expired Data
  const {
    data: todayExpiredData,
    isLoading: isTodayExpiredLoading,
    error: todayExpiredError,
  } = useQuery({
    queryKey: ["todayExpiredData"],
    queryFn: async () => {
      const response = await axiosInstance.get("today-expired");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Fetch Today Paid Data
  const {
    data: todayPaidData,
    isLoading: isTodayPaidLoading,
    error: todayPaidError,
  } = useQuery({
    queryKey: ["todayPaidData"],
    queryFn: async () => {
      const response = await axiosInstance.get("today-paid");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Fetch Today Sign Yearly Data
  const {
    data: todaySignyData,
    isLoading: isTodaySignyLoading,
    error: todaySignyError,
  } = useQuery({
    queryKey: ["todaySignyData"],
    queryFn: async () => {
      const response = await axiosInstance.get("today-signy");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Fetch Today Pending Yearly Data
  const {
    data: todayPendingyData,
    isLoading: isTodayPendingyLoading,
    error: todayPendingyError,
  } = useQuery({
    queryKey: ["todayPendingyData"],
    queryFn: async () => {
      const response = await axiosInstance.get("today-pendingy");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Fetch Today Expired Yearly Data
  const {
    data: todayExpiredyData,
    isLoading: isTodayExpiredyLoading,
    error: todayExpiredyError,
  } = useQuery({
    queryKey: ["todayExpiredyData"],
    queryFn: async () => {
      const response = await axiosInstance.get("today-expiredy");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Fetch Today Paid Yearly Data
  const {
    data: todayPaidyData,
    isLoading: isTodayPaidyLoading,
    error: todayPaidyError,
  } = useQuery({
    queryKey: ["todayPaidyData"],
    queryFn: async () => {
      const response = await axiosInstance.get("today-paidy");
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Combine all loading states
  const isLoadingAll =
    isLoading ||
    isTodaySignLoading ||
    isTodayPendingLoading ||
    isTodayExpiredLoading ||
    isTodayPaidLoading ||
    isTodaySignyLoading ||
    isTodayPendingyLoading ||
    isTodayExpiredyLoading ||
    isTodayPaidyLoading ||
    isTopBranchesLoading ||
    isBranchRevenueLoading ||
    isBranchRevenueMonthLoading ||
    isStudentLastThreeMonthsLoading ||
    isPaymentLastThreeMonthsLoading;

  // Combine all errors
  const errorAll =
    error ||
    todaySignError ||
    todayPendingError ||
    todayExpiredError ||
    todayPaidError ||
    todaySignyError ||
    todayPendingyError ||
    todayExpiredyError ||
    todayPaidyError ||
    topBranchesError ||
    branchRevenueError ||
    branchRevenueMonthError ||
    topBranchesRevenueMonthError ||
    topBranchesRevenueError ||
    studentLastThreeMonthsError ||
    paymentLastThreeMonthsError;

  const value = {
    branchStd: dashboardData?.branchStd || [],
    branchTotal: dashboardData?.branchTotal || 0,
    topBranches: topBranches || [],
    topBranchesRevenue: topBranchesRevenue || [],
    topBranchesRevenueMonth: topBranchesRevenueMonth || [],
    totalRevenue: branchRevenue?.total_revenue || 0,
    branchesRevenue: branchRevenue?.branches || [],
    branchesRevenueMonth: branchRevenueMonth?.branches || [],
    studentLastThreeMonths: studentLastThreeMonths?.series || [],
    labelStudent: studentLastThreeMonths?.labels || [],
    paymentLastThreeMonths: paymentLastThreeMonths?.series || [],
    labelPayment: paymentLastThreeMonths?.labels || [],
    todaySign: todaySignData || {},
    todayPending: todayPendingData || {},
    todayExpired: todayExpiredData || {},
    todayPaid: todayPaidData || {},
    todaySigny: todaySignyData || {},
    todayPendingy: todayPendingyData || {},
    todayExpiredy: todayExpiredyData || {},
    todayPaidy: todayPaidyData || {},
    isLoading: isLoadingAll,
    error: errorAll,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
