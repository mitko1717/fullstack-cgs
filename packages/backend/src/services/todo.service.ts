import { getRepository } from 'typeorm';
import { Todo } from '../entities/Todo';
import { TodoDTO } from '../dto/todo.dto';

export default class TodoService {
  async findAll() {
    const repository = getRepository(Todo);
    const todos = await repository.find();
    return todos;
  }

  async addTodo(todoDTO: TodoDTO): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    const newTodo = todoRepository.create(todoDTO);
    await todoRepository.save(newTodo);
    return newTodo;
  }

  async changeTodo(id: number, updatedTodo: Partial<Todo>) {
    const todoRepository = getRepository(Todo);
    const todoToUpdate = await todoRepository.findOne({ where: { id } });
    if (!todoToUpdate) {
      throw new Error(`Todo with id ${id} not found`);
    }
    const updated = Object.assign(todoToUpdate, updatedTodo);
    const updatedTodoEntity = await todoRepository.save(updated);
    return updatedTodoEntity;
  }

  async deleteTodo(id: number) {
    const todoRepository = getRepository(Todo);
    const todoToDelete = await todoRepository.findOne({ where: { id } });
    if (!todoToDelete) {
      throw new Error(`Todo with id ${id} not found`);
    }
    await todoRepository.delete(id);
    return todoToDelete;
  }
}
