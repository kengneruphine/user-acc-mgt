import { Schema, model, mongoose } from 'mongoose';
import handleCastError from '../plugins/handleCastError';

const userAccountSchema = Schema({
  identificationNumber: {
    type: String,
    required: true,
  },
  idImage: {
    type: String,
    required: true,
  },
  accountStatus:{
    type:String,
    default: 'unverified',
    enum:['unverified','pending verification','verified']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},{timestamps:true});

userAccountSchema.plugin(handleCastError);

const UserAccount = model('UserAccount', userAccountSchema);
export default UserAccount;

