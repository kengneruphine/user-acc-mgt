import { Schema, model } from 'mongoose';
import handleCastError from '../plugins/handleCastError';
import { userSchema} from './user'

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
  user:userSchema
},{timestamps:true});

userAccountSchema.plugin(handleCastError);

const UserAccount = model('UserAccount', userAccountSchema);
export default UserAccount;

