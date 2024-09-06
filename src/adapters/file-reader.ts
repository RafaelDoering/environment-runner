import fs from 'fs';

import Reader from "../ports/reader";

class FileReader implements Reader {
  async read(path: string) {
    return await fs.readFileSync(path, "utf8");
  }
}

export default FileReader;
