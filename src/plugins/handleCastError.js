//Adding mongoose plugin that handles cast errors to all models
import mongoose from 'mongoose';
import customizeErrorObj from '../AppError.js';


const findQueries = ['find', 'findOne', 'findById', 'findByIdAndUpdate', 'findByIdAndDelete', 'findByIdAndRemove', 'create'];
const handleCastError = (schema) => {
  schema.post(findQueries, (error, doc, next) => {
    if (error) {
      if (error instanceof mongoose.CastError) {
        const errorPath = error.path === '_id' ? 'id' : error.path;
        const message = `Invalid ${errorPath}: ${error.value}`;
        return next(customizeErrorObj(message, error.statusCode));
      }
      return next(error);
    }
    return next();
  });
};

export default handleCastError;
