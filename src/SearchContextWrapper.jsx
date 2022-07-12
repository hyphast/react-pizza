import React, { useMemo } from 'react'

export const SearchContext = React.createContext()

const SearchContextWrapper = ({ value, children }) => {
  const { searchValue, setSearchValue } = value

  const searchContextValue = useMemo(
    () => ({ searchValue, setSearchValue }),
    [searchValue, setSearchValue]
  )

  return (
    <SearchContext.Provider value={searchContextValue}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextWrapper
