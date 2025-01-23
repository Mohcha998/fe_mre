import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const ProspectDashboardContext = createContext();

const ProspectDashboardProvider = ({ children }) => {
  const [data, setData] = useState({
    countPaidToday: 0,
    countPendingToday: 0,
    countLeadsToday: 0,
    countFreeToday: 0,
    countExpiredToday: 0,
    countHadirToday: 0,
    countSignUpToday: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axiosInstance.get("count_paid_today"),
          axiosInstance.get("count_pending_today"),
          axiosInstance.get("count_leads_today"),
          axiosInstance.get("count_free_today"),
          axiosInstance.get("count_expired_today"),
          axiosInstance.get("count_hadir_today"),
          //   axiosInstance.get("count_signup_today"),
        ]);

        setData({
          countPaidToday: responses[0].data.count,
          countPendingToday: responses[1].data.count,
          countLeadsToday: responses[2].data.count,
          countFreeToday: responses[3].data.count,
          countExpiredToday: responses[4].data.count,
          countHadirToday: responses[5].data.count,
          //   countSignUpToday: responses[6].data.count,
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProspectDashboardContext.Provider value={{ data, loading, error }}>
      {children}
    </ProspectDashboardContext.Provider>
  );
};

export default ProspectDashboardProvider;
