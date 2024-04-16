import { ref } from 'vue';
import axios from 'axios';

import { defineStore, storeToRefs, piniaInstance } from './';
import { entryOptionsStates } from './entry-options';

import { EP } from '@/constants/env';

import type { Entry } from '@/types';
import { userStates } from './user';

interface Summary {
  income: number,
  expense: number,
  total: number,
};
interface DailyDatum {
  datestring: string,
  entries: Entry[],
};
interface Range {
  income: number[],
  expense: number[],
};
interface Data {
  summary: Summary,
  daily: DailyDatum[],
  range: Range,
};

const storeName = 'data';
const useStore = defineStore(storeName, () => {
  // FROM ANOTHER STORE
  const { id: { value: Uid }, token: { value: Authorization } } = userStates;
  const { incomeCategories, expenseCategories } = entryOptionsStates;
  
  const data = ref<Data>({
    summary: { income: 0, expense: 0, total: 0 },
    daily: [],
    range: { income: [], expense: [] },
  });
  const loading = ref(false);

  async function fetchData(datestring: string | number[]) {
    loading.value = true;
    let result;
    if (typeof datestring === 'string') {
      try {
        axios.post(`${EP}get-entries`, { datestring }, { headers: { Authorization, Uid }})
          .then(res => {
            const datestrings = [... new Set(res.data.entries.map((entry: any) => entry.datestring))].reverse();
            const dailyEntries = datestrings.map((ds: any) => ({
              datestring: ds,
              entries: res.data.entries.filter((entry: any) => entry.datestring === ds).reverse(),
            }));
            let entries: any[] = [];
            dailyEntries.filter((item: any) => item.datestring.includes(datestring)).forEach((item: any) => { entries = [...entries, ...item.entries] });
            const summary: Summary = { income: 0, expense: 0, total: 0 };
            entries.forEach(entry => {
              if (entry.operation === 'income') summary.income += entry.amount;
              if (entry.operation === 'expense') summary.expense += entry.amount;
            });
            summary.total = summary.income - summary.expense;
            const daily: DailyDatum[] = dailyEntries.filter((item: any) => item.datestring.includes(datestring));
            const range: Range = { income: [], expense: [] };
            data.value = { summary, daily, range };
            result = Promise.resolve({ summary, daily, range });
          })
      } catch (err) {
        result = Promise.reject(err);
      } finally {
        loading.value = false;
      }
    } else {
      try {
        axios.post(`${EP}get-entries`, { date_start: datestring[0], date_end: datestring[1] }, { headers: { Authorization, Uid } })
          .then(res => {
            const datestrings = [... new Set(res.data.entries.map((entry: any) => entry.datestring))];
            const dailyEntries = datestrings.map((ds: any) => ({
              datestring: ds,
              entries: res.data.entries.filter((entry: any) => entry.datestring === ds),
            }));
            let entries: any[] = [];
            dailyEntries.forEach(item => { entries = [...entries, ...item.entries] });
            const summary: Summary = { income: 0, expense: 0, total: 0 };
            entries.forEach(entry => {
              if (entry.operation === 'income') summary.income += entry.amount;
              if (entry.operation === 'expense') summary.expense += entry.amount;
            });
            summary.total = summary.income - summary.expense;
            const daily: DailyDatum[] = Array.isArray(datestring) ? [] : dailyEntries.filter((item: any) => item.datestring.includes(datestring));
            const range: Range = { income: [], expense: [] };
            for (let i=0; i<incomeCategories.value.length; i+=1) {
              const category = incomeCategories.value[i];
              let val = 0;
              entries.forEach(entry => {
                val += (entry.operation === 'income' && entry.category.toLowerCase() === category) ? entry.amount : 0;
              });
              range.income.push(val);
            };
            for (let i=0; i<expenseCategories.value.length; i+=1) {
              const category = expenseCategories.value[i];
              let val = 0;
              entries.forEach(entry => {
                val += (entry.operation === 'expense' && entry.category.toLowerCase() === category) ? entry.amount : 0;
              });
              range.expense.push(val);
            };
            data.value = { summary, daily, range };
            result = Promise.resolve({ summary, daily, range });
          })
      } catch (err) {
        result = Promise.reject(err);
      } finally {
        loading.value = false;
      }
    }
    return result;
  };

  return {
    data,
    loading,

    fetchData,
  }
});

export const dataMethods = useStore(piniaInstance);
export const dataStates = storeToRefs(dataMethods);