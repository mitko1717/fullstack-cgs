import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default class HttpService {
  async getTodos(): Promise<AxiosResponse<Todo[]>> {
    return axios.get(`${BASE_URL}/todos`);
  }

  async createTodo(todoData: Partial<Todo>): Promise<AxiosResponse<Todo>> {
    return axios.post(`${BASE_URL}/todos`, todoData);
  }

  async updateTodo(todoId: number, todoData: Partial<Todo>): Promise<AxiosResponse<Todo>> {
    return axios.put(`${BASE_URL}/todos/${todoId}`, todoData);
  }

  async deleteTodo(todoId: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${BASE_URL}/todos/${todoId}`);
  }
}
