import { ChangePassword, RegisterUser, LoginUser } from '../modules/common/types/User.types';
import HttpService from './http.service';

class UserService extends HttpService {
  registerUser(user: RegisterUser) {
    return this.post({
      url: 'register',
      data: user
    });
  }

  loginUser(user: LoginUser) {
    return this.post({
      url: 'login',
      data: user
    });
  }

  logoutUser() {
    return this.post({
      url: 'logout'
    });
  }

  changePassword({ email, password }: ChangePassword) {
    return this.put({
      url: `changePassword/${email}`,
      data: {
        email,
        password
      }
    });
  }

  getUserByEmail(email: string) {
    return this.get({
      url: `getUser/${email}`
    });
  }
}

const userService = new UserService();
export default userService;
