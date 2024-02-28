import { createContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');

    return (
        <SearchContext.Provider value={{ searchText, setSearchText }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;