import { exec } from "child_process";

import Terminal from "../ports/terminal";
import Logger from "../ports/logger";

class NodeChildProcessTerminal implements Terminal {
  constructor(private logger: Logger) { }

  async execute(command: string) {
    const child = exec(command);

    child.stdout.on('data', (data) => {
      this.logger.green(data.toString());
    });

    child.stderr.on('data', (data) => {
      this.logger.red(data.toString());
    });
  }
}

export default NodeChildProcessTerminal;
