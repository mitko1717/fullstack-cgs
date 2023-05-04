import { ITodoCreate, ITodoEdit } from '../modules/common/types/AddTodo.types';
import { IParams } from '../modules/common/types/TodosParams.types';
import HttpService from './http.service';

class TodoService extends HttpService {
  getAllTodos(values: IParams) {
    return this.get({
      url: 'todos',
      params: {
        search: values.search,
        status: values.status,
        list: values.list,
        userId: values.userId,
        page: values.page,
        limit: values.limit
      }
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
      data: { ...todo, id: todo.id }
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

  setPrivateTodo(todoId: string | number) {
    return this.put({
      url: `todos/${todoId}/setPrivate`
    });
  }

  setNotPrivateTodo(todoId: string | number) {
    return this.put({
      url: `todos/${todoId}/unsetPrivate`
    });
  }
}

const todoService = new TodoService();
export default todoService;
