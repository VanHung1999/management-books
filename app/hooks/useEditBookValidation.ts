/**
 * Custom Hooks for Edit Book Validation
 * Hooks for validating forms in the edit book page
 */

import { useCallback } from 'react';
import { 
  UpdateBookDescriptionSchema, 
  UpdateBookStatusSchema,
  validateFormData,
  createValidationRules,
  validateBookStatusTotal
} from '../schemas/editBookSchemas';

/**
 * Hook for Book Description Validation
 */
export function useBookDescriptionValidation() {
  /**
   * Get validation rules for description field
   */
  const getDescriptionRules = useCallback(() => {
    return createValidationRules(UpdateBookDescriptionSchema, 'description');
  }, []);

  /**
   * Validate description form data
   */
  const validateDescription = useCallback((values: { description?: string }) => {
    return validateFormData(UpdateBookDescriptionSchema, values);
  }, []);

  /**
   * Handle description form submission with validation
   */
  const handleDescriptionSubmit = useCallback(
    async (
      form: any,
      values: { description?: string },
      onSubmit: (validatedData: { description: string }) => void | Promise<void>,
      onError?: (errors: Record<string, string>) => void
    ) => {
      const result = validateDescription(values);
      
      if (!result.isValid) {
        if (result.errors) {
          // Set form errors
          const transformedErrors = Object.entries(result.errors).reduce(
            (acc, [field, message]) => {
              acc[field] = { errors: [message] };
              return acc;
            },
            {} as Record<string, { errors: string[] }>
          );
          
          form.setFields(transformedErrors);
          
          if (onError) {
            onError(result.errors);
          }
        }
        return false;
      }
      
      try {
        await onSubmit(result.validatedData!);
        return true;
      } catch (error) {
        console.error('Description form submission error:', error);
        return false;
      }
    },
    [validateDescription]
  );

  return {
    getDescriptionRules,
    validateDescription,
    handleDescriptionSubmit
  };
}

/**
 * Hook for Book Status Validation
 */
export function useBookStatusValidation() {
  /**
   * Get validation rules for status fields
   */
  const getStatusRules = useCallback((fieldName: 'available' | 'loaned' | 'disabled' | 'renovated') => {
    return createValidationRules(UpdateBookStatusSchema, fieldName);
  }, []);

  /**
   * Validate status form data
   */
  const validateStatus = useCallback((values: {
    available: number;
    loaned: number;
    disabled: number;
    renovated: number;
  }) => {
    return validateFormData(UpdateBookStatusSchema, values);
  }, []);

  /**
   * Validate status total matches expected total
   */
  const validateStatusTotal = useCallback((status: {
    available: number;
    loaned: number;
    disabled: number;
    renovated: number;
  }, expectedTotal: number) => {
    return validateBookStatusTotal(status, expectedTotal);
  }, []);

  /**
   * Handle status form submission with validation
   */
  const handleStatusSubmit = useCallback(
    async (
      form: any,
      values: {
        available: number;
        loaned: number;
        disabled: number;
        renovated: number;
      },
      onSubmit: (validatedData: {
        available: number;
        loaned: number;
        disabled: number;
        renovated: number;
      }) => void | Promise<void>,
      onError?: (errors: Record<string, string>) => void
    ) => {
      const result = validateStatus(values);
      
      if (!result.isValid) {
        if (result.errors) {
          // Set form errors
          const transformedErrors = Object.entries(result.errors).reduce(
            (acc, [field, message]) => {
              acc[field] = { errors: [message] };
              return acc;
            },
            {} as Record<string, { errors: string[] }>
          );
          
          form.setFields(transformedErrors);
          
          if (onError) {
            onError(result.errors);
          }
        }
        return false;
      }
      
      try {
        await onSubmit(result.validatedData!);
        return true;
      } catch (error) {
        console.error('Status form submission error:', error);
        return false;
      }
    },
    [validateStatus]
  );

  return {
    getStatusRules,
    validateStatus,
    validateStatusTotal,
    handleStatusSubmit
  };
}

/**
 * Combined hook for all edit book validation
 */
export function useEditBookValidation() {
  const descriptionValidation = useBookDescriptionValidation();
  const statusValidation = useBookStatusValidation();

  return {
    description: descriptionValidation,
    status: statusValidation
  };
}
