export const successResponse = (res, statusCode, status, data = {}) => {
    res.status(statusCode).json({
      success: status,
      data,
    });
  };
  
  export const errorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
//   export const paginatedSuccessResponse = (
//     res,
//     req,
//     statusCode,
//     status,
//     data = {},
//     { ...others } = {},
//   ) => {
//     res.status(statusCode).json({
//       success: status,
//       data,
//       ...req.pagination,
//       ...others,
//     });
//   };
  
  export const catchAsyncError = (fn) => async (req, res, next) => {
    const response = await fn(req, res, next).catch(next);
    return response;
  };
  