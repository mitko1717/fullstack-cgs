import { Request, Response, NextFunction } from 'express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/User.entity';

// verifyToken is responsible for verifying the users authentication token and preventing unauthorized access to protected routes
// to ensure that only authenticated users can access

const jwtSecret = 'your_jwt_secret';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
  // find user by it and return it in `done` callback
  const user = await User.findOne(payload.userId);

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // get JWT token from request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // verify token
  jwt.verify(token, jwtSecret, {}, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // set user on request object
    req.user = (payload as any).userId;

    next();
  });
};
