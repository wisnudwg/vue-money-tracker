import { ref, computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

import { defineStore, storeToRefs, piniaInstance } from './';
import { dataMethods } from './data';
import LS from './LOCALSTORAGE';

const storeName = 'rangepicker';
const useStore = defineStore(storeName, () => {
  // FROM ANOTHER STORE
  const { fetchData } = dataMethods;
  
  const format = ref(localStorage.getItem(LS.RANGEPICKER_FORMAT) || 'month');
  function changeFormat(unit: 'day' | 'month' | 'year') {
    localStorage.setItem(LS.RANGEPICKER_FORMAT, unit);
    format.value = unit;
  };
  const dates = ref([
    dayjs(JSON.parse(localStorage.getItem(LS.RANGEPICKER_VALUE) as any)?.[0] || new Date()).startOf(format.value as dayjs.OpUnitType),
    dayjs(JSON.parse(localStorage.getItem(LS.RANGEPICKER_VALUE) as any)?.[1] || new Date()).endOf(format.value as dayjs.OpUnitType),
  ]);
  const datestrings = computed(() => {
    switch (format.value) {
      case 'month': return dates.value.map(date => new Date(date as any).toLocaleDateString('en', { month: 'short', year: 'numeric' }));
      case 'year': return dates.value.map(date => new Date(date as any).toLocaleDateString('en', { year: 'numeric' }));
      default: return dates.value
        .map(date => new Date(date as any).toLocaleDateString('en', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }))
        .map(ds => {
          const [day, month, date, year] = ds.replace(',','').replace(',','').split(' ');
          return `${day} ${date} ${month} ${year}`;
        });
    };
  });
  function changeRange(newDates: Dayjs[]) {
    const adjustedNewDates = [
      newDates[0].startOf(format.value as dayjs.OpUnitType),
      newDates[1].endOf(format.value as dayjs.OpUnitType),
    ];
    localStorage.setItem(LS.RANGEPICKER_VALUE, JSON.stringify(adjustedNewDates));
    fetchData(adjustedNewDates.map(item => new Date(item as any).getTime()))
    dates.value = adjustedNewDates;
  };

  return {
    format,
    changeFormat,
    dates,
    datestrings,
    changeRange,
  };
});
export const rangepickerMethods = useStore(piniaInstance);
export const rangepickerStates = storeToRefs(rangepickerMethods);