export class TextFormatter {
  hexToUtf8(hex: string): string {
    const output = Buffer.from(hex, 'hex');
    return output.toString('utf8');
  }

  removeNoAsciiCaracters(str: string): string {
    return str.replace(/[^\x20-\x7E]/g, '');
  }

  isHex(hex: string): boolean {
    return hex.match(/^[0-9A-F]+$/i)?.length === 1;
  }
}
