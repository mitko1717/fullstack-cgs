import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User.entity';

export default class UserService {
  async signup(email: string, password: string): Promise<User> {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = User.create({ email, password: hashedPassword });

    // save user to db
    await user.save();

    return user;
  }

  async login(email: string): Promise<string> {
    // find user by email
    const user = await User.findOne({ where: { email } });

    // generate a JWT token
    const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });

    return token;
  }

  async logout() {
    return 'logout';
  }

  async getUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ email }, { password: hashedNewPassword });
    // first arg - filter to select user to update
    // second arg - object containing new values to update
  }
}

// In a JWT-based authentication system, when a user logs in, a JWT token is generated and sent back to client.
// client then includes this token in headers of all subsequent requests to server.
// server uses token to authenticate user and authorize access to protected resources.
