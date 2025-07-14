import { Schema, model, mongoose } from 'mongoose';
import handleCastError from '../plugins/handleCastError.js';

const PasswordResetSchema = new Schema({
    userId: String,
    resetToken:String,
    createdAt: Date,
    expiresAt: Date,
});

PasswordResetSchema.plugin(handleCastError);

const PasswordReset = model('PasswordReset', PasswordResetSchema);
export default PasswordReset;