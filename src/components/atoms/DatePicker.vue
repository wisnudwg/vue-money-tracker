<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, withDefaults } from 'vue';
import { Button, DatePicker, Select } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

import { dataMethods } from '@/stores/data';

import { upperCaseFirstLetter } from '@/utils/string';

const { Option } = Select;

// STORE
const { fetchData } = dataMethods;

// CONSTANTS
const formatOptions = ['month', 'year'].map(opt => ({ value: opt, label: upperCaseFirstLetter(opt) }));

// PROPS
interface Props {
  allowFormatChange: boolean,
  defaultValue: Dayjs,
  format: 'month' | 'year',
};
const props = withDefaults(defineProps<Props>(), {
  allowFormatChange: true,
  defaultValue: () => dayjs(new Date()),
  format: 'month',
});

// FROM PROPS
const displayFormat = computed(() => {
  switch (props.format) {
    case 'year': return 'YYYY';
    default: return 'MMM YYYY';
  };
});

// STATE
const format = ref(props.format)
const date = ref(props.defaultValue)
const datestring = computed(() => {
  let newDatestring = '';
  switch (format.value) {
    case 'year': newDatestring =  new Date(date.value as any).toLocaleDateString('en', { year: 'numeric' }); break;
    default: newDatestring = new Date(date.value as any).toLocaleDateString('en', { month: 'short', year: 'numeric' }); break;
  };
  fetchData(newDatestring);
  return newDatestring;
});

// METHODS
const handleDateChange = (newDate: Dayjs) => { date.value = newDate; _change() };
const decreaseDate = () => { date.value = date.value.add(-1, props.format); _change() };
const increaseDate = () => { date.value = date.value.add(1, props.format); _change() };
const handleFormatChange = (newFormat: 'month' | 'year') => { format.value = newFormat; _changeFormat() };

// EMITS
const emit = defineEmits<{
  (e: 'change', date: Dayjs, datestring: string): void
  (e: 'changeFormat', format: string): void
}>();
const _change = () => { emit('change', date.value, datestring.value) };
const _changeFormat = () => { emit('changeFormat', format.value) };
</script>

<template>
  <Button type="ghost" class="datepicker-btn" @click="decreaseDate">
    <LeftOutlined />
  </Button>
  <DatePicker
    :allowClear="false"
    @change="handleDateChange"
    :value="date"
    :picker="props.format"
    :format="displayFormat"
  />
  <Button type="ghost" class="datepicker-btn" @click="increaseDate">
    <RightOutlined />
  </Button>
  <Select v-if="props.allowFormatChange" :value="format" @change="handleFormatChange">
    <Option v-for="opt in formatOptions" :value="opt.value" v-bind:key="opt.value">{{ opt.label }}</Option>
  </Select>
</template>

<style lang="less">
.datepicker-btn {
  background-color: transparent;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover {
    opacity: .5;
  }
}
.ant-picker, .ant-picker-range {
  &:hover, &.ant-picker-focused {
    border: 1px solid lightgreen !important;
  }
  input {
    text-align: center;
  }
}
.ant-picker-month-btn, .ant-picker-year-btn {
  &:hover {
    color: green !important;
  }
}
.ant-picker-cell {
  .ant-picker-cell-inner {
    &::before {
      background-color: transparent !important;
    }
  }
}
.ant-picker-cell-selected.ant-picker-cell-in-view {
  .ant-picker-cell-inner {
    background-color: green !important;
  }
}
.ant-picker-cell-today {
  .ant-picker-cell-inner {
    &::before {
      border: 1px solid green !important;
    }
  }
}
.ant-picker-cell-in-range.ant-picker-cell-in-view {
  &::before {
    background-color: lightgreen !important;
  }
}
.ant-picker-cell-range-start, .ant-picker-cell-range-end {
  &.ant-picker-cell-in-view {
    .ant-picker-cell-inner {
      background-color: green !important;
    }
  }
}
</style>