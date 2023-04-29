import { Router } from 'express';
import userController from '../../controllers/user.controller';
import { User } from '../../entities/User.entity';
import { tryCatch } from '../../middlewares/error.middleware';
import validateEntity from '../../middlewares/validateBody.middleware';
import { verifyToken } from '../../middlewares/auth.middleware';

const userRouter: Router = Router();

// use middleware functions to handle validation, authentication, error handling,
// and other tasks that need to perform before or after request handler function

// @route   POST api/user/register
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public

// register new user
userRouter.post(
  '/register',
  validateEntity(User),
  tryCatch(userController.signUp.bind(userController))
);

// login as existing user
userRouter.post(
  '/login',
  validateEntity(User),
  tryCatch(userController.logIn.bind(userController))
);

// logout as authenticated user
userRouter.post('/logout', verifyToken, tryCatch(userController.logOut.bind(userController)));

export default userRouter;
