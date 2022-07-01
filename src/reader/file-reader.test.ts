import { FileReader } from './file-reader';

describe('Testing FileReader', () => {
  test('readFile method should be called', async () => {
    const mockFileDriver = {
      readFile: jest.fn(() => Promise.resolve(Buffer.from(fakeFile()))),
    };

    const file = new FileReader(mockFileDriver);
    await file.read('test.txt');

    expect(mockFileDriver.readFile).toHaveBeenCalled();
  });

  test('the readed content should match', async () => {
    const mockFileDriver = {
      readFile: jest.fn(() => Promise.resolve(Buffer.from(fakeFile()))),
    };

    const file = new FileReader(mockFileDriver);
    const content = await file.read('test.txt');

    expect(content.split('\n').shift()).toBe('AT+CMGL="ALL"');
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
