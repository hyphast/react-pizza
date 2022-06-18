import React from 'react';

const SortDropdownMenu = (
  { sortList, selectedSort, setSelectedSort, setIsDropdownVisible }
) => {
  const handleSort = (sort) => {
    setSelectedSort(sort)
    setIsDropdownVisible(false)
  }

  return (
    <div className="sort__popup">
      <ul>
        {sortList.map(sort => (
          <li key={ sort.sortProperty }
              className={ selectedSort.sortProperty === sortList.sortProperty ? 'active' : '' }
              onClick={ () => handleSort(sort) }
          >
            { sort.name }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortDropdownMenu;
