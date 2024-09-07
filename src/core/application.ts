import Command from "./command";

type Application = {
  id?: string;
  name: string;
  description: string;
  commands: Command[];
}

export default Application;
