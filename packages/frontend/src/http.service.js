import axios from 'axios';

class HttpService {
  constructor(baseUrl = 'http://localhost:4200', apiVersion = 'api', fetchingService = axios) {
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion;
    this.fetchingService = fetchingService;
  }

  async getAll(url) {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}`;
    const response = await this.fetchingService.get(endpoint);
      return response.data;
  }

  async getOne(url, id) {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
    const response = await this.fetchingService.get(endpoint);
      return response.data;
  }

  async post(url, data) {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}`;
    const response = await this.fetchingService.post(endpoint, data);
      return response.data;
  }
  

  async put(url, id, data) {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
    const response = await this.fetchingService.put(endpoint, data);
    return response.data;
  }

  async delete(url, id) {
    const endpoint = `${this.baseUrl}/${this.apiVersion}/${url}/${id}`;
    const response = await this.fetchingService.delete(endpoint);
      return response.data;
  }
}

export default HttpService;
