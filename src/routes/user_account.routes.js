import {Router} from 'express';
import {
    uploadDocuments,
    getAllUserAccount,
    getUserAccount,
    updateUserAccountStatus,
    deleteUserAccount
  } from '@src/controllers/userAccount.controller';
  import multer from 'multer';

  const userAccountRouter = Router();
  const upload = multer().single('image');
  
  userAccountRouter.get('/', getAllUserAccount);
  userAccountRouter.get('/:userAccountId', getUserAccount);
  userAccountRouter.put('/:userAccountId',upload, uploadDocuments);
  userAccountRouter.patch('/:userAccountId', updateUserAccountStatus);
  userAccountRouter.delete('/:userAccountId', deleteUserAccount);

  export default userAccountRouter;
