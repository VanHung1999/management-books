// Services index - Export all services

export { AuthService, createAuthService } from './authService';
export { UserService, createUserService } from './userService';

// Re-export types
export type { 
  User, 
  AuthResult, 
  OTPResult, 
  PasswordResetResult 
} from './authService';

export type { 
  User as UserType, 
  UserCreateData, 
  UserUpdateData, 
  ServiceResult 
} from './userService';

// Default exports
export { default as AuthServiceDefault } from './authService';
export { default as UserServiceDefault } from './userService';
