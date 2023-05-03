import { ChangePassword, RegisterUser, LoginUser } from '../modules/common/types/User.types';
import HttpService from './http.service';

class UserService extends HttpService {
  registerUser(user: RegisterUser) {
    return this.post({
      url: 'user/register',
      data: user
    });
  }

  loginUser(user: LoginUser) {
    return this.post({
      url: 'user/login',
      data: user
    });
  }

  logoutUser() {
    return this.post({
      url: 'user/logout'
    });
  }

  changePassword({ email, password }: ChangePassword) {
    return this.put({
      url: `user/changePassword/${email}`,
      data: {
        newPassword: password
      }
    });
  }

  changePasswordByAdmin({ email, password }: ChangePassword) {
    return this.put({
      url: `user/changePasswordByAdmin/${email}`,
      data: {
        newPassword: password
      }
    });
  }

  getUserByEmail(email: string) {
    return this.get({
      url: `user/getUser/${email}`
    });
  }
}

const userService = new UserService();
export default userService;
