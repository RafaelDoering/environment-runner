import { TodoEntity } from "../core/todo";
import Repository from "../ports/repository";
import Storage from "../ports/storage";

export default class TodoRepository implements Repository<TodoEntity> {
  constructor(private todoStorage: Storage<TodoEntity>) { }

  async create(entity: TodoEntity): Promise<void> {
    await this.todoStorage.save(entity);
  }

  async findById(id: string): Promise<TodoEntity> {
    return await this.todoStorage.findById(id);
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoStorage.findAll();
  }

  async updateById(id: string, entity: TodoEntity): Promise<void> {
    entity.id = id;

    await this.todoStorage.save(entity);
  }

  async deleteById(entity: TodoEntity): Promise<void> {
    await this.todoStorage.delete(entity);
  }
}
