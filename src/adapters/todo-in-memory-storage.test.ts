import Todo, { TodoEntity } from "../core/todo";
import TodoInMemoryStorage from "./todo-in-memory-storage";
import Storage from "../ports/storage";

let todoInMemoryStorage: Storage<TodoEntity>;

beforeEach(() => {
  todoInMemoryStorage = new TodoInMemoryStorage();
});

test("find todo when todo was created", async () => {
  const todo: Todo = {
    id: "0",
    title: "0",
    isDone: false,
  }
  const todoEntity = new TodoEntity(todo);
  await todoInMemoryStorage.save(todoEntity);
  const createdTodo = await todoInMemoryStorage.findById(todo.id);

  expect(createdTodo).toBe(todoEntity);
});

test("doesn't find todo when todo was deleted", async () => {
  const todo: Todo = {
    id: "0",
    title: "0",
    isDone: false,
  }
  const todoEntity = new TodoEntity(todo);
  await todoInMemoryStorage.save(todoEntity);
  await todoInMemoryStorage.delete(todoEntity);
  const createdTodo = await todoInMemoryStorage.findById(todo.id);

  expect(createdTodo).toBeFalsy();
});

test("save updates data when todo already exists", async () => {
  const todo: Todo = {
    id: "0",
    title: "0",
    isDone: false,
  }
  const todoEntity = new TodoEntity(todo);
  await todoInMemoryStorage.save(todoEntity);

  const foundTodo = await todoInMemoryStorage.findById(todoEntity.id);
  foundTodo.isDone = true;
  await todoInMemoryStorage.save(foundTodo);

  const updatedTodo = await todoInMemoryStorage.findById(todoEntity.id);

  expect(updatedTodo.isDone).toBe(true);
  expect(updatedTodo.title).toBe(todoEntity.title);
});
