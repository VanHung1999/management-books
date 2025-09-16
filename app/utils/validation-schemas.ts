// Zod validation schemas for Management Books System

import { z } from 'zod';

// Common validation patterns
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(255, 'Email must be less than 255 characters')
  .pipe(z.email());

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d).+$/,
    'Password must contain both letters and numbers'
  );

const strongPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(
    /^[a-zA-Z\s'-]+$/,
    'Name can only contain letters, spaces, apostrophes, and hyphens'
  );

const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number must be less than 15 digits')
  .regex(
    /^[0-9+\-\s()]+$/,
    'Please enter a valid phone number'
  );

const otpSchema = z
  .string()
  .min(6, 'OTP must be 6 digits')
  .max(6, 'OTP must be 6 digits')
  .regex(/^\d{6}$/, 'OTP must contain only numbers');

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  name: nameSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  email: emailSchema,
  otp: otpSchema,
  newPassword: strongPasswordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: strongPasswordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// User management schemas
export const userCreateSchema = z.object({
  email: emailSchema,
  password: strongPasswordSchema,
  name: nameSchema,
  phone: phoneSchema.optional(),
  role: z.enum(['admin', 'manager', 'staff', 'customer'], {
    message: 'Please select a valid role',
  }),
});

export const userUpdateSchema = z.object({
  name: nameSchema.optional(),
  phone: phoneSchema.optional(),
  role: z.enum(['admin', 'manager', 'staff', 'customer']).optional(),
  email: emailSchema.optional(),
});

export const userProfileSchema = z.object({
  name: nameSchema,
  phone: phoneSchema.optional(),
  email: emailSchema,
});

// Book management schemas
export const bookCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(100, 'Author name must be less than 100 characters'),
  isbn: z
    .string()
    .min(1, 'ISBN is required')
    .regex(
      /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
      'Please enter a valid ISBN'
    ),
  publisher: z
    .string()
    .min(1, 'Publisher is required')
    .max(100, 'Publisher name must be less than 100 characters'),
  publicationYear: z
    .number()
    .min(1800, 'Publication year must be after 1800')
    .max(new Date().getFullYear(), 'Publication year cannot be in the future'),
  price: z
    .number()
    .min(0, 'Price must be positive')
    .max(999999.99, 'Price must be less than 999,999.99'),
  stock: z
    .number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),
  category: z
    .string()
    .min(1, 'Category is required')
    .max(50, 'Category must be less than 50 characters'),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
});

export const bookUpdateSchema = bookCreateSchema.partial();

export const bookSearchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.string().optional(),
  author: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
});

// Settings schemas
export const settingsGeneralSchema = z.object({
  siteName: z
    .string()
    .min(1, 'Site name is required')
    .max(100, 'Site name must be less than 100 characters'),
  siteDescription: z
    .string()
    .max(500, 'Site description must be less than 500 characters')
    .optional(),
  contactEmail: emailSchema,
  contactPhone: phoneSchema.optional(),
  address: z
    .string()
    .max(255, 'Address must be less than 255 characters')
    .optional(),
});

export const settingsNotificationSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  marketingEmails: z.boolean(),
});

// File upload schemas
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type),
      'File must be an image (JPEG, PNG, GIF, or WebP)'
    ),
});

// Pagination schema
export const paginationSchema = z.object({
  page: z
    .number()
    .int('Page must be a whole number')
    .min(1, 'Page must be at least 1'),
  limit: z
    .number()
    .int('Limit must be a whole number')
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit must be less than 100'),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Generic validation function
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
} => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
};

// Transform Zod errors to Ant Design format
export const transformZodErrors = (errors: z.ZodError): Record<string, string[]> => {
  const transformedErrors: Record<string, string[]> = {};
  
  errors.issues.forEach((error) => {
    const path = error.path.join('.');
    if (!transformedErrors[path]) {
      transformedErrors[path] = [];
    }
    transformedErrors[path].push(error.message);
  });
  
  return transformedErrors;
};

// Export all schemas for easy access
export const schemas = {
  // Authentication
  login: loginSchema,
  register: registerSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
  changePassword: changePasswordSchema,
  
  // User management
  userCreate: userCreateSchema,
  userUpdate: userUpdateSchema,
  userProfile: userProfileSchema,
  
  // Book management
  bookCreate: bookCreateSchema,
  bookUpdate: bookUpdateSchema,
  bookSearch: bookSearchSchema,
  
  // Settings
  settingsGeneral: settingsGeneralSchema,
  settingsNotification: settingsNotificationSchema,
  
  // File upload
  fileUpload: fileUploadSchema,
  
  // Pagination
  pagination: paginationSchema,
} as const;

// Type exports for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type UserCreateFormData = z.infer<typeof userCreateSchema>;
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
export type UserProfileFormData = z.infer<typeof userProfileSchema>;
export type BookCreateFormData = z.infer<typeof bookCreateSchema>;
export type BookUpdateFormData = z.infer<typeof bookUpdateSchema>;
export type BookSearchFormData = z.infer<typeof bookSearchSchema>;
export type SettingsGeneralFormData = z.infer<typeof settingsGeneralSchema>;
export type SettingsNotificationFormData = z.infer<typeof settingsNotificationSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;
export type PaginationFormData = z.infer<typeof paginationSchema>;
