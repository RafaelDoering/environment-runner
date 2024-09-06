interface Writer {
  write(str: string, path?: string): Promise<void>;
}

export default Writer;
