export const successResponse = (res, statusCode, status, data = {}) => {
    res.status(statusCode),
    res.json({
      success: status,
      data,
    });
  };
  
  export const errorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode),
    res.json({
      success: false,
      message,
    });
  };
  
  export const catchAsyncError = (fn) => async (req, res, next) => {
    const response = await fn(req, res, next).catch(next);
    return response;
  };
  