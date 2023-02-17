import { createContext, useState, useEffect } from "react";

const FilterContext = createContext();
export default FilterContext;

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({})
    const contextData = {
        filters: filters,
        setFilters: setFilters
    }

    return (
		<FilterContext.Provider value={contextData}>{children}</FilterContext.Provider>
	);
}