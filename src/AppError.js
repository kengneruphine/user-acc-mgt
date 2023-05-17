class AppError extends Error {
    constructor(message, statusCode = 500) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const customizeErrorObj = (message, statusCode) => new AppError(message, statusCode);
  
  export default customizeErrorObj;
  