'use client'
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

export interface State {
  searchTerm: string;
}

const initialState = {
  searchTerm: '',
};

export const SearchContext = React.createContext<State | any>(initialState);

SearchContext.displayName = 'SearchContext';

export const SearchProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [searchTerm, updateSearchTerm] = useState('');

  useEffect(() => {
  }, []);

  const value = useMemo(
    () => ({
      searchTerm,
      updateSearchTerm,
    }),
    [searchTerm]
  );

  return <SearchContext.Provider value={value} {...props} />;
};

export const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error(`useSearch must be used within a SearchProvider`);
  }
  return context;
};
