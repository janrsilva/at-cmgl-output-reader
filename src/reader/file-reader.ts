interface FileDriver {
  readFile(fileName: string): Promise<Buffer>;
}

export class FileReader {
  constructor(private file: FileDriver) { }

  async read(fileName: string): Promise<string> {
    const content = await this.file.readFile(fileName);
    return content.toString();
  }
}
