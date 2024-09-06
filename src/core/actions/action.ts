interface Action {
  run(): Promise<void>;
}

export default Action;
