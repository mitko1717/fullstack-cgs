export interface ITodo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  private: boolean;
  userId: number;
  user?: IUser;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface ITodosData {
  todos: ITodo[];
  totalCount: number;
  totalPages: number;
}
