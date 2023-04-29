import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User.entity';

const jwtSecret = 'your_jwt_secret';

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

  async login(email: string, password: string): Promise<string> {
    // find user by email
    const user = await User.findOne({ where: { email } });

    // if user is not found or password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    // generate a JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    return token;
  }

  async logout() {
    return 'logout';
  }
}
