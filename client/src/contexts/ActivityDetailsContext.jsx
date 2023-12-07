import React, { createContext } from "react";

export const ActivityDetailsContext = createContext()

const ActivityDetailsContextProvider = ({ children }) => {
  return ( 
    <ActivityDetailsContext.Provider>
      {children}
    </ActivityDetailsContext.Provider>
  );
}

export default ActivityDetailsContextProvider;