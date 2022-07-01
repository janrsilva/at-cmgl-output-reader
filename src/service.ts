import fs from 'fs/promises';
import { ContentTransformer } from './transformer/content-transformer';
import { FileReader } from './reader/file-reader';

export class Service {
  async execute(...paths: string[]): Promise<void> {
    const fileReader = new FileReader(fs);
    const contentTransformer = new ContentTransformer();

    const results = await Promise.all(
      paths.map(async (path) => {
        const content = await fileReader.read(path);
        const cmglArray = contentTransformer.contentToCmglArray(content);
        return cmglArray.map((cmgl) => {
          const dataRaw = contentTransformer.extractData(cmgl);
          const data = contentTransformer.transform(dataRaw);
          return data;
        });
      }),
    );

    results.forEach((result) => {
      console.log(JSON.stringify(result));
      console.log('\n');
    });
  }
}
