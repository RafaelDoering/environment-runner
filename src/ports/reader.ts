interface Reader {
  read(path?: string): Promise<string>;
}

export default Reader;
