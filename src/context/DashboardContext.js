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
    refetchInterval: 60000,
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
    refetchInterval: 60000,
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
    refetchInterval: 60000,
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
    refetchInterval: 60000,
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
    refetchInterval: 60000,
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
    refetchInterval: 60000,
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
    refetchInterval: 60000,
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
    refetchInterval: 60000,
  });

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
    isLoading:
      isLoading ||
      isTopBranchesLoading ||
      isBranchRevenueLoading ||
      isBranchRevenueMonthLoading ||
      isStudentLastThreeMonthsLoading ||
      isPaymentLastThreeMonthsLoading,
    error:
      error ||
      topBranchesError ||
      branchRevenueError ||
      branchRevenueMonthError ||
      topBranchesRevenueMonthError ||
      topBranchesRevenueError ||
      studentLastThreeMonthsError ||
      paymentLastThreeMonthsError,
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
