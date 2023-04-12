import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [filter, setFilter] = useState({Housing: "", Food:"", Transportation:"", "Personal Spending":""});

  return (
    <DataContext.Provider value={{ selectedFilter, setSelectedFilter, currentPage, setCurrentPage, min, setMin, max, setMax, filter, setFilter }}>
      {children}
    </DataContext.Provider>
  );
};