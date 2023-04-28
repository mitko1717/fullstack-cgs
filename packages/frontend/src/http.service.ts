import axios, { AxiosInstance, AxiosResponse } from 'axios';

type FetchingService = AxiosInstance;

interface HttpServiceOptions {
  baseUrl?: string;
  apiVersion?: string;
  fetchingService?: FetchingService;
}

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

class HttpService {
  baseUrl: string;

  apiVersion: string;

  fetchingService: FetchingService;

  constructor(options?: HttpServiceOptions) {
    this.baseUrl = (options?.baseUrl && process.env.BASE_URL) || 'http://localhost:4200';
    this.apiVersion = options?.apiVersion ?? 'api';
    this.fetchingService = options?.fetchingService ?? axios.create();
  }

  async getAll(url: string) {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}`;
    const response = await this.fetchingService.get(endpoint);
    return response.data;
  }

  async getOne(url: string, id: string | undefined) {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
    const response = await this.fetchingService.get(endpoint);
    return response.data;
  }

  async post<T>(url: string, data: T): Promise<T> {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}`;
    const response: AxiosResponse<T> = await this.fetchingService.post(endpoint, data);
    return response.data;
  }

  async put<T>(url: string, id: string | undefined, data: T): Promise<T> {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
    const response: AxiosResponse<T> = await this.fetchingService.put(endpoint, data);
    return response.data;
  }

  async delete<T>(url: string, id: number): Promise<T> {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
    const response: AxiosResponse<T> = await this.fetchingService.delete(endpoint);
    return response.data;
  }

  async complete(url: string, id: number): Promise<TodoItem> {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}/complete`;
    const response: AxiosResponse<TodoItem> = await this.fetchingService.put(endpoint);
    return response.data;
  }

  async uncomplete(url: string, id: number): Promise<TodoItem> {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}/uncomplete`;
    const response: AxiosResponse<TodoItem> = await this.fetchingService.put(endpoint);
    return response.data;
  }
}

export const http = new HttpService({ baseUrl: process.env.BASE_URL, apiVersion: 'api' });
