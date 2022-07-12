import React, { useEffect, useState } from 'react'
import styles from './Pagination.module.scss'
import usePagination from './usePagination'

const Pagination = ({
  totalCount,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  siblingCount = 2,
}) => {
  const [pagination, totalPageCount] = usePagination({
    totalCount,
    currentPage,
    pageSize,
    siblingCount,
  })

  const onMoveLeft = () => {
    if (currentPage < 2) return
    setCurrentPage(currentPage - 1)
  }

  const onMoveRight = () => {
    if (currentPage > totalPageCount - 1) return
    setCurrentPage(currentPage + 1)
  }

  const onChangePageSize = (e) => {
    setPageSize(e.target.value)
    setCurrentPage(1)
  }

  return (
    <ul className={styles.root}>
      <li className={styles.arrow}>
        <button type="button" onClick={onMoveLeft}>
          ←
        </button>
      </li>
      {pagination.map((item, index) => {
        if (item === '...') {
          return (
            <li className={styles.dots} key={`Dots ${index}`}>
              &#8230;
            </li>
          )
        }
        return (
          <li
            className={item === currentPage ? styles.selected : ''}
            key={item}
          >
            <button type="button" onClick={() => setCurrentPage(item)}>
              {item}
            </button>
          </li>
        )
      })}
      <li className={styles.arrow}>
        <button type="button" onClick={onMoveRight}>
          →
        </button>
      </li>
      <li>
        <select
          onChange={onChangePageSize}
          value={pageSize}
          className={styles.pageSize}
          name="select"
        >
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </select>
      </li>
    </ul>
  )
}

export default Pagination
