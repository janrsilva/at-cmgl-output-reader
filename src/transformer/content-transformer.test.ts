import { ContentTransformer } from './content-transformer';
import { FileReader } from '../reader/file-reader';

describe('Testing ContentTransformer', () => {
  test('from the content string we should get a line array', async () => {
    const mockFileDriver = {
      readFile: jest.fn(() => Promise.resolve(Buffer.from(fakeFile()))),
    };

    const file = new FileReader(mockFileDriver);
    const contentTransformer = new ContentTransformer();

    const cmglArray = contentTransformer.contentToCmglArray(
      await file.read('test.txt'),
    );

    expect(cmglArray).toHaveLength(3);
    expect(cmglArray[0]).toContain('+CMGL: 1');
  });

  test('should be able to extract the content from a +CMGL line', async () => {
    const contentTransformer = new ContentTransformer();
    const cmglContent = contentTransformer.extractData(
      `+CMGL: 2,"REC UNREAD","+5511388382882","","22/05/10,13:54:14+08"
Essa eh a segunda mensagem`,
    );

    expect(cmglContent.text).toBe('Essa eh a segunda mensagem');
  });

  test('should be able to transform a CMGL info message to AT+CMGL pattern', async () => {
    const contentTransformer = new ContentTransformer();
    const data = contentTransformer.transform({
      info: '+CMGL: 1,"REC READ","+5511388382882","","22/05/05,16:04:23+08"',
      text: 'oi tudo bem?',
    });

    expect(data).toMatchObject({
      seq: 1,
      status: 'REC READ',
      from: '+5511388382882',
      timestamp: '2022-05-05T16:04:23+08:00',
      text: 'oi tudo bem?',
    });
  });

  test('should be able to transform date raw to ISO8601', async () => {
    const contentTransformer = new ContentTransformer();

    expect(contentTransformer.dateRawToIso('22/05/05,16:04:23+08')).toBe(
      '2022-05-05T16:04:23+08:00',
    );
  });
});

function fakeFile() {
  return `AT+CMGL="ALL"
+CMGL: 1,"REC READ","+5511388382882","","22/05/05,16:04:23+08"
00480065006C006C006F00200077006F0072006C0064002000C1
+CMGL: 2,"REC UNREAD","+5511388382882","","22/05/10,13:54:14+08"
Essa eh a segunda mensagem
+CMGL: 3,"REC UNREAD","+551130872258","","22/05/30,19:37:01+08"
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
OK`;
}
