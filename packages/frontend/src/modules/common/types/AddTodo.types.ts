export interface AddTodo {
  title: string;
  description: string;
  completed: boolean;
  private: boolean;
  userId: number;
}

export interface EditTodo {
  title: string;
  description: string;
  completed: boolean;
  private: boolean;
  userId: number;
}
