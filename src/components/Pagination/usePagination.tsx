import { useMemo } from 'react'
import { PaginationParams } from './types'

const getRange = (start: number, end: number): string[] => {
  const length = end - start + 1
  return new Array(length)
    .fill(start)
    .map((item, index) => String(item + index))
}

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 2,
  currentPage,
}: PaginationParams) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const pageNumbers = 5 + siblingCount

    if (totalPageCount < pageNumbers) {
      const pagination = getRange(1, totalPageCount)
      return [pagination, totalPageCount] as const
    }

    const leftSiblingIndex = currentPage - siblingCount
    const rightSiblingIndex = currentPage + siblingCount

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const DOTS = '...'

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftSideLength = 3 + 2 * siblingCount
      const leftSideRange = getRange(1, leftSideLength)
      const pagination = [...leftSideRange, DOTS, String(totalPageCount)]
      return [pagination, totalPageCount] as const
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightSideLength = 3 + 2 * siblingCount
      const rightSideRange = getRange(
        totalPageCount - rightSideLength + 1,
        totalPageCount
      )
      const pagination = ['1', DOTS, ...rightSideRange]
      return [pagination, totalPageCount] as const
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex)
      const pagination = [
        '1',
        DOTS,
        ...middleRange,
        DOTS,
        String(totalPageCount),
      ]
      return [pagination, totalPageCount] as const
    }

    return []
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}

export default usePagination
