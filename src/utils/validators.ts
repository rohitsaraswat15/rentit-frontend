// Email Validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

// Phone Number Validation (must be exactly 10 digits)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

// Password Strength Validation
// At least 8 characters, with 1 number, 1 uppercase, 1 lowercase, and 1 special character
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Confirm Password Validation
export const isPasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

// OTP Validation (6-digit numeric only)
export const isValidOtp = (otp: string): string | null => {
  if (!otp || otp.trim().length === 0) {
    return 'Please enter OTP.';
  }

  if (!/^\d{6}$/.test(otp)) {
    return 'OTP must be 6 digits.';
  }

  return null;
};