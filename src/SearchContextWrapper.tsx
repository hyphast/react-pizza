import React, { useMemo } from 'react'

type SearchType = {
  searchValue: string
  setSearchValue: Function
}
export const SearchContext = React.createContext<SearchType | null>(null)

type SearchContextProps = {
  value: { searchValue: string; setSearchValue: Function }
  children: React.ReactNode
}
const SearchContextWrapper: React.FC<SearchContextProps> = ({
  value,
  children,
}) => {
  const { searchValue, setSearchValue } = value

  const searchContextValue: SearchType = useMemo(
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
