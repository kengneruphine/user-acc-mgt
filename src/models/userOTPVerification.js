import { Schema, model, mongoose } from 'mongoose';
import handleCastError from '../plugins/handleCastError';

const UserOTPVerificationSchema = new Schema({
    userId: String,
    verificationCode:String,
    createdAt: Date,
    expiresAt: Date,
});

UserOTPVerificationSchema.plugin(handleCastError);

const UserOTPVerification = model('UserOTPVerification', UserOTPVerificationSchema);
export default UserOTPVerification;