import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Context creation
export const ProspectContext = createContext();

export const useProspects = () => {
  return useContext(ProspectContext);
};

// Fetching data with React Query
const fetchProspects = async () => {
  const response = await axiosInstance.get("prospect");
  return response.data;
};

const fetchSPProspects = async () => {
  const response = await axiosInstance.get("spcall");
  return response.data;
};

const fetchPrgProspects = async () => {
  const response = await axiosInstance.get("prgcall");
  return response.data;
};

const fetchInterestProspects = async () => {
  const response = await axiosInstance.get("interest-call");
  return response.data;
};

const fetchProspectCount = async () => {
  const response = await axiosInstance.get("count_prospect");
  return response.data.count;
};

const fetchPendingCount = async () => {
  const response = await axiosInstance.get("count_pending");
  return response.data.count;
};

const fetchExpiredCount = async () => {
  const response = await axiosInstance.get("count_expired");
  return response.data.count;
};

const fetchPaidCount = async () => {
  const response = await axiosInstance.get("count_paid");
  return response.data.count;
};

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

  // State initialization for prospects and spprospects
  const [prospects, setProspects] = useState([]);
  const [spprospects, setSPProspects] = useState([]);
  const [filteredSPProspects, setFilteredSPProspects] = useState([]);

  // Using React Query hooks
  const { data: fetchedProspects = [], isLoading: loading, error } = useQuery({
    queryKey: ["prospects"],
    queryFn: fetchProspects
  });
  const { data: fetchedSPProspects = [] } = useQuery({
    queryKey: ["spprospects"],
    queryFn: fetchSPProspects
  });
  const { data: prgprospects = [] } = useQuery({
    queryKey: ["prgprospects"],
    queryFn: fetchPrgProspects
  });
  const { data: interestprospects = [] } = useQuery({
    queryKey: ["interestprospects"],
    queryFn: fetchInterestProspects
  });
  const { data: prospectCount } = useQuery({
    queryKey: ["prospectCount"],
    queryFn: fetchProspectCount
  });
  const { data: pendingCount } = useQuery({
    queryKey: ["pendingCount"],
    queryFn: fetchPendingCount
  });
  const { data: expiredCount } = useQuery({
    queryKey: ["expiredCount"],
    queryFn: fetchExpiredCount
  });
  const { data: paidCount } = useQuery({
    queryKey: ["paidCount"],
    queryFn: fetchPaidCount
  });

  // Update state when new data is fetched
  useEffect(() => {
    setProspects(fetchedProspects);
    setSPProspects(fetchedSPProspects);
  }, [fetchedProspects, fetchedSPProspects]);

  // Filter logic
  const applyFilters = () => {
    const result = spprospects.filter((item) => {
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

    setFilteredSPProspects(result);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, spprospects]);

  // Update Prospect logic
  const updateProspect = async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`prospect/${id}`, updatedData);
      const updatedProspect = response.data;

      // Update the state with the updated prospect
      setProspects((prevProspects) =>
        prevProspects.map((prospect) =>
          prospect.id === id
            ? { ...prospect, ...updatedData, ...updatedProspect }
            : prospect
        )
      );

      return updatedProspect;
    } catch (error) {
      console.error("Error updating prospect:", error);
    }
  };

  // Register user logic
  const registerUser = async (data) => {
    try {
      const response = await axiosInstance.post("register", data);
      if (response.status === 201) {
        alert("User registered successfully");
      }
    } catch (error) {
      console.error("Error registering user", error);
      alert("Failed to register user");
    }
  };

  // Check-in logic
  const checkInMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.put(`/prospects/checkin/${id}`);
      return response.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["prospects"]);
      const previousData = queryClient.getQueryData(["prospects"]);
      queryClient.setQueryData(["prospects"], (old) =>
        old.map((prospect) =>
          prospect.id === id
            ? { ...prospect, tgl_checkin: new Date().toISOString() }
            : prospect
        )
      );
      return { previousData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["prospects"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["prospects"]);
    },
  });

  const handleCheckin = async (id) => {
    try {
      await checkInMutation.mutateAsync(id);
    } catch {
    }
  };

  // Filter prospects function
  const filterProspects = (filters) => {
    const { startDate, endDate, ...otherFilters } = filters;

    return prospects.filter((item) => {
      const itemDate = new Date(item.created_at);

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const withinDateRange =
        (!start || itemDate >= start) && (!end || itemDate <= end);

      const matchesFilters = Object.entries(otherFilters).every(
        ([key, value]) => !value || item[key] === value
      );

      return withinDateRange && matchesFilters;
    });
  };

  return (
    <ProspectContext.Provider
      value={{
        prospects,
        handleCheckin,
        registerUser,
        spprospects,
        prgprospects,
        interestprospects,
        filteredSPProspects,
        loading,
        error,
        updateProspect,
        filterProspects,
        prospectCount,
        pendingCount,
        expiredCount,
        paidCount,
        filters,
        setFilters,
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};
