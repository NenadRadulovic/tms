export const ERROR_NAMES = {
  validationError: 'Validation Error',
  badRequestError: 'Bad Request Error',
  authorizationError: 'Authorization Error',
  authenticationError: 'Authentication Error',
  internalServerError: 'Internal Server Error',
  notFoundError: 'Not Found Error',
};

export class RequestError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends RequestError {
  constructor(message: string) {
    super(message, 400);
    this.name = ERROR_NAMES.validationError;
  }
}
export class NotFoundError extends RequestError {
  constructor(message: string) {
    super(message, 404);
    this.name = ERROR_NAMES.notFoundError;
  }
}

export class internalServerError extends RequestError {
  constructor(message: string) {
    super(message, 500);
    this.name = ERROR_NAMES.internalServerError;
  }
}

export class AuthorizationError extends RequestError {
  constructor(message: string) {
    super(message, 403);
    this.name = ERROR_NAMES.authorizationError;
  }
}

export class AuthenticationError extends RequestError {
  constructor(message: string) {
    super(message, 401);
    this.name = ERROR_NAMES.authenticationError;
  }
}

export class BadRequestError extends RequestError {
  constructor(message: string) {
    super(message, 400);
    this.name = ERROR_NAMES.badRequestError;
  }
}
