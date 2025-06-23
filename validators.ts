import { SignUpData, SignInData, ValidationErrors } from './types';

export function validateSignUp(data: SignUpData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.fullName.trim()) errors.fullName = 'Type Your Full Name.';
  if (!data.email.match(/^\S+@\S+\.\S+$/)) errors.email = 'Bad Email - Type it correct.';
  if (data.password.length < 8 ) errors.password = 'Password must be at least 8 characters.';
  if (data.password.length >= 32 ) errors.password = 'Password cannot be more over than 32 characters.';
  if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

export function validateSignIn(data: SignInData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.email.match(/^\S+@\S+\.\S+$/)) errors.email = 'Invalid email format.';
  if (!data.password) errors.password = 'Password is required.';
  return errors;
}
