import { IParams } from '../types/TodosParams';
import { Todo } from '../entities/Todo.entity';

export default class TodoService {
  async findOne(id: number) {
    const todo = await Todo.findOne({ where: { id } });
    return todo;
  }

  async findAll({ userId, search, status, list }: IParams) {
    const query = Todo.createQueryBuilder('todo').where('todo.userId = :userId', { userId });

    if (search && search.length >= 3) {
      query.andWhere('(todo.title ILIKE :search OR todo.description ILIKE :search)', {
        search: `%${search}%`
      });
    }

    if (status && status === 'private') {
      query.andWhere('todo.private = true');
    } else if (status === 'public') {
      query.andWhere('todo.private = false');
    }

    if (list && list === 'completed') {
      query.andWhere('todo.completed = true');
    }

    const todos = await query
      .orderBy('todo.id', 'DESC')
      .leftJoinAndSelect('todo.user', 'user')
      .getMany();

    return todos;
  }

  async addTodo(todo: Todo) {
    const newTodo = Todo.create(todo);
    await Todo.save(newTodo);
    return newTodo;
  }

  async changeTodo(id: number, updatedTodo: Partial<Todo>) {
    await Todo.update(id, updatedTodo);
    const updated = await Todo.findOne({ where: { id } });
    return updated;
  }

  async deleteTodo(id: number) {
    const todoToDelete = await Todo.findOne({ where: { id } });
    await Todo.delete(id);
    return todoToDelete;
  }

  async complete(id: number) {
    return Todo.update(id, { completed: true });
  }

  async uncomplete(id: number) {
    return Todo.update(id, { completed: false });
  }

  async setPrivate(id: number) {
    return Todo.update(id, { private: true });
  }

  async unsetPrivate(id: number) {
    return Todo.update(id, { private: false });
  }
}
