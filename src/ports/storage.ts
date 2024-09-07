export default interface Storage<T> {
  save(entity: T): Promise<void>;

  findById(id: number): Promise<T>;

  findAll(): Promise<T[]>;

  delete(entity: T): Promise<void>;

  purge(): Promise<void>;
}
