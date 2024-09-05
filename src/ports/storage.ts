export default interface Storage<T> {
  save(entity: T): Promise<void>;

  findById(id: string): Promise<T>;

  findAll(): Promise<T[]>;

  delete(entity: T): Promise<void>;
}
