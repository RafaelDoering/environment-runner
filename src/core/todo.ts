type Todo = {
  id: string;
  title: string;
  isDone: boolean;
}

export default Todo;

export class TodoEntity {
  public id: string;
  public title: string;
  public isDone: boolean;

  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.isDone = todo.isDone;
  }
};
