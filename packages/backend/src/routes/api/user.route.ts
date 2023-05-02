import { Router } from 'express';
import userController from '../../controllers/user.controller';
import { User } from '../../entities/User.entity';
import { tryCatch } from '../../middlewares/error.middleware';
import validateEntity from '../../middlewares/validateBody.middleware';
import { authenticateUser, checkUserExists, verifyToken } from '../../middlewares/auth.middleware';

const userRouter: Router = Router();

// use middleware functions to handle validation, authentication, error handling,
// and other tasks that need to perform before or after request handler function

// @route   POST api/user/register
// @desc    Register user given their email and password, returns the token upon successful registration

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
userRouter.post('/logout', verifyToken, tryCatch(userController.logOut.bind(userController)));

// update password
userRouter.put(
  '/changePassword/:email',
  verifyToken,
  checkUserExists,
  validateEntity(User),
  tryCatch(userController.changePassword.bind(userController))
);

// get user by ID
userRouter.get('/getUser/:email', userController.getUserByEmail.bind(userController));

export default userRouter;
