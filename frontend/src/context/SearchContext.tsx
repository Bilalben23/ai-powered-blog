import { createContext, useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchContextType {
    searchText: string;
    setSearchText: (value: string) => void
}


export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(() => searchParams.get("q") || "");

    useEffect(() => {
        const currentParams = Object.fromEntries(searchParams.entries());
        const newParams = {
            ...currentParams,
            q: searchText
        };
        setSearchParams(newParams);
    }, [searchText]);


    return <SearchContext.Provider value={{ searchText, setSearchText }}>
        {children}
    </SearchContext.Provider>
}

