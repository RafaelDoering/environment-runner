export default interface Repository<T> {
  create(entity: T): Promise<void>;

  findById(id: number): Promise<T>;

  findAll(): Promise<T[]>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;

  purge(): Promise<void>
}
