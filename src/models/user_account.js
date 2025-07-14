import { Schema, model} from 'mongoose';
import handleCastError from '../plugins/handleCastError.js';

const userAccountSchema = Schema({
  identificationNumber: {
    type: String,
  },
  idImage: {
    type: String,
  },
  accountStatus:{
    type:String,
    default: 'unverified',
    enum:['unverified','pending verification','verified']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},{timestamps:true});

userAccountSchema.plugin(handleCastError);

const UserAccount = model('UserAccount', userAccountSchema);
export default UserAccount;

