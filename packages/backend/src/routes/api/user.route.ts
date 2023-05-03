import { Router } from 'express';
import userController from '../../controllers/user.controller';
import { User } from '../../entities/User.entity';
import { tryCatch } from '../../middlewares/error.middleware';
import validateEntity from '../../middlewares/validateBody.middleware';
import {
  authenticateUser,
  checkUserExists,
  verifyToken,
  blacklistedToken
} from '../../middlewares/auth.middleware';

const userRouter: Router = Router();
// middleware functions to handle validation, authentication, error handling,
// and other tasks that need to perform before or after request handler function

// register new user
userRouter.post(
  '/register',
  checkUserExists,
  validateEntity(User),
  tryCatch(userController.signUp.bind(userController))
);

// login as existing user
userRouter.post(
  '/login',
  authenticateUser,
  validateEntity(User),
  tryCatch(userController.logIn.bind(userController))
);

// logout as authenticated user
userRouter.post(
  '/logout',
  verifyToken,
  blacklistedToken,
  tryCatch(userController.logOut.bind(userController))
);

// update password
userRouter.put(
  '/changePassword/:email',
  verifyToken,
  validateEntity(User),
  tryCatch(userController.changePassword.bind(userController))
);

userRouter.put(
  '/changePasswordByAdmin/:email',
  tryCatch(userController.changePassword.bind(userController))
);

// get user by email
userRouter.get('/getUser/:email', userController.getUserByEmail.bind(userController));

export default userRouter;
