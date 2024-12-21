import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const ProspectContext = createContext();

export const useProspects = () => {
  return useContext(ProspectContext);
};

export const ProspectProvider = ({ children }) => {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all prospects
  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/prospect");
        setProspects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prospects:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchProspects();
  }, []);

  // Update prospect data
  const updateProspect = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/prospect/${id}`,
        updatedData
      );
      const updatedProspect = response.data;

      // Update state locally
      setProspects((prevProspects) =>
        prevProspects.map((prospect) =>
          prospect.id === id ? updatedProspect : prospect
        )
      );

      return updatedProspect;
    } catch (error) {
      console.error("Error updating prospect:", error);
      setError(error);
    }
  };

  // Filter prospects based on criteria
  const filterProspects = (filters) => {
    const { startDate, endDate, ...otherFilters } = filters;

    return prospects.filter((item) => {
      const itemDate = new Date(item.date);
      const withinDateRange =
        (!startDate || itemDate >= new Date(startDate)) &&
        (!endDate || itemDate <= new Date(endDate));

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
        setProspects,
        loading,
        error,
        updateProspect,
        filterProspects, // Expose filtering function
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};
