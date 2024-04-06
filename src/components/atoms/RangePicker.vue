<script setup lang="ts">
import { computed, defineProps, defineEmits, ref, withDefaults } from 'vue';
import { DatePicker, Select } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

import { dataMethods } from '@/stores/data';

import { upperCaseFirstLetter } from '@/utils/string';

const { RangePicker } = DatePicker;
const { Option } = Select;

// STORE
const { fetchData } = dataMethods;

// CONSTANTS
const formatOptions = ['day', 'month', 'year'].map(opt => ({ value: opt, label: upperCaseFirstLetter(opt) }));

// PROPS
interface Props {
  allowFormatChange: boolean,
  defaultValues: [Dayjs, Dayjs],
  format: 'day' | 'month' | 'year',
}
const props = withDefaults(defineProps<Props>(), {
  allowFormatChange: true,
  defaultValues: () => [dayjs(new Date()), dayjs(new Date())],
  format: 'day',
});

// FROM PROPS
const displayFormat = computed(() => {
  switch (props.format) {
    case 'year': return 'YYYY';
    case 'month': return 'MMM YYYY';
    default: return 'DD MMM YYYY';
  };
});

// STATE
const format = ref(props.format);
const dates = ref(props.defaultValues);
const datestrings = computed(() => {
  const out = dates.value
    .map(dt => new Date(dt as any).toLocaleDateString('en', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }))
    .map(ds => {
      const [day, month, date, year] = ds.replaceAll(',','').split(' ');
      return `${day} ${date} ${month} ${year}`
    });
  fetchData(out);
  return out;
});

// METHODS
const handleRangeChange = (newDates: [Dayjs, Dayjs]) => { dates.value = newDates; _change() };
const handleFormatChange = (newFormat: 'day' | 'month' | 'year') => { format.value = newFormat; _changeFormat() };

// EMITS
const emit = defineEmits<{
  (e: 'change', dates: Dayjs[], datestrings: string[]): void
  (e: 'changeFormat', format: string): void
}>();
const _change = () => { emit('change', dates.value, datestrings.value) };
const _changeFormat = () => { emit('changeFormat', format.value) };
</script>

<template>
  <RangePicker
    :allowClear="false"
    @change="handleRangeChange"
    :value="dates"
    :picker="(props.format as any)"
    :format="displayFormat"
  />
  <span v-if="props.allowFormatChange">&nbsp;&nbsp;</span>
  <Select v-if="props.allowFormatChange" :value="format" @change="handleFormatChange">
    <Option v-for="opt in formatOptions" :value="opt.value" v-bind:key="opt.value">{{ opt.label }}</Option>
  </Select>
</template>

<style lang="less">
</style>