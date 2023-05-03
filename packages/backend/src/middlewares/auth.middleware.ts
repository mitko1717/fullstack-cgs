import { Request, Response, NextFunction } from 'express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../entities/User.entity';
import { Token } from '../entities/token.entity';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (req.method === 'POST' && existingUser) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  if (!existingUser && req.method !== 'POST') {
    return res.status(404).json({ message: 'User not found' });
  }

  next();
};

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
  // find user by it and return it in `done` callback
  const user = await User.findOne({ where: { id: payload.userId } });

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

// verifyToken is responsible for verifying the users authentication token and preventing unauthorized access to protected routes
// to ensure that only authenticated users can access

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // get JWT token from request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  // verify token
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // set user on request object
    req.user = (payload as any).userId;

    next();
  });
};

export const blacklistedToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const blacklistToken = await Token.findOne({
        where: { token }
      });

      if (blacklistToken) throw new Error('Token has been blacklisted');

      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
      const expirationTime = decodedToken.exp * 1000; // convert to milliseconds
      const currentTime = Date.now();

      if (expirationTime < currentTime) throw new Error('Token has expired');
    }

    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
