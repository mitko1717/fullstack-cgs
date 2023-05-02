export interface AddTodo {
  title: string;
  description: string;
  completed: boolean;
  private: boolean;
  id: number;
}

export interface ITodoEdit {
  title: string;
  description: string;
  completed: boolean;
  private: boolean;
  id: number | string;
}

export interface ITodo {
  id: string;
  title: string;
  description: string;
  private: boolean;
  completed?: boolean;
}

export interface ITodoCreate {
  title: string;
  description: string;
  private: boolean;
  completed?: boolean;
  userId: number | string;
}
