/**
 * Zod Validation Schemas for Edit Book Page
 * Validation schemas for all forms in the edit book page
 */

import { z } from 'zod';

// ===== EDIT BOOK FORM SCHEMAS =====

/**
 * Update Book Description Schema
 * For the description form
 */
export const UpdateBookDescriptionSchema = z.object({
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim()
    .optional()
    .or(z.literal(''))
});

/**
 * Update Book Status Schema
 * For the status management form
 */
export const UpdateBookStatusSchema = z.object({
  available: z.number()
    .int('Available copies must be an integer')
    .min(0, 'Available copies cannot be negative'),
  loaned: z.number()
    .int('Loaned copies must be an integer')
    .min(0, 'Loaned copies cannot be negative'),
  disabled: z.number()
    .int('Disabled copies must be an integer')
    .min(0, 'Disabled copies cannot be negative'),
  renovated: z.number()
    .int('Renovated copies must be an integer')
    .min(0, 'Renovated copies cannot be negative')
}).refine(
  (data) => {
    const total = data.available + data.loaned + data.disabled + data.renovated;
    return total >= 0;
  },
  {
    message: 'Total copies cannot be negative',
    path: ['total']
  }
);

// ===== TYPE EXPORTS =====

export type UpdateBookDescriptionInput = z.infer<typeof UpdateBookDescriptionSchema>;
export type UpdateBookStatusInput = z.infer<typeof UpdateBookStatusSchema>;

// ===== VALIDATION HELPERS =====

/**
 * Validate book status total matches expected total
 */
export function validateBookStatusTotal(
  status: UpdateBookStatusInput, 
  expectedTotal: number
): { isValid: boolean; message?: string } {
  const total = status.available + status.loaned + status.disabled + status.renovated;
  
  if (total !== expectedTotal) {
    return {
      isValid: false,
      message: `Status total (${total}) must equal expected total (${expectedTotal})`
    };
  }
  
  return { isValid: true };
}

/**
 * Create validation rules for Ant Design Form.Item
 */
export function createValidationRules(schema: z.ZodSchema<any>, fieldName: string) {
  return [
    {
      validator: async (_: any, value: any) => {
        try {
          const fieldSchema = (schema as any).pick({ [fieldName]: true });
          fieldSchema.parse({ [fieldName]: value });
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldError = error.issues.find(
              (err: any) => err.path.join('.') === fieldName
            );
            throw new Error(fieldError?.message || 'Invalid value');
          }
          throw new Error('Invalid value');
        }
      }
    }
  ];
}

/**
 * Validate form data using Zod schema
 */
export function validateFormData<T>(schema: z.ZodSchema<T>, data: unknown): {
  isValid: boolean;
  errors?: Record<string, string>;
  validatedData?: T;
} {
  try {
    const validatedData = schema.parse(data);
    return { isValid: true, validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Record<string, string> = {};
      
      error.issues.forEach((err) => {
        const path = err.path.join('.');
        formattedErrors[path] = err.message;
      });
      
      return { isValid: false, errors: formattedErrors };
    }
    
    return { 
      isValid: false, 
      errors: { general: 'An unexpected validation error occurred' } 
    };
  }
}
