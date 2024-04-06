import { Dayjs } from 'dayjs';

export interface Entry {
  id?: number | string,
  operation?: string,
  timestamp?: number,
  category?: string,
  target?: string,
  amount?: number,
  source?: string,
  note?: string,
  day?: string,
  date?: string,
  month?: string,
  year?: string,
  datestring?: string,
  timestring?: string,
};
export interface Entries extends Array<Entry>{}

export interface EntryPayload {
  id?: number | string,
  uid?: number | string,
  operation: string,
  amount: number,
  source: string,
  target: string,
  category: string,
  note: string,
  timestamp: number,
  date: Dayjs,
  datestring: string,
  time: Dayjs,
  timestring: string,
};

export interface LabelValuePair {
  label: string,
  value: string,
};
export interface LabelValuePairs extends Array<LabelValuePair>{}

export interface User {
  id?: number | string,
  email: string,
  password: string,
  confirm_password?: string,
  name: string,
  phone: string,
  currency?: string,
}
export interface Users extends Array<User>{}

export interface UserLogin {
  email: string,
  password: string,
  remember?: boolean,
}