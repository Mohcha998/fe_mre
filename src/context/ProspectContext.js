import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";

const ProspectContext = createContext();

export const useProspects = () => {
  return useContext(ProspectContext);
};

export const ProspectProvider = ({ children }) => {
  const [prospects, setProspects] = useState([]);
  const [spprospects, setSPProspects] = useState([]);
  const [prgprospects, setPrgProspects] = useState([]);
  const [registprospects, setRegistprospects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prospectCount, setProspectCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);
  const [expiredCount, setExpiredCount] = useState(null);
  const [paidCount, setPaidCount] = useState(null);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    branch_name: "",
    program_name: "",
    status: "",
    source: "",
  });
  const [filteredSPProspects, setFilteredSPProspects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProspects = await axiosInstance.get("prospect");
        setProspects(responseProspects.data);

        const responseSPProspects = await axiosInstance.get("spcall");
        setSPProspects(responseSPProspects.data);

        const responsePrgProspects = await axiosInstance.get("prgcall");
        setPrgProspects(responsePrgProspects.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    const fetchProspectCount = async () => {
      try {
        const response = await axiosInstance.get("count_prospect");
        setProspectCount(response.data.count);
      } catch (error) {
        console.error("Error fetching prospect count:", error);
        setError(error);
      }
    };

    const fetchPendingCount = async () => {
      try {
        const response = await axiosInstance.get("count_pending");
        setPendingCount(response.data.count);
      } catch (error) {
        console.error("Error fetching prospect count:", error);
        setError(error);
      }
    };

    const fetchExpiredCount = async () => {
      try {
        const response = await axiosInstance.get("count_expired");
        setExpiredCount(response.data.count);
      } catch (error) {
        console.error("Error fetching prospect count:", error);
        setError(error);
      }
    };

    const fetchPaidCount = async () => {
      try {
        const response = await axiosInstance.get("count_paid");
        setPaidCount(response.data.count);
      } catch (error) {
        console.error("Error fetching prospect count:", error);
        setError(error);
      }
    };

    fetchData();
    fetchPaidCount();
    fetchExpiredCount();
    fetchPendingCount();
    fetchProspectCount();
  }, []);

  const updateProspect = async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`prospect/${id}`, updatedData);
      const updatedProspect = response.data;

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
      setError(error);
    }
  };

  const registerUser = async (data) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("register", data);

      if (response.status === 201) {
        setRegistprospects((prev) => [...prev, response.data.user]);
        alert("User registered successfully");
      }
    } catch (error) {
      console.error("Error registering user", error);
      alert("Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckin = async (id) => {
    try {
      const response = await axiosInstance.put(`/prospects/checkin/${id}`);

      setProspects((prevProspects) =>
        prevProspects.map((prospect) =>
          prospect.id === id
            ? { ...prospect, tgl_checkin: response.data.prospect.tgl_checkin }
            : prospect
        )
      );

      setSPProspects((prevSPProspects) =>
        prevSPProspects.map((prospect) =>
          prospect.id === id
            ? { ...prospect, tgl_checkin: response.data.prospect.tgl_checkin }
            : prospect
        )
      );

      return response.data;
    } catch (error) {
      console.error("Error checking in prospect:", error);
      setError(error);
    }
  };

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

  // Apply filters to spprospects
  useEffect(() => {
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

    applyFilters();
  }, [filters, spprospects]);

  return (
    <ProspectContext.Provider
      value={{
        prospects,
        setProspects,
        handleCheckin,
        registerUser,
        spprospects,
        prgprospects,
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
        registprospects,
        setFilters,
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};
