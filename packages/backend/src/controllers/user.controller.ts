// import { Request } from 'express';
// import passport from 'passport';
// import UserService from '../services/user.service';
// import { UserDTO } from '../dto/user.dto';

// export class UserController {
//   constructor(private userService: UserService) {}

//   async signUp(req: Request<UserDTO>) {
//     passport.authenticate('local-signup', {
//       successRedirect: '/todos',
//       failureRedirect: '/signup'
//     })(req, () => {
//       // req.signUp() will be called if authentication successful,
//       // and authenticated user object will be available on req.user property
//       const { user } = req;
//       return user;
//     });
//   }

//   async logIn(req: Request<UserDTO>) {
//     passport.authenticate('local-login', {
//       successRedirect: '/todos',
//       failureRedirect: '/login'
//     })(req, () => {
//       // req.logIn() will be called if authentication was successful,
//       // and authenticated user object will be available on the req.user property
//       const { user } = req;
//       return user;
//     });
//   }

//   async logOut() {
//     const message = await this.userService.logout();
//     return message;
//   }
// }

// const userController = new UserController(new UserService());
// export default userController;

import { Request } from 'express';
import UserService from '../services/user.service';
import { UserDTO } from '../dto/user.dto';

export class UserController {
  constructor(private userService: UserService) {}

  async signUp(req: Request<UserDTO>) {
    const user = await this.userService.signup(req.body.email, req.body.password);
    return user;
  }

  async logIn(req: Request<UserDTO>) {
    const token = await this.userService.login(req.body.email, req.body.password);
    return token;
  }

  async logOut() {
    const message = await this.userService.logout();
    return message;
  }
}

const userController = new UserController(new UserService());
export default userController;
