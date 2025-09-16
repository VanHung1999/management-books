// Authentication service for handling auth-related operations

import { DataProvider } from "@refinedev/core";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface OTPResult {
  success: boolean;
  otp?: string;
  error?: string;
}

export interface PasswordResetResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Authentication Service
 * Handles all authentication-related operations
 */
export class AuthService {
  private dataProvider: DataProvider;

  constructor(dataProvider: DataProvider) {
    this.dataProvider = dataProvider;
  }

  /**
   * Find user by email
   * @param email - User email
   * @returns Promise<AuthResult>
   */
  async findUserByEmail(email: string): Promise<AuthResult> {
    try {
      const result = await this.dataProvider.getOne({ 
        resource: "users", 
        id: email 
      });
      
      return {
        success: true,
        data: result.data as User
      };
    } catch (error) {
      return {
        success: false,
        error: "Email has not been registered"
      };
    }
  }

  /**
   * Generate and send OTP for password reset
   * @param email - User email
   * @param otpLength - OTP length (default: 6)
   * @returns Promise<OTPResult>
   */
  async generateOTPForPasswordReset(email: string, otpLength: number = 6): Promise<OTPResult> {
    try {
      // In a real application, you would:
      // 1. Generate OTP
      // 2. Store OTP in database with expiration
      // 3. Send OTP via email/SMS
      // 4. Return success without exposing OTP
      
      // For demo purposes, we'll generate and return OTP
      const otp = this.generateRandomOTP(otpLength);
      
      return {
        success: true,
        otp: otp
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to generate OTP"
      };
    }
  }

  /**
   * Verify OTP for password reset
   * @param providedOTP - OTP provided by user
   * @param expectedOTP - Expected OTP
   * @returns boolean
   */
  verifyOTP(providedOTP: string, expectedOTP: string): boolean {
    return providedOTP === expectedOTP;
  }

  /**
   * Reset user password
   * @param userId - User ID
   * @param newPassword - New password (should be hashed in real app)
   * @returns Promise<PasswordResetResult>
   */
  async resetPassword(userId: string, newPassword: string): Promise<PasswordResetResult> {
    try {
      // In a real application, you would:
      // 1. Hash the password with bcrypt
      // 2. Update user password in database
      // 3. Invalidate all existing sessions
      // 4. Send confirmation email
      
      await this.dataProvider.update({
        resource: "users",
        id: userId,
        variables: { password: newPassword }
      });

      return {
        success: true,
        message: "Password has been reset successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to reset password"
      };
    }
  }

  /**
   * Complete password reset flow
   * @param email - User email
   * @param otp - Provided OTP
   * @param expectedOTP - Expected OTP
   * @param newPassword - New password
   * @returns Promise<PasswordResetResult>
   */
  async completePasswordReset(
    email: string, 
    otp: string, 
    expectedOTP: string, 
    newPassword: string
  ): Promise<PasswordResetResult> {
    try {
      // Verify OTP
      if (!this.verifyOTP(otp, expectedOTP)) {
        return {
          success: false,
          error: "OTP is incorrect. Please try again."
        };
      }

      // Find user
      const userResult = await this.findUserByEmail(email);
      if (!userResult.success || !userResult.data) {
        return {
          success: false,
          error: "User not found"
        };
      }

      // Reset password
      const resetResult = await this.resetPassword(userResult.data.id, newPassword);
      if (!resetResult.success) {
        return resetResult;
      }

      return {
        success: true,
        message: "Password has been reset successfully. Please check your email for the new password."
      };
    } catch (error) {
      return {
        success: false,
        error: "An error occurred during password reset"
      };
    }
  }

  /**
   * Generate random OTP
   * @param length - OTP length
   * @returns string
   */
  private generateRandomOTP(length: number): string {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  }

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns boolean
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate OTP format
   * @param otp - OTP to validate
   * @param length - Expected length
   * @returns boolean
   */
  validateOTPFormat(otp: string, length: number = 6): boolean {
    const otpRegex = new RegExp(`^\\d{${length}}$`);
    return otpRegex.test(otp);
  }
}

/**
 * Factory function to create AuthService instance
 * @param dataProvider - DataProvider instance
 * @returns AuthService
 */
export const createAuthService = (dataProvider: DataProvider): AuthService => {
  return new AuthService(dataProvider);
};

/**
 * Default export for convenience
 */
export default AuthService;
