import React from "react";

// Create context
const TransfersContext = React.createContext();
TransfersContext.displayName = "TransfersContext";

// Creating parent component
function Transfers({ children }) {
  const [transfers, setTransfer] = React.useState({});

  return (
    <TransfersContext.Provider value={{ transfers, setTransfer }}>
      {children}
    </TransfersContext.Provider>
  );
}

// Custom hook
function useTransfer() {
  const context = React.useContext(TransfersContext);

  if (!context) {
    throw new Error("useTransfer must be used within a <Transfers />");
  }

  return context;
}

export default Transfers;
export { TransfersContext, useTransfer };