import React, { useMemo } from 'react'

const getRange = (start, end) => {
  const length = end - start + 1
  return new Array(length).fill(start).map((item, index) => item + index)
}

const usePagination = ({ totalCount, pageSize, siblingCount, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const pageNumbers = 5 + siblingCount

    if (totalPageCount < pageNumbers) {
      const pagination = getRange(1, totalPageCount)
      return [pagination, totalPageCount]
    }

    const leftSiblingIndex = currentPage - siblingCount
    const rightSiblingIndex = currentPage + siblingCount

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const DOTS = '...'

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftSideLength = 3 + 2 * siblingCount
      const leftSideRange = getRange(1, leftSideLength)
      const pagination = [...leftSideRange, DOTS, totalPageCount]
      return [pagination, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightSideLength = 3 + 2 * siblingCount
      const rightSideRange = getRange(
        totalPageCount - rightSideLength + 1,
        totalPageCount
      )
      const pagination = [1, DOTS, ...rightSideRange]
      return [pagination, totalPageCount]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex)
      const pagination = [1, DOTS, ...middleRange, DOTS, totalPageCount]
      return [pagination, totalPageCount]
    }

    return null
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}

export default usePagination
