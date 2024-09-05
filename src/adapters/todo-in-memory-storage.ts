import { TodoEntity } from "../core/todo";
import Storage from "../ports/storage";

export default class TodoInMemoryStorage implements Storage<TodoEntity> {
  private todos: TodoEntity[] = [];

  constructor() { }

  async save(entity: TodoEntity): Promise<void> {
    const todo = await this.findById(entity.id);
    if (todo) {
      for (const key of Object.keys(todo)) {
        todo[key] = entity[key];
      }
    } else {
      this.todos.push(entity);
    }
  }

  async findById(id: string): Promise<TodoEntity> {
    return this.todos.find(todo => todo.id === id);
  }

  async findAll(): Promise<TodoEntity[]> {
    return this.todos;
  }

  async delete(entity: TodoEntity): Promise<void> {
    this.todos = this.todos.filter(todo => todo.id !== entity.id);
  }
}
