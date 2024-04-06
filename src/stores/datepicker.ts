import { ref, computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

import { defineStore, storeToRefs, piniaInstance } from './';
import { dataMethods } from './data';
import LS from './LOCALSTORAGE';

const storeName = 'datepicker';
const useStore = defineStore(storeName, () => {
  // FROM ANOTHER STORE
  const { fetchData } = dataMethods;

  const format = ref(localStorage.getItem(LS.LOCATION) === 'annual' ? 'year' : 'month');
  function changeFormat(unit: 'month' | 'year') {
    format.value = unit;
  };
  const date = ref(dayjs(JSON.parse(localStorage.getItem(LS.DATEPICKER_VALUE) as any) || new Date()));
  const datestring = computed(() => {
    let newDatestring = '';
    switch (format.value) {
      case 'year': newDatestring =  new Date(date.value as any).toLocaleDateString('en', { year: 'numeric' }); break;
      default: newDatestring = new Date(date.value as any).toLocaleDateString('en', { month: 'short', year: 'numeric' }); break;
    };
    fetchData(newDatestring);
    return newDatestring;
  });
  function increaseDate(unit: 'month' | 'year') {
    date.value = date.value.add(1, unit);
  };
  function decreaseDate(unit: 'month' | 'year') {
    date.value = date.value.add(-1, unit);
  };
  function changeDate(newDate: Dayjs) {
    localStorage.setItem(LS.DATEPICKER_VALUE, JSON.stringify(newDate));
    date.value = newDate;
  };

  return {
    format,
    changeFormat,
    date,
    datestring,
    increaseDate,
    decreaseDate,
    changeDate,
  };
});
export const datepickerMethods = useStore(piniaInstance);
export const datepickerStates = storeToRefs(datepickerMethods);