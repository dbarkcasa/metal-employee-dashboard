// SQL/XSS Detection Helper
function isMalicious(input) {
  const pattern = /('|--|;|<script|<\/script>|<|>|=|\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|WHERE|FROM|LIKE|OR|AND|1=1|exec|xp_)\b)/i;
  return typeof input === 'string' && pattern.test(input);
}

// Input Sanitizer
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  return input
    .replace(/<script.*?>.*?<\/script>/gi, '') // Remove full <script> tags
    .replace(/[<>'"=;]/g, '') // Strip out dangerous characters
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|WHERE|FROM|LIKE|OR|AND|1=1|exec|xp_)\b/gi, ''); // Remove SQL keywords
}

// Validation and Sanitization Logic
module.exports = function validate(obj, isUpdate = false, sanitize = true) {
  const result = { valid: true, sanitized: {}, message: null };

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      if (isMalicious(value)) {
        if (!sanitize) {
          result.valid = false;
          result.message = `Malicious input detected in field: ${key}`;
          return result;
        }
        result.sanitized[key] = sanitizeInput(value);
      } else {
        result.sanitized[key] = value;
      }
    } else {
      result.sanitized[key] = value;
    }
  }

  // INSERT-only validations (required fields)
  if (!isUpdate) {
    const name = result.sanitized.name;

    if (!name || typeof name !== 'string') {
      return { valid: false, message: 'Name required.' };
    }

    const hasHoursOrQuantity =
      typeof result.sanitized.hours === 'number' || typeof result.sanitized.quantity === 'number';
    if (!hasHoursOrQuantity) {
      return { valid: false, message: 'Either hours or quantity is required.' };
    }

    const hasRateOrPrice =
      typeof result.sanitized.rate === 'number' || typeof result.sanitized.price === 'number';
    if (!hasRateOrPrice) {
      return { valid: false, message: 'Either rate or price is required.' };
    }
  }

  return result;
};
