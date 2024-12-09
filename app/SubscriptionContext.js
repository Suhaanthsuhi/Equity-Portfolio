import React, { createContext, useState } from "react";

// Create the context
export const SubscriptionContext = createContext();

// Context Provider Component
export const SubscriptionProvider = ({ children }) => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <SubscriptionContext.Provider value={{ subscribed, setSubscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
