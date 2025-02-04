import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axiosInstance from "../api/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";

export const ProspectContext = createContext();
export const useProspects = () => useContext(ProspectContext);

// Fetch functions
const fetchProspects = async () => (await axiosInstance.get("prospect")).data;
const fetchSPProspects = async () => (await axiosInstance.get("spcall")).data;
const fetchPrgProspects = async () => (await axiosInstance.get("prgcall")).data;
const fetchNonProspects = async () =>
  (await axiosInstance.get("nonspcall")).data;
const fetchInterestProspects = async () =>
  (await axiosInstance.get("interest-call")).data;
const fetchCounts = async (endpoint) =>
  (await axiosInstance.get(endpoint)).data.count;

export const ProspectProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    branch_name: "",
    program_name: "",
    status: "",
    source: "",
  });
  const [filteredSPProspects, setFilteredSPProspects] = useState([]);

  // React Query Hooks with Correct Syntax
  const { data: prospects = [] } = useQuery({
    queryKey: ["prospects"],
    queryFn: fetchProspects,
    staleTime: 5 * 60 * 1000,
  });
  const { data: spprospects = [] } = useQuery({
    queryKey: ["spprospects"],
    queryFn: fetchSPProspects,
    staleTime: 5 * 60 * 1000,
  });
  const { data: prgprospects = [] } = useQuery({
    queryKey: ["prgprospects"],
    queryFn: fetchPrgProspects,
    staleTime: 5 * 60 * 1000,
  });
  const { data: nonspcall = [] } = useQuery({
    queryKey: ["nonspcall"],
    queryFn: fetchNonProspects,
    staleTime: 5 * 60 * 1000,
  });
  const { data: interestprospects = [] } = useQuery({
    queryKey: ["interestprospects"],
    queryFn: fetchInterestProspects,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch Counts
  const { data: prospectCount } = useQuery({
    queryKey: ["prospectCount"],
    queryFn: () => fetchCounts("count_prospect"),
    staleTime: 10 * 60 * 1000,
  });
  const { data: pendingCount } = useQuery({
    queryKey: ["pendingCount"],
    queryFn: () => fetchCounts("count_pending"),
    staleTime: 10 * 60 * 1000,
  });
  const { data: expiredCount } = useQuery({
    queryKey: ["expiredCount"],
    queryFn: () => fetchCounts("count_expired"),
    staleTime: 10 * 60 * 1000,
  });
  const { data: paidCount } = useQuery({
    queryKey: ["paidCount"],
    queryFn: () => fetchCounts("count_paid"),
    staleTime: 10 * 60 * 1000,
  });

  // Apply Filters with Debounce
  const applyFilters = useCallback(
    debounce(() => {
      setFilteredSPProspects(
        spprospects.filter((item) => {
          const itemDate = new Date(item.created_at);
          const start = filters.startDate ? new Date(filters.startDate) : null;
          const end = filters.endDate ? new Date(filters.endDate) : null;
          const withinDateRange =
            (!start || itemDate >= start) && (!end || itemDate <= end);
          const matchesFilters = Object.entries(filters).every(
            ([key, value]) => !value || item[key] === value
          );
          return withinDateRange && matchesFilters;
        })
      );
    }, 500),
    [filters, spprospects]
  );

  useEffect(() => {
    applyFilters();
  }, [filters, spprospects, applyFilters]);

  // Update Prospect Mutation
  const updateProspectMutation = useMutation({
    mutationFn: async ({ id, updatedData }) =>
      (await axiosInstance.put(`prospect/${id}`, updatedData)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["prospects"] }),
  });

  // Check-in Mutation
  const checkInMutation = useMutation({
    mutationFn: async (id) =>
      (await axiosInstance.put(`/prospects/checkin/${id}`)).data,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["prospects"] });
      const previousData = queryClient.getQueryData(["prospects"]);
      queryClient.setQueryData(["prospects"], (old) =>
        old.map((p) =>
          p.id === id ? { ...p, tgl_checkin: new Date().toISOString() } : p
        )
      );
      return { previousData };
    },
    onError: (err, id, context) =>
      queryClient.setQueryData(["prospects"], context.previousData),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["prospects"] }),
  });

  // Filter Prospects Function
  const filterProspects = (filters) => {
    return prospects.filter((item) => {
      const itemDate = new Date(item.created_at);
      const start = filters.startDate ? new Date(filters.startDate) : null;
      const end = filters.endDate ? new Date(filters.endDate) : null;
      const withinDateRange =
        (!start || itemDate >= start) && (!end || itemDate <= end);
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => !value || item[key] === value
      );
      return withinDateRange && matchesFilters;
    });
  };

  return (
    <ProspectContext.Provider
      value={{
        prospects,
        handleCheckin: checkInMutation.mutateAsync,
        updateProspect: updateProspectMutation.mutateAsync,
        spprospects,
        prgprospects,
        nonspcall,
        interestprospects,
        filteredSPProspects,
        prospectCount,
        pendingCount,
        expiredCount,
        paidCount,
        filters,
        setFilters,
        filterProspects,
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};
