export default interface Repository<T> {
  create(entity: T): Promise<void>;

  findById(id: string): Promise<T>;

  findAll(): Promise<T[]>;

  updateById(id: string, entity: T): Promise<void>;

  deleteById(entity: T): Promise<void>;
}
