import { Router, Request, Response } from 'express';
// import userController from '../../controllers/user.controller';
import validateEntity from '../../middlewares/validateBody.middleware';
import { User } from '../../entities/User.entity';

const userRouter: Router = Router();
const validateUser = validateEntity(User);

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
userRouter.post('/register', validateUser, async (_: Request, res: Response) => {
  // userController.signUp()
  res.send('Add registration logic there');
});

userRouter.post('/login', validateUser, async (_: Request, res: Response) => {
  // userController.logIn(_, _);
  res.send('login logic there');
});

userRouter.post('/logout', validateUser, async (_: Request, res: Response) => {
  // userController.logOut()
  res.send('logout logic there');
});

export default userRouter;
