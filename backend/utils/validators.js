// import validator from 'validator';

// /**
//  * Validates user registration data
//  * @param {Object} data - Registration data
//  * @returns {Object} Validation result with isValid boolean and errors object
//  */
// export const validateRegistration = (data) => {
//   const errors = {};
  
//   // Username validation
//   if (!data.username?.trim()) {
//     errors.username = 'Username is required';
//   } else {
//     if (data.username.length < 3) {
//       errors.username = 'Username must be at least 3 characters';
//     }
//     if (data.username.length > 30) {
//       errors.username = 'Username cannot exceed 30 characters';
//     }
//     if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
//       errors.username = 'Username can only contain letters, numbers, and underscores';
//     }
//   }

//   // Email validation
//   if (!data.email?.trim()) {
//     errors.email = 'Email is required';
//   } else if (!validator.isEmail(data.email)) {
//     errors.email = 'Invalid email format';
//   }

//   // Password validation
//   if (!data.password) {
//     errors.password = 'Password is required';
//   } else {
//     if (data.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters';
//     }
//     if (!/[A-Z]/.test(data.password)) {
//       errors.password = 'Password must contain at least one uppercase letter';
//     }
//     if (!/[a-z]/.test(data.password)) {
//       errors.password = 'Password must contain at least one lowercase letter';
//     }
//     if (!/[0-9]/.test(data.password)) {
//       errors.password = 'Password must contain at least one number';
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
//       errors.password = 'Password must contain at least one special character';
//     }
//   }

//   // Role-specific validation
//   if (data.role === 'provider') {
//     if (!data.companyName?.trim()) {
//       errors.companyName = 'Company name is required';
//     } else if (data.companyName.length > 100) {
//       errors.companyName = 'Company name cannot exceed 100 characters';
//     }

//     if (!data.companyAddress?.trim()) {
//       errors.companyAddress = 'Company address is required';
//     }

//     if (!data.companyLicense?.trim()) {
//       errors.companyLicense = 'Company license is required';
//     } else if (!/^[A-Z0-9]{8,20}$/.test(data.companyLicense)) {
//       errors.companyLicense = 'License must be 8-20 alphanumeric characters';
//     }
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// };

// /**
//  * Validates user login data
//  * @param {Object} data - Login data
//  * @returns {Object} Validation result with isValid boolean and errors object
//  */
// export const validateLogin = (data) => {
//   const errors = {};

//   if (!data.email?.trim()) {
//     errors.email = 'Email is required';
//   } else if (!validator.isEmail(data.email)) {
//     errors.email = 'Invalid email format';
//   }

//   if (!data.password) {
//     errors.password = 'Password is required';
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// };

// /**
//  * Validates password reset request
//  * @param {Object} data - Password reset data
//  * @returns {Object} Validation result
//  */
// export const validatePasswordReset = (data) => {
//   const errors = {};

//   if (!data.email?.trim()) {
//     errors.email = 'Email is required';
//   } else if (!validator.isEmail(data.email)) {
//     errors.email = 'Invalid email format';
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// };

// /**
//  * Validates new password
//  * @param {Object} data - New password data
//  * @returns {Object} Validation result
//  */
// export const validateNewPassword = (data) => {
//   const errors = {};

//   if (!data.password) {
//     errors.password = 'Password is required';
//   } else {
//     if (data.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters';
//     }
//     if (!/[A-Z]/.test(data.password)) {
//       errors.password = 'Password must contain at least one uppercase letter';
//     }
//     if (!/[0-9]/.test(data.password)) {
//       errors.password = 'Password must contain at least one number';
//     }
//   }

//   if (!data.confirmPassword) {
//     errors.confirmPassword = 'Please confirm your password';
//   } else if (data.password !== data.confirmPassword) {
//     errors.confirmPassword = 'Passwords do not match';
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// };

// /**
//  * Validates email verification token
//  * @param {Object} data - Token data
//  * @returns {Object} Validation result
//  */
// export const validateToken = (data) => {
//   const errors = {};

//   if (!data.token) {
//     errors.token = 'Token is required';
//   } else if (data.token.length !== 64) {
//     errors.token = 'Invalid token format';
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// };

// // Export all validators
// export default {
//   validateRegistration,
//   validateLogin,
//   validatePasswordReset,
//   validateNewPassword,
//   validateToken
// };

import validator from 'validator';

export const validateRegistration = (data) => {
  const errors = {};
  
  // Username validation
  if (!data.username?.trim()) {
    errors.username = 'Username is required';
  } else if (data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(data.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = 'Password must contain at least one number';
  }

  // Provider-specific validation
  if (data.role === 'provider') {
    if (!data.companyName?.trim()) {
      errors.companyName = 'Company name is required';
    }
    if (!data.companyAddress?.trim()) {
      errors.companyAddress = 'Company address is required';
    }
    if (!data.companyLicense?.trim()) {
      errors.companyLicense = 'Company license is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLogin = (data) => {
  const errors = {};

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};