/**
 * Exception classes for Mudrex SDK
 */

export class MudrexException extends Error {
  public statusCode: number;
  public errorCode?: string;

  constructor(message: string, statusCode: number = 500, errorCode?: string) {
    super(message);
    this.name = 'MudrexException';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class MudrexAuthenticationException extends MudrexException {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'MudrexAuthenticationException';
  }
}

export class MudrexRateLimitException extends MudrexException {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_ERROR');
    this.name = 'MudrexRateLimitException';
  }
}

export class MudrexValidationException extends MudrexException {
  constructor(message: string = 'Validation failed') {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'MudrexValidationException';
  }
}

export class MudrexNotFoundException extends MudrexException {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND_ERROR');
    this.name = 'MudrexNotFoundException';
  }
}

export class MudrexConflictException extends MudrexException {
  constructor(message: string = 'Conflict occurred') {
    super(message, 409, 'CONFLICT_ERROR');
    this.name = 'MudrexConflictException';
  }
}

export class MudrexServerException extends MudrexException {
  constructor(message: string = 'Server error') {
    super(message, 500, 'SERVER_ERROR');
    this.name = 'MudrexServerException';
  }
}

export class MudrexInsufficientBalanceException extends MudrexException {
  constructor(message: string = 'Insufficient balance') {
    super(message, 400, 'INSUFFICIENT_BALANCE');
    this.name = 'MudrexInsufficientBalanceException';
  }
}
