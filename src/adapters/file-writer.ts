import fs from 'fs';

import Writer from "../ports/writer";

class FileWriter implements Writer {
  async write(str: string, path: string) {
    await fs.writeFileSync(path, str);
  }
}

export default FileWriter;
