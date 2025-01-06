import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const ProspectContext = createContext();

export const useProspects = () => {
  return useContext(ProspectContext);
};

export const ProspectProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch data menggunakan React Query
  const { data: prospects, isLoading: loadingProspects, error } = useQuery(
    ["prospects"],
    () => axiosInstance.get("prospect").then((res) => res.data)
  );

  const { data: prospectCount } = useQuery(
    ["prospectCount"],
    () => axiosInstance.get("count_prospect").then((res) => res.data.count)
  );

  const { data: pendingCount } = useQuery(
    ["pendingCount"],
    () => axiosInstance.get("count_pending").then((res) => res.data.count)
  );

  const { data: expiredCount } = useQuery(
    ["expiredCount"],
    () => axiosInstance.get("count_expired").then((res) => res.data.count)
  );

  const { data: paidCount } = useQuery(
    ["paidCount"],
    () => axiosInstance.get("count_paid").then((res) => res.data.count)
  );

  // Mutasi data
  const updateProspectMutation = useMutation(
    ({ id, updatedData }) =>
      axiosInstance.put(`prospect/${id}`, updatedData).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["prospects"]);
      },
    }
  );

  const handleCheckinMutation = useMutation(
    (id) =>
      axiosInstance.put(`/prospects/checkin/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["prospects"]);
      },
    }
  );

  const registerUserMutation = useMutation(
    (data) => axiosInstance.post("register", data),
    {
      onSuccess: () => {
        alert("User registered successfully");
        queryClient.invalidateQueries(["prospects"]);
      },
      onError: () => {
        alert("Failed to register user");
      },
    }
  );

  return (
    <ProspectContext.Provider
      value={{
        prospects,
        prospectCount,
        pendingCount,
        expiredCount,
        paidCount,
        loading: loadingProspects,
        error,
        updateProspect: updateProspectMutation.mutate,
        handleCheckin: handleCheckinMutation.mutate,
        registerUser: registerUserMutation.mutate,
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};
