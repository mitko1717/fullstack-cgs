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
// class TodoService extends HttpService  {
//   constructor() {
//     super();
//   }

//   async getAll(url: string) {
//     const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}`;
//     const response = await this.fetchingService.get(endpoint);
//     return response.data;
//   }

//   async getOne(url: string, id: string | undefined) {
//     const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
//     const response = await this.fetchingService.get(endpoint);
//     return response.data;
//   }

//   async createTodo<T>(url: string, data: T){
//     const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}`;
//     const response = await this.fetchingService.post(endpoint, data);
//     return response.data;
//   }

//   async editTodo<T>(url: string, id: string | undefined, data: T){
//     const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
//     const response = await this.fetchingService.put(endpoint, data);
//     return response.data;
//   }

//   async deleteTodo(url: string, id: number){
//     const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
//     const response = await this.fetchingService.delete(endpoint);
//     return response.data;
//   }

//   async complete(url: string, id: number) {
//     const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}/complete`;
//     const response = await this.fetchingService.put(endpoint);
//     return response.data;
//   }

//   async uncomplete(url: string, id: number) {
//     const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}/uncomplete`;
//     const response = await this.fetchingService.put(endpoint);
//     return response.data;
//   }
// }

// export const http = new HttpService({ baseUrl: process.env.BASE_URL, apiVersion: 'api' });
