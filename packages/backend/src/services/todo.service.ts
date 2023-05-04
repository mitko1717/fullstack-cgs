import { IParams } from '../types/TodosParams';
import { Todo } from '../entities/Todo.entity';

export default class TodoService {
  async findOne(id: number) {
    const todo = await Todo.findOne({ where: { id } });
    return todo;
  }

  async findAll({ userId, search, status, list, page = 1, limit = 5 }: IParams) {
    const query = Todo.createQueryBuilder('todo').where('todo.userId = :userId', { userId });

    query
      .andWhere(
        search && search.length >= 3
          ? '(todo.title ILIKE :search OR todo.description ILIKE :search)'
          : '1=1',
        { search: `%${search}%` }
      )
      .andWhere(status === 'private' ? 'todo.private = true' : '1=1')
      .andWhere(list === 'completed' ? 'todo.completed = true' : '1=1');

    const [todos, totalCount] = await Promise.all([
      query
        .orderBy('todo.id', 'DESC')
        .leftJoinAndSelect('todo.user', 'user')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany(),
      query.getCount()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return { todos, totalCount, totalPages };
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
