import { Todo } from '../entities/Todo.entity';

export default class TodoService {
  async findOne(id: number) {
    const todo = await Todo.findOne({ where: { id } });
    return todo;
  }

  // filter out private todos that do not belong to active user
  async findAll(userId: number) {
    const todos = await Todo.createQueryBuilder('todo')
      .where('todo.private = false OR todo.userId = :userId', { userId })
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
