"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const TransactionContext = createContext();

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [graphData, setGraphData] = useState();
  useEffect(() => {
    const storedHistory = localStorage.getItem("transaction");
    const transactionHistory = storedHistory ? JSON.parse(storedHistory) : [];
    setGraphData(transactionHistory);
  }, []);

  
    
  

  return (
    <TransactionContext.Provider value={{ graphData }}>
      {children}
    </TransactionContext.Provider>
  );
};
