import moment from 'moment-timezone';

interface DataRaw {
  info: string;
  text: string;
}

interface Data {
  seq: number;
  status: string;
  from: string;
  timestamp: string;
  text: string;
}

export class ContentTransformer {
  contentToCmglArray(content: string): string[] {
    const [, ...lines] = content.replace(/(\nOK?)\n?$/, '').split('+CMGL:');

    const cmglArray = lines.map((line) => {
      return `+CMGL:${line}`;
    });

    return cmglArray;
  }

  extractData(CmglLine: string): DataRaw {
    const [info, ...message] = CmglLine.split('\n');

    return {
      info,
      text: message
        .filter((line) => {
          return !!line;
        })
        .join('\n'),
    };
  }

  dateRawToIso(dateRaw: string): string {
    const [date, timeWithZone] = dateRaw.split(',');
    const [year, month, day] = date.split('/');
    const [time, zone] = timeWithZone.split('+');
    const [hour, minute, second] = time.split(':');

    const yearPrefix = moment().year().toString().substring(0, 2);
    const parsed = moment(
      new Date(
        Number(`${yearPrefix}${year}`),
        +month - 1,
        +day,
        +hour,
        +minute,
        +second,
        0,
      ),
    );

    return parsed.format(`YYYY-MM-DDTHH:mm:ss+${zone}:00`);
  }

  transform(data: DataRaw): Data {
    data.info = data.info.replace(/"/g, '');
    const [seq, status, from, , date, time] = data.info.split(',');

    return {
      seq: +seq.replace(/\D/g, ''),
      status,
      from,
      timestamp: this.dateRawToIso(`${date},${time}`),
      text: data.text,
    };
  }
}
