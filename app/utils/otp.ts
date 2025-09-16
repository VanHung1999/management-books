// OTP (One-Time Password) utility functions

/**
 * Generate a random OTP code with specified length
 * @param length - Length of the OTP code (default: 6)
 * @returns Generated OTP code as string
 */
export const generateOTP = (length: number = 6): string => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

/**
 * Generate a secure OTP code with custom character set
 * @param length - Length of the OTP code (default: 6)
 * @param charset - Character set to use (default: numbers only)
 * @returns Generated OTP code as string
 */
export const generateSecureOTP = (
  length: number = 6, 
  charset: string = "0123456789"
): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return otp;
};

/**
 * Generate an alphanumeric OTP code
 * @param length - Length of the OTP code (default: 6)
 * @returns Generated alphanumeric OTP code as string
 */
export const generateAlphanumericOTP = (length: number = 6): string => {
  const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return generateSecureOTP(length, charset);
};

/**
 * Validate OTP format
 * @param otp - OTP code to validate
 * @param length - Expected length (default: 6)
 * @returns True if OTP format is valid
 */
export const validateOTPFormat = (otp: string, length: number = 6): boolean => {
  const otpRegex = new RegExp(`^\\d{${length}}$`);
  return otpRegex.test(otp);
};

/**
 * Generate OTP with expiration time
 * @param length - Length of the OTP code (default: 6)
 * @param expirationMinutes - Expiration time in minutes (default: 5)
 * @returns Object containing OTP code and expiration timestamp
 */
export const generateOTPWithExpiration = (
  length: number = 6, 
  expirationMinutes: number = 5
): { code: string; expiresAt: number } => {
  const code = generateOTP(length);
  const expiresAt = Date.now() + (expirationMinutes * 60 * 1000);
  return { code, expiresAt };
};

/**
 * Check if OTP is expired
 * @param expiresAt - Expiration timestamp
 * @returns True if OTP is expired
 */
export const isOTPExpired = (expiresAt: number): boolean => {
  return Date.now() > expiresAt;
};
