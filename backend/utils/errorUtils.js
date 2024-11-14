const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Assuming all our custom errors are operational

        Error.captureStackTrace(this, this.constructor);
    }
}

// Custom error types (examples)
class BadRequestError extends AppError {
    constructor(message) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

// Additional error types as needed...

module.exports = {
    AppError,
    BadRequestError,
    NotFoundError,
    // ...other custom error types
};
