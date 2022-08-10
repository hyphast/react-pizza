import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './Pagination.module.scss'
import usePagination from './usePagination'
import {
  setCurrentPage,
  setPageSize,
} from '../../redux/filterSlice/filterSlice'

const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  siblingCount = 2,
}) => {
  const dispatch = useDispatch()
  const [pagination, totalPageCount] = usePagination({
    totalCount,
    currentPage,
    pageSize,
    siblingCount,
  })

  const onMoveLeft = () => {
    if (currentPage < 2) return
    dispatch(setCurrentPage(currentPage - 1))
  }

  const onMoveRight = () => {
    if (currentPage > totalPageCount - 1) return
    dispatch(setCurrentPage(currentPage + 1))
  }

  const onChangePageSize = (e) => {
    dispatch(setCurrentPage(1))
    dispatch(setPageSize(e.target.value))
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
            <button
              type="button"
              onClick={() => dispatch(setCurrentPage(item))}
            >
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
