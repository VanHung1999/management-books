// Pagination utility functions

export interface PaginationData<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  currentPage: number;
  pageSize: number;
}

/**
 * Calculate pagination data for a given array of items
 * @param items - Array of items to paginate
 * @param params - Pagination parameters
 * @returns PaginationData object with all pagination information
 */
export const calculatePagination = <T>(
  items: T[],
  params: PaginationParams
): PaginationData<T> => {
  const { currentPage, pageSize } = params;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = items.slice(startIndex, endIndex);
  
  return {
    items: currentItems,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
};

/**
 * Get pagination info for display
 * @param paginationData - Pagination data object
 * @returns Formatted pagination info string
 */
export const getPaginationInfo = (paginationData: PaginationData<any>): string => {
  const { startIndex, endIndex, totalItems } = paginationData;
  return `${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems} items`;
};

/**
 * Validate pagination parameters
 * @param currentPage - Current page number
 * @param pageSize - Items per page
 * @param totalItems - Total number of items
 * @returns Object with validation result and corrected parameters
 */
export const validatePaginationParams = (
  currentPage: number,
  pageSize: number,
  totalItems: number
): {
  isValid: boolean;
  correctedPage: number;
  correctedPageSize: number;
  errors: string[];
} => {
  const errors: string[] = [];
  let correctedPage = currentPage;
  let correctedPageSize = pageSize;

  // Validate page size
  if (pageSize < 1) {
    errors.push('Page size must be at least 1');
    correctedPageSize = 1;
  }

  if (pageSize > 100) {
    errors.push('Page size cannot exceed 100');
    correctedPageSize = 100;
  }

  // Validate current page
  const maxPage = Math.ceil(totalItems / correctedPageSize) || 1;
  
  if (currentPage < 1) {
    errors.push('Current page must be at least 1');
    correctedPage = 1;
  }

  if (currentPage > maxPage && totalItems > 0) {
    errors.push(`Current page cannot exceed ${maxPage}`);
    correctedPage = maxPage;
  }

  return {
    isValid: errors.length === 0,
    correctedPage,
    correctedPageSize,
    errors
  };
};

/**
 * Get page numbers for pagination component
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param maxVisible - Maximum number of page buttons to show
 * @returns Array of page numbers to display
 */
export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Default page size options
 */
export const DEFAULT_PAGE_SIZES = [
  { value: 5, label: '5 items' },
  { value: 10, label: '10 items' },
  { value: 15, label: '15 items' },
  { value: 20, label: '20 items' },
  { value: 25, label: '25 items' },
  { value: 30, label: '30 items' },
];

/**
 * Default pagination configuration
 */
export const DEFAULT_PAGINATION_CONFIG = {
  pageSize: 10,
  maxVisiblePages: 5,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: true
} as const;
