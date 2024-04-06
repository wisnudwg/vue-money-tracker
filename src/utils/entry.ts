import dayjs from 'dayjs';
import { formatDate, formatTime } from '@/utils/date';

export const fromPartialEntry = (arg: any) => {
  const _d = arg?.timestamp ? new Date(arg.timestamp) : new Date();
  const date = dayjs(_d); const datestring = formatDate(_d.getTime());
  const time = dayjs(_d); const timestring = formatTime(_d.getTime());
  const defaultEntry = {
    id: 0,
    operation: 'expense',
    amount: 0,
    source: '',
    category: '',
    target: '',
    note: '',
    date, datestring,
    time, timestring,
  };
  const argCopy = { ...arg };
  delete argCopy.date; delete argCopy.datestring; delete argCopy.time; delete argCopy.timestring;
  const output = { ...defaultEntry, ...argCopy };
  return output;
};