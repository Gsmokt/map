import React, { useContext, createContext, useState } from "react";

const AppContext = createContext();

export const initialTravelHistoryState = localStorage.getItem("history")
  ? JSON.parse(localStorage.getItem("history"))
  : [];

const AppProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState({
    cord1: [],
    cord2: [],
  });
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelHistory, setTravelHistory] = useState(initialTravelHistoryState);
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        coordinates,
        setCoordinates,
        origin,
        setOrigin,
        destination,
        setDestination,
        travelHistory,
        setTravelHistory,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const setHistory = (historyData, setTravelHistory) => {
  const history = localStorage.getItem("history");
  if (!history) {
    localStorage.setItem("history", JSON.stringify(historyData));
    const currentHistory = JSON.parse(localStorage.getItem("history"));
    setTravelHistory(currentHistory);
  } else {
    const currentHistoryData = JSON.parse(history);
    localStorage.setItem(
      "history",
      JSON.stringify([...currentHistoryData, ...historyData])
    );
    const currentHistory = JSON.parse(localStorage.getItem("history"));
    setTravelHistory(currentHistory);
  }
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
