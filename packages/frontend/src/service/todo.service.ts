import { ITodoCreate, ITodoEdit } from '../modules/common/types/AddTodo.types';
import HttpService from './http.service';

class TodoService extends HttpService {
  getAllTodos() {
    return this.get({
      url: 'todos'
    });
  }

  getOneTodo(todoId: string | number) {
    return this.get({
      url: `todos/${todoId}`
    });
  }

  editTodo(todo: ITodoEdit) {
    return this.put({
      url: `todos/${todo.id}`,
      data: { ...todo, id: undefined }
    });
  }

  deleteTodo(todoId: string | number) {
    return this.delete({
      url: `todos/${todoId}`
    });
  }

  createTodo(todo: ITodoCreate) {
    return this.post({
      url: 'todos',
      data: todo
    });
  }

  completeTodo(todoId: string | number) {
    return this.put({
      url: `todos/${todoId}/complete`
    });
  }

  uncompleteTodo(todoId: string | number) {
    return this.put({
      url: `todos/${todoId}/uncomplete`
    });
  }
}

const todoService = new TodoService();
export default todoService;
