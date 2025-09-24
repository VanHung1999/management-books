/**
 * Sorting utility functions
 */

/**
 * Sort direction options
 */
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

/**
 * Generic sort function for arrays
 * @param array - Array of items to sort
 * @param field - Field name to sort by (supports nested fields with dot notation)
 * @param direction - Sort direction (asc or desc)
 * @returns Sorted array
 */
export function sortArray<T>(
  array: T[],
  field: keyof T | string,
  direction: SortDirection = SortDirection.ASC
): T[] {
  if (!array || array.length === 0) {
    return array;
  }

  return [...array].sort((a, b) => {
    const aValue = getNestedValue(a, field);
    const bValue = getNestedValue(b, field);

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) {
      return direction === SortDirection.ASC ? 1 : -1;
    }
    if (bValue === null || bValue === undefined) {
      return direction === SortDirection.ASC ? -1 : 1;
    }

    // Compare values
    let comparison = 0;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    } else {
      // Fallback to string comparison
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return direction === SortDirection.ASC ? comparison : -comparison;
  });
}

/**
 * Get nested value from object using dot notation
 * @param obj - Object to get value from
 * @param path - Path to the value (e.g., 'user.name' or 'address.city')
 * @returns Value at the specified path
 */
function getNestedValue<T>(obj: T, path: keyof T | string): any {
  if (typeof path === 'string' && path.includes('.')) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  return obj[path as keyof T];
}

/**
 * Sort array by multiple fields
 * @param array - Array of items to sort
 * @param sortFields - Array of sort field configurations
 * @returns Sorted array
 */
export function sortArrayByMultiple<T>(
  array: T[],
  sortFields: Array<{
    field: keyof T | string;
    direction: SortDirection;
  }>
): T[] {
  if (!array || array.length === 0 || sortFields.length === 0) {
    return array;
  }

  return [...array].sort((a, b) => {
    for (const { field, direction } of sortFields) {
      const aValue = getNestedValue(a, field);
      const bValue = getNestedValue(b, field);

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) {
        if (bValue === null || bValue === undefined) continue;
        return direction === SortDirection.ASC ? 1 : -1;
      }
      if (bValue === null || bValue === undefined) {
        return direction === SortDirection.ASC ? -1 : 1;
      }

      // Compare values
      let comparison = 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      if (comparison !== 0) {
        return direction === SortDirection.ASC ? comparison : -comparison;
      }
    }
    return 0;
  });
}

/**
 * Sort array by string field (case-insensitive)
 * @param array - Array of items to sort
 * @param field - Field name to sort by
 * @param direction - Sort direction
 * @returns Sorted array
 */
export function sortArrayByString<T>(
  array: T[],
  field: keyof T | string,
  direction: SortDirection = SortDirection.ASC
): T[] {
  if (!array || array.length === 0) {
    return array;
  }

  return [...array].sort((a, b) => {
    const aValue = getNestedValue(a, field);
    const bValue = getNestedValue(b, field);

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) {
      return direction === SortDirection.ASC ? 1 : -1;
    }
    if (bValue === null || bValue === undefined) {
      return direction === SortDirection.ASC ? -1 : 1;
    }

    const comparison = String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase());
    return direction === SortDirection.ASC ? comparison : -comparison;
  });
}

/**
 * Sort array by numeric field
 * @param array - Array of items to sort
 * @param field - Field name to sort by
 * @param direction - Sort direction
 * @returns Sorted array
 */
export function sortArrayByNumber<T>(
  array: T[],
  field: keyof T | string,
  direction: SortDirection = SortDirection.ASC
): T[] {
  if (!array || array.length === 0) {
    return array;
  }

  return [...array].sort((a, b) => {
    const aValue = getNestedValue(a, field);
    const bValue = getNestedValue(b, field);

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) {
      return direction === SortDirection.ASC ? 1 : -1;
    }
    if (bValue === null || bValue === undefined) {
      return direction === SortDirection.ASC ? -1 : 1;
    }

    const aNum = Number(aValue);
    const bNum = Number(bValue);
    
    if (isNaN(aNum) || isNaN(bNum)) {
      return 0;
    }

    const comparison = aNum - bNum;
    return direction === SortDirection.ASC ? comparison : -comparison;
  });
}
