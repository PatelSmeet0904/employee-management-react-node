// Validate phone number format
exports.validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/; // Assume 10-digit phone numbers
  return phoneRegex.test(phone);
}

// Validate email format
exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}