import { createContext, useState } from 'react';

//Default Context Value
const initialState = "BTC";

//Export Context
export const TabContext = createContext(initialState);

//Function to set value
export const TabContextProvider = ({ children }, {value}) => {
    const [selectedTab, setSelectedTab] = useState("BTC");
  
    const selection = (value) => setSelectedTab(value);
  
    return (
      <TabContext.Provider value={{ selectedTab, selection }}>
        {children}
      </TabContext.Provider>
    );
};
