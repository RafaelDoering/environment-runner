import Command from "./command";

interface Application {
  id?: number;
  name: string;
  description: string;
  commands: Command[];
}

export default Application;
