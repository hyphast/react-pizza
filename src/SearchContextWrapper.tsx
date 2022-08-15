import React, { useMemo } from 'react'

type SearchType = {
  searchValue: string
  setSearchValue: () => string
}
export const SearchContext = React.createContext<SearchType | null>(null)

type SearchContextProps = {
  value: SearchType
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
