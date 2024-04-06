import { ref } from 'vue';
import { notification } from 'ant-design-vue';
import axios from 'axios';

import { defineStore, storeToRefs, piniaInstance } from './'
import { dataMethods } from './data';
import { datepickerStates } from './datepicker';
import { userStates } from './user';

import { EP } from '@/constants/env';

import initvals from '@/initvals';

import type { EntryPayload } from '@/types';


const storeName = 'deleteEntry';
const useStore = defineStore(storeName, () => {
  // FROM ANOTHER STORE
  const { id: { value: Uid }, token: { value: Authorization } } = userStates;
  const { fetchData } = dataMethods;
  const { datestring } = datepickerStates;

  const open = ref(false);
  const entry = ref<EntryPayload>({ ...initvals.entry, uid: Uid });

  const openModalDeleteEntry = (targetEntry: EntryPayload) => {
    entry.value = { ...entry.value, ...targetEntry };
    open.value = true;
  };
  const closeModalDeleteEntry = () => {
    open.value = false;
    entry.value = { ...initvals.entry, uid: Uid };
  };
  const onDeleteEntry = () => {
    axios.delete(`${EP}delete-entry/${entry.value.id}`, { headers: { Authorization, Uid }})
      .then(res => {
        notification.success({ message: 'Success', description: 'Entry deleted' });
        fetchData(datestring.value);
        closeModalDeleteEntry();
      })
      .catch(err => {
        notification.error({ message: 'Error', description: 'Failed to delete entry' });
      })
  };

  return {
    open,
    entry,
    openModalDeleteEntry,
    closeModalDeleteEntry,
    onDeleteEntry,
  };
});
export const deleteEntryMethods = useStore(piniaInstance);
export const deleteEntryStates = storeToRefs(deleteEntryMethods);