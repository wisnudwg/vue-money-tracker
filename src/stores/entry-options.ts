import { ref } from 'vue';
import axios from 'axios';

import { defineStore, storeToRefs, piniaInstance } from './';
import { userStates } from './user';

import { EP } from '@/constants/env';

const storeName = 'entryOptions';
const useStore = defineStore(storeName, () => {
  // FROM ANOTHER STORE
  const { id: { value: Uid }, token: { value: Authorization } } = userStates;
  const assets = ref(['account', 'cash', 'other']);
  const incomeCategories = ref(['bonus', 'commision', 'petty cash', 'salary', 'other']);
  const expenseCategories = ref(['education', 'food', 'gift', 'health', 'household', 'social', 'transport', 'other']);
  const notes = ref(['other']);

  async function getAssets() {
    let result: any;
    try {
      axios.get(`${EP}get-assets/${Uid}`, { headers: { Authorization, Uid }})
        .then(res => {
          assets.value = res.data.assets;
          result = Promise.resolve(res.data.assets);
        })
    } catch (err) {
      result = Promise.reject(err)
    };
    return result;
  };

  async function getIncomeCategories() {
    let result: any;
    try {
      axios.get(`${EP}get-income-categories/${Uid}`, { headers: { Authorization, Uid } })
        .then(res => {
          incomeCategories.value = res.data.categories;
          result = Promise.resolve(res.data.categories);
        })
    } catch (err) {
      result = Promise.reject(err);
    };
    return result;
  };

  async function getExpenseCategories() {
    let result: any;
    try {
      axios.get(`${EP}get-expense-categories/${Uid}`, { headers: { Authorization, Uid } })
        .then(res => {
          expenseCategories.value = res.data.categories;
          result = Promise.resolve(res.data.categories);
        })
    } catch (err) {
      result = Promise.reject(err);
    };
    return result;
  };

  async function getNotes() {
    let result: any;
    try {
      axios.get(`${EP}get-notes/${Uid}`, { headers: { Authorization, Uid } })
        .then(res => {
          notes.value = res.data.notes;
          result = Promise.resolve(res.data.notes);
        })
    } catch (err) {
      result = Promise.reject(err);
    };
    return result;
  }

  return {
    assets,
    incomeCategories,
    expenseCategories,
    notes,

    getAssets,
    getExpenseCategories,
    getIncomeCategories,
    getNotes,
  };
});
export const entryOptionsMethods = useStore(piniaInstance);
export const entryOptionsStates = storeToRefs(entryOptionsMethods);