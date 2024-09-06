import chalk from "chalk";

import Logger from "../ports/logger";

class ChalkLogger implements Logger {
  red(str: string) {
    console.log(chalk.red(str));
  }

  green(str: string) {
    console.log(chalk.green(str));
  }
}

export default ChalkLogger;
