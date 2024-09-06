interface Prompter {
  input(question: string): Promise<string>;
  list(question: string, choices: string[]): Promise<string>;
}

export default Prompter;
