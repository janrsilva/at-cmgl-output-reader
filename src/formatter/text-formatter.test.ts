import { TextFormatter } from './text-formatter';

describe('Testing TextFormatter', () => {
  test('should be able to convert hex to string and remove no ascii', async () => {
    const textFormatter = new TextFormatter();

    expect(
      textFormatter.removeNoAsciiCaracters(
        textFormatter.hexToUtf8(
          '00480065006C006C006F00200077006F0072006C0064002000C1',
        ),
      ),
    ).toBe('Hello world ');
  });

  test('should be able to check if text is hex', async () => {
    const contentTransformer = new TextFormatter();

    expect(
      contentTransformer.isHex(
        '00480065006C006C006F00200077006F0072006C0064002000C1',
      ),
    ).toBeTruthy();
    expect(contentTransformer.isHex('oi tudo bem?')).toBeFalsy();
  });
});
