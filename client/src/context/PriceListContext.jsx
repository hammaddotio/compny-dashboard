import React, { createContext, useContext, useState } from 'react';

// Create the context
const PriceList = createContext();

// Create the context provider component
const PriceListContext = ({ children }) => {
    const [selectedPlanForPayment, setSelectedPlanForPayment] = useState({})

    const value = {
        selectedPlanForPayment,
        setSelectedPlanForPayment
    };

    return (
        <PriceList.Provider value={value}>
            {children}
        </PriceList.Provider>
    );
};

// Custom hook to use the PriceList context
export const usePriceList = () => useContext(PriceList);

export default PriceListContext;
