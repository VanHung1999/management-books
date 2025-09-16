// Custom hook for Zod validation with Ant Design forms

import { useCallback } from 'react';
import { Form } from 'antd';
import { ZodType, ZodError } from 'zod';
import { transformZodErrors } from './validation-schemas';

export const useZodValidation = <T>(schema: ZodType<T>) => {
  const [form] = Form.useForm();

  // Validate single field
  const validateField = useCallback(
    async (fieldName: string, value: any): Promise<string | undefined> => {
      try {
        // Validate the entire form with just this field
        const formData = { [fieldName]: value };
        await schema.parseAsync(formData);
        return undefined;
      } catch (error) {
        if (error instanceof ZodError) {
        const fieldError = error.issues.find(err => 
          err.path.length === 1 && err.path[0] === fieldName
        );
          return fieldError?.message;
        }
        return 'Validation error';
      }
    },
    [schema]
  );

  // Validate entire form
  const validateForm = useCallback(
    async (values: any): Promise<{ success: boolean; errors?: Record<string, string[]> }> => {
      try {
        await schema.parseAsync(values);
        return { success: true };
      } catch (error) {
        if (error instanceof ZodError) {
          const transformedErrors = transformZodErrors(error);
          return { success: false, errors: transformedErrors };
        }
        return { success: false, errors: { general: ['Validation error'] } };
      }
    },
    [schema]
  );

  // Set form errors from Zod validation
  const setFormErrors = useCallback(
    (errors: Record<string, string[]>) => {
      const fields = Object.keys(errors).map(fieldName => ({
        name: fieldName.split('.'),
        errors: errors[fieldName],
      }));
      form.setFields(fields);
    },
    [form]
  );

  // Clear form errors
  const clearFormErrors = useCallback(() => {
    form.setFields([]);
  }, [form]);

  // Validate and set errors
  const validateAndSetErrors = useCallback(
    async (values: any) => {
      const result = await validateForm(values);
      if (!result.success && result.errors) {
        setFormErrors(result.errors);
      } else {
        clearFormErrors();
      }
      return result;
    },
    [validateForm, setFormErrors, clearFormErrors]
  );

  // Custom validator for Ant Design Form.Item
  const createValidator = useCallback(
    (fieldName: string) => {
      return async (_: any, value: any) => {
        const error = await validateField(fieldName, value);
        if (error) {
          return Promise.reject(new Error(error));
        }
        return Promise.resolve();
      };
    },
    [validateField]
  );

  return {
    form,
    validateField,
    validateForm,
    setFormErrors,
    clearFormErrors,
    validateAndSetErrors,
    createValidator,
  };
};

// Hook for form submission with Zod validation
export const useZodFormSubmission = <T>(
  schema: ZodType<T>,
  onSubmit: (data: T) => void | Promise<void>
) => {
  const { form, validateAndSetErrors } = useZodValidation(schema);

  const handleSubmit = useCallback(
    async (values: any) => {
      const result = await validateAndSetErrors(values);
      if (result.success) {
        await onSubmit(values);
      }
    },
    [validateAndSetErrors, onSubmit]
  );

  return {
    form,
    handleSubmit,
  };
};

// Utility function to create Ant Design form rules from Zod schema
export const createFormRules = <T>(
  schema: ZodType<T>,
  fieldName: keyof T
): any[] => {
  const rules: any[] = [];

  // Email validation
  if (fieldName === 'email') {
    rules.push({
      required: true,
      type: 'email',
      message: 'Please enter a valid email address',
    });
  }

  // Password validation
  if (fieldName === 'password') {
    rules.push({
      required: true,
      min: 6,
      message: 'Password must be at least 6 characters',
    });
    rules.push({
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: 'Password must contain both letters and numbers',
    });
  }

  // Name validation
  if (fieldName === 'name') {
    rules.push({
      required: true,
      min: 2,
      message: 'Name must be at least 2 characters',
    });
    rules.push({
      max: 50,
      message: 'Name must be less than 50 characters',
    });
    rules.push({
      pattern: /^[a-zA-Z\s'-]+$/,
      message: 'Name can only contain letters, spaces, apostrophes, and hyphens',
    });
  }

  // Phone validation
  if (fieldName === 'phone') {
    rules.push({
      pattern: /^[0-9+\-\s()]+$/,
      message: 'Please enter a valid phone number',
    });
  }

  // OTP validation
  if (fieldName === 'otp') {
    rules.push({
      required: true,
      pattern: /^\d{6}$/,
      message: 'OTP must be 6 digits',
    });
  }

  return rules;
};

// Export default
export default useZodValidation;
