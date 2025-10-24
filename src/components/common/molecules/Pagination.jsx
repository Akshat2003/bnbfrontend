import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  size = 'md',
  showFirstLast = true,
  siblingCount = 1,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-8 min-w-[2rem] text-sm',
    md: 'h-10 min-w-[2.5rem] text-base',
    lg: 'h-12 min-w-[3rem] text-lg',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const paginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 3;
    const totalNumbers = totalPageNumbers + 2;

    if (totalNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  };

  const pages = paginationRange();

  const buttonClasses = (isActive = false, isDisabled = false) =>
    clsx(
      'inline-flex items-center justify-center rounded-md',
      'border border-gray-300 transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
      sizeClasses[size],
      {
        'bg-primary-600 text-white border-primary-600': isActive,
        'bg-white text-gray-700 hover:bg-gray-50': !isActive && !isDisabled,
        'opacity-50 cursor-not-allowed': isDisabled,
      }
    );

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className={clsx('flex items-center gap-1', className)}
      aria-label="Pagination"
    >
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={buttonClasses(false, currentPage === 1)}
          aria-label="Go to first page"
        >
          <FiChevronsLeft className={iconSizeClasses[size]} />
        </button>
      )}

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClasses(false, currentPage === 1)}
        aria-label="Go to previous page"
      >
        <FiChevronLeft className={iconSizeClasses[size]} />
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`dots-${index}`}
              className={clsx(
                'inline-flex items-center justify-center',
                sizeClasses[size]
              )}
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={buttonClasses(page === currentPage)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClasses(false, currentPage === totalPages)}
        aria-label="Go to next page"
      >
        <FiChevronRight className={iconSizeClasses[size]} />
      </button>

      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={buttonClasses(false, currentPage === totalPages)}
          aria-label="Go to last page"
        >
          <FiChevronsRight className={iconSizeClasses[size]} />
        </button>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showFirstLast: PropTypes.bool,
  siblingCount: PropTypes.number,
  className: PropTypes.string,
};

export default Pagination;
