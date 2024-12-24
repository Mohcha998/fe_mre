import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_PROSPECT_URL = process.env.REACT_APP_PROSPECT_URL; // Fetch URL from .env

const ProspectContext = createContext();

export const useProspects = () => useContext(ProspectContext);

export const ProspectProvider = ({ children }) => {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch prospects data
  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const response = await axios.get(API_PROSPECT_URL);
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

  // Update a specific prospect
  const updateProspect = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_PROSPECT_URL}/${id}`, updatedData);
      const updatedProspect = response.data;

      // Merge updated data with the existing prospect
      setProspects((prevProspects) =>
        prevProspects.map((prospect) =>
          prospect.id === id ? { ...prospect, ...updatedData } : prospect
        )
      );

      return updatedProspect;
    } catch (error) {
      console.error("Error updating prospect:", error);
      setError(error);
    }
  };

  // Filter prospects based on filters
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
        filterProspects,
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};
