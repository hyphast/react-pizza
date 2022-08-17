import React, { useMemo } from 'react'

type TSearchType = {
  searchValue: string
  setSearchValue: () => string
}
export const SearchContext = React.createContext<TSearchType | null>(null)

type TSearchContextProps = {
  value: TSearchType
  children: React.ReactNode
}
const SearchContextWrapper: React.FC<TSearchContextProps> = ({
  value,
  children,
}) => {
  const { searchValue, setSearchValue } = value

  const searchContextValue: TSearchType = useMemo(
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
