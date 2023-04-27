// import { Request } from 'express';
import UserService from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async signUp() {
    // req: Request
    await this.userService.signup();
  }

  async logIn() {
    await this.userService.login();
  }

  async logOut() {
    await this.userService.logout();
  }
}

const userController = new UserController(new UserService());
export default userController;
