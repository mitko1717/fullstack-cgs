import { Response, Request } from 'express';
import UserService from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async signUp(_: Request, res: Response) {
    await this.userService.signup();
    res.send('created new account');
  }

  async logIn(_: Request, res: Response) {
    await this.userService.login();
    res.send('successfully login');
  }

  async logOut(_: Request, res: Response) {
    await this.userService.logout();
    res.send('successfully logout');
  }
}

const userController = new UserController(new UserService());
export default userController;
