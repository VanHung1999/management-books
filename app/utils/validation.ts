// Validation utility functions for forms

import { RESOURCES } from '../constants';

// Email validation
export const validateEmailExists = async (getDataProvider: any, value: string) => {
  if (!value) return Promise.resolve();
  
  try {
    const dp = getDataProvider();
    const { data } = await dp.getOne({
      resource: RESOURCES.USERS.LIST,
      id: value,
    });
    
    if (data) {
      return Promise.reject("Email has already been used");
    }
    
    return Promise.resolve();
  } catch {
    return Promise.resolve();
  }
};

// Password validation
export const validatePassword = (value: string) => {
  if (!value) return Promise.resolve();
  
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  
  if (!hasLetter || !hasNumber) {
    return Promise.reject("Password must contain both letters and numbers (letters/numbers only)");
  }
  
  return Promise.resolve();
};

// Confirm password validation
export const validateConfirmPassword = (getFieldValue: any) => {
  return (_: any, value: string) => {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject("The two passwords do not match");
  };
};

// Phone number validation
export const validatePhoneNumber = (value: string) => {
  if (!value) return Promise.resolve();
  
  const phoneRegex = /^[0-9+\-\s()]+$/;
  if (!phoneRegex.test(value)) {
    return Promise.reject("Please enter a valid phone number");
  }
  
  return Promise.resolve();
};

// ISBN validation
export const validateISBN = (value: string) => {
  if (!value) return Promise.resolve();
  
  const isbnRegex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
  if (!isbnRegex.test(value)) {
    return Promise.reject("Please enter a valid ISBN");
  }
  
  return Promise.resolve();
};

// URL validation
export const validateURL = (value: string) => {
  if (!value) return Promise.resolve();
  
  try {
    new URL(value);
    return Promise.resolve();
  } catch {
    return Promise.reject("Please enter a valid URL");
  }
};

// File size validation
export const validateFileSize = (file: File, maxSize: number) => {
  if (file.size > maxSize) {
    return Promise.reject(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
  }
  return Promise.resolve();
};

// File type validation
export const validateFileType = (file: File, allowedTypes: string[]) => {
  if (!allowedTypes.includes(file.type)) {
    return Promise.reject(`File type must be one of: ${allowedTypes.join(', ')}`);
  }
  return Promise.resolve();
};

// Date validation
export const validateDate = (value: string, minDate?: string, maxDate?: string) => {
  if (!value) return Promise.resolve();
  
  const date = new Date(value);
  const today = new Date();
  
  if (isNaN(date.getTime())) {
    return Promise.reject("Please enter a valid date");
  }
  
  if (minDate && date < new Date(minDate)) {
    return Promise.reject(`Date must be after ${minDate}`);
  }
  
  if (maxDate && date > new Date(maxDate)) {
    return Promise.reject(`Date must be before ${maxDate}`);
  }
  
  return Promise.resolve();
};

// Number validation
export const validateNumber = (value: string, min?: number, max?: number) => {
  if (!value) return Promise.resolve();
  
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return Promise.reject("Please enter a valid number");
  }
  
  if (min !== undefined && num < min) {
    return Promise.reject(`Value must be at least ${min}`);
  }
  
  if (max !== undefined && num > max) {
    return Promise.reject(`Value must be at most ${max}`);
  }
  
  return Promise.resolve();
};

// Required field validation
export const validateRequired = (value: any, message: string = "This field is required") => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return Promise.reject(message);
  }
  return Promise.resolve();
};

// Custom validation factory
export const createValidator = (validatorFn: (value: any) => boolean | Promise<boolean>, errorMessage: string) => {
  return (value: any) => {
    if (!value) return Promise.resolve();
    
    const result = validatorFn(value);
    
    if (result instanceof Promise) {
      return result.then(isValid => 
        isValid ? Promise.resolve() : Promise.reject(errorMessage)
      );
    }
    
    return result ? Promise.resolve() : Promise.reject(errorMessage);
  };
};
