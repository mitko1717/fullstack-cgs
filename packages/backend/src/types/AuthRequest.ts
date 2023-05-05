import { Request } from 'express';
import { User } from '../entities/user.entity';

export interface IAuthenticatedRequest extends Request {
  user?: User;
  query: Record<string, string> & {
    search?: string;
    public?: string | boolean;
    completed?: string | boolean;
    page?: number;
    limit?: number;
  };
}
