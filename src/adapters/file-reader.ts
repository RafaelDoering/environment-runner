import fs from 'fs';

import Reader from "../ports/reader";

class FileReader implements Reader {
  async read(path: string) {
    try {
      return await fs.readFileSync(path, "utf8");
    } catch (error) {
      return null;
    }
  }
}

export default FileReader;
