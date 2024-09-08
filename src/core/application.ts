interface Command {
  id?: number;
  description: string;
  command: string;
}

interface Application {
  id?: number;
  name: string;
  description: string;
  commands: Command[];
}

export default Application;
export { Command };
