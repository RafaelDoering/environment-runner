interface Command {
  id?: number;
  description: string;
  command: string;
}

interface Application {
  id?: number;
  name: string;
  description: string;
  absolutePath: string;
  upCommands: Command[];
  downCommands: Command[];
}

export default Application;
export { Command };
