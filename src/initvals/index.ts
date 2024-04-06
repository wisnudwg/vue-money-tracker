import dayjs from 'dayjs';
import type {
  EntryPayload,
} from '@/types';

const entry: EntryPayload = {
  id: 0,
  uid: 0,
  operation: 'expense',
  amount: 0,
  source: '',
  target: '',
  category: '',
  note: '',
  timestamp: 0,
  date: dayjs(new Date()),
  datestring: '',
  time: dayjs(new Date()),
  timestring: '',
};

export default {
  entry,
}