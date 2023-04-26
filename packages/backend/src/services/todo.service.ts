import { Todo } from '../entities/Todo.entity';

export default class TodoService {
  async findOne(id: number): Promise<Todo> {
    const todo = await Todo.findOne({ where: { id } });
    if (!todo) throw new Error(`Todo with id ${id} not found`);
    return todo;
  }

  async findAll() {
    const todos = await Todo.find();
    return todos;
  }

  async addTodo(todo: Todo): Promise<Todo> {
    const newTodo = Todo.create(todo);
    await Todo.save(newTodo);
    return newTodo;
  }

  async changeTodo(id: number, updatedTodo: Partial<Todo>) {
    const todoToUpdate = await Todo.findOne({ where: { id } });
    if (!todoToUpdate) throw new Error(`Todo with id ${id} not found`);

    const updated = Object.assign(todoToUpdate, updatedTodo);
    const updatedTodoEntity = await Todo.save(updated);
    return updatedTodoEntity;
  }

  async deleteTodo(id: number) {
    const todoToDelete = await Todo.findOne({ where: { id } });
    if (!todoToDelete) throw new Error(`Todo with id ${id} not found`);

    await Todo.delete(id);
    return todoToDelete;
  }

  async complete(id: number) {
    const todo = await Todo.update(id, { completed: true });
    return todo;
  }

  async uncomplete(id: number) {
    const todo = await Todo.update(id, { completed: false });
    return todo;
  }
}
