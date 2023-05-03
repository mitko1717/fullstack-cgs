import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { UserDTO } from '../dto/user.dto';

export class UserController {
  constructor(private userService: UserService) {}

  async signUp(req: Request<UserDTO>) {
    await this.userService.signup(req.body.email, req.body.password);
    return this.userService.login(req.body.email);
  }

  async logIn(req: Request<UserDTO>) {
    return this.userService.login(req.body.email);
  }

  async logOut(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    await this.userService.logout(token);
    return res.status(200).json({ message: 'User logged out successfully' });
  }

  async changePassword(req: Request, res: Response) {
    const { newPassword } = req.body;
    const { email } = req.params;

    await this.userService.updatePassword(email, newPassword);
    return res.json({ message: 'Password updated successfully' });
  }

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await this.userService.getUserByEmail(email);
    return res.json(user);
  }
}

const userController = new UserController(new UserService());
export default userController;
