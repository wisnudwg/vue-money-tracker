import { ref } from 'vue';
import { notification } from 'ant-design-vue';
import axios from 'axios';

import { defineStore, storeToRefs, piniaInstance } from './';
import { dataMethods } from './data';
import { datepickerStates } from './datepicker';
import { entryOptionsMethods } from './entry-options';
import { userStates } from './user';

import { EP } from '@/constants/env';

import initvals from '@/initvals';

import type { EntryPayload } from '@/types';
import { formatDate } from '@/utils/date';

const storeName = 'addEditEntry';
const useStore = defineStore(storeName, () => {
  // FROM ANOTHER STORE
  const { id: { value: Uid }, token: { value: Authorization } } = userStates;
  const { datestring: { value: dpDatestring } } = datepickerStates;
  const { fetchData } = dataMethods;
  const { getAssets, getExpenseCategories, getIncomeCategories, getNotes } = entryOptionsMethods;

  const open = ref(false);
  const entry = ref<EntryPayload>({ ...initvals.entry, uid: Uid });

  const openModalAddEditEntry = (newEntry: EntryPayload) => {
    entry.value = { ...entry.value, ...newEntry };
    open.value = true;
  };
  const closeModalAddEditEntry = () => {
    open.value = false;
    entry.value = { ...initvals.entry, uid: Uid };
  };
  const onAddEditEntry = async () => {
    let result: any
    if (entry.value.amount <= 0) {
      notification.error({ message: 'Error', description: 'Amount can not be 0' });
    } else {
      const timestamp = new Date(entry.value.date as any).getTime();
      const datestring = formatDate(timestamp);
      const formattedEntry = { ...entry.value, datestring, timestamp };
      if (entry.value.id && entry.value.id !== 0) {
        try {
          axios.put(`${EP}update-entry/${entry.value.id}`, { ...formattedEntry }, { headers: { Authorization, Uid } })
            .then(res => {
              notification.success({ message: 'Success', description: res.data.message });
              result = Promise.resolve(res);
              getAssets();
              getExpenseCategories();
              getIncomeCategories;
              getNotes();
              fetchData(dpDatestring);
            })
        } catch (err) {
          result = Promise.resolve(err);
        } finally {
          closeModalAddEditEntry();
        };
      } else {
        try {
          axios.post(`${EP}create-entry`, { ...formattedEntry }, { headers: { Authorization, Uid } })
            .then(res => {
              notification.success({ message: 'Success', description: res.data.message });
              result = Promise.resolve(res);
              getAssets();
              getExpenseCategories();
              getIncomeCategories;
              getNotes();
              fetchData(dpDatestring);
            })
        } catch (err) {
          result = Promise.reject(err);
        } finally {
          closeModalAddEditEntry();
        };
      };
    };
    return result;
  };

  return {
    open,
    entry,

    openModalAddEditEntry,
    onAddEditEntry,
    closeModalAddEditEntry,
  };
});
export const addEditEntryMethods = useStore(piniaInstance);
export const addEditEntryStates = storeToRefs(addEditEntryMethods);