import Application from "../core/application";
import Repository from "../ports/repository";
import Storage from "../ports/storage";

export default class ApplicationRepository implements Repository<Application> {
  constructor(private applicationStorage: Storage<Application>) { }

  async create(entity: Application) {
    return this.applicationStorage.save(entity);
  }

  async findById(id: number): Promise<Application> {
    return await this.applicationStorage.findById(id);
  }

  async findAll(): Promise<Application[]> {
    return await this.applicationStorage.findAll();
  }

  async update(entity: Application) {
    await this.applicationStorage.save(entity);
  }

  async delete(entity: Application) {
    await this.applicationStorage.delete(entity);
  }

  async purge() {
    await this.applicationStorage.purge();
  }
}
