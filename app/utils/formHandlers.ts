// Form handling utility functions

import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { RESOURCES } from '../constants';

// Registration form handler
export const createRegistrationHandler = (
  router: ReturnType<typeof useRouter>,
  mutation: any
) => {
  return {
    onSuccess: () => {
      message.success("Registration successful! Redirecting to login...");
      router.push("/login");
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Registration failed. Please try again.';
      message.error(`Registration error: ${errorMessage}`);
    }
  };
};

// Login form handler
export const createLoginHandler = (
  setStatus: (status: { type: "success" | "error" | null; message: string }) => void
) => {
  return {
    onSuccess: async (data: any) => {
      setStatus({
        type: "success",
        message: '✅ Login successful! Redirecting to menu...'
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    },
    onError: (error: any) => {
      const errorMessage = error?.message || '❌ Login failed. Please check your credentials.';
      setStatus({
        type: "error",
        message: errorMessage
      });
    }
  };
};

// Generic form submission handler
export const createFormSubmissionHandler = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
  successMessage?: string,
  errorMessage?: string
) => {
  return {
    onSuccess: (data: any) => {
      if (successMessage) {
        message.success(successMessage);
      }
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {
      const errorMsg = error?.message || errorMessage || 'An error occurred. Please try again.';
      message.error(errorMsg);
      if (onError) {
        onError(error);
      }
    }
  };
};

// Form reset handler
export const createFormResetHandler = (form: any) => {
  return () => {
    form.resetFields();
  };
};

// Form validation handler
export const createFormValidationHandler = (form: any) => {
  return async () => {
    try {
      await form.validateFields();
      return true;
    } catch (error) {
      return false;
    }
  };
};

// Form data transformation
export const transformFormData = (data: any, transformations: Record<string, (value: any) => any>) => {
  const transformedData = { ...data };
  
  Object.keys(transformations).forEach(key => {
    if (transformedData[key] !== undefined) {
      transformedData[key] = transformations[key](transformedData[key]);
    }
  });
  
  return transformedData;
};

// Common form data transformations
export const commonTransformations = {
  trim: (value: string) => value?.trim(),
  toLowerCase: (value: string) => value?.toLowerCase(),
  toUpperCase: (value: string) => value?.toUpperCase(),
  removeSpaces: (value: string) => value?.replace(/\s/g, ''),
  formatPhone: (value: string) => value?.replace(/\D/g, ''),
  formatCurrency: (value: number) => Number(value).toFixed(2),
  parseNumber: (value: string) => parseFloat(value),
  parseInteger: (value: string) => parseInt(value, 10),
  formatDate: (value: string) => new Date(value).toISOString(),
};

// Form field dependencies
export const createFieldDependencies = (dependencies: Record<string, string[]>) => {
  return dependencies;
};

// Common field dependencies
export const commonDependencies = {
  confirmPassword: ['password'],
  confirmEmail: ['email'],
  billingAddress: ['useBillingAddress'],
  shippingAddress: ['useShippingAddress'],
};

// Form submission with loading state
export const createSubmissionWithLoading = (
  submitFn: () => Promise<any>,
  setLoading: (loading: boolean) => void
) => {
  return async () => {
    setLoading(true);
    try {
      const result = await submitFn();
      return result;
    } finally {
      setLoading(false);
    }
  };
};

// Form validation rules factory
export const createValidationRules = (rules: Record<string, any[]>) => {
  return rules;
};

// Common validation rules
export const commonValidationRules = {
  email: [
    { required: true, message: 'Please enter your email' },
    { type: 'email', message: 'Please enter a valid email' },
  ],
  password: [
    { required: true, message: 'Please enter your password' },
    { min: 6, message: 'Password must be at least 6 characters' },
  ],
  name: [
    { required: true, message: 'Please enter your name' },
    { min: 2, message: 'Name must be at least 2 characters' },
  ],
  phone: [
    { required: true, message: 'Please enter your phone number' },
    { pattern: /^[0-9+\-\s()]+$/, message: 'Please enter a valid phone number' },
  ],
  required: [
    { required: true, message: 'This field is required' },
  ],
};
