<script setup lang="ts">
import { computed, defineProps, defineEmits, ref, withDefaults } from 'vue';
import { DatePicker, Select } from 'ant-design-vue';
import type { SelectValue } from 'ant-design-vue/es/select';
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
      const [day, month, date, year] = ds.split(",").join("").split(' ');
      return `${day} ${date} ${month} ${year}`
    });
  fetchData(out);
  return out;
});

// METHODS
const handleRangeChange = (newDates: [string, string] | [Dayjs, Dayjs]) => {
  dates.value = newDates;
  _change()
};
const handleFormatChange = (newFormat: 'day' | 'month' | 'year' | SelectValue) => {
  if (newFormat === "day" || newFormat === "month" || newFormat === "year") {
    format.value = newFormat;
  }
  _changeFormat()
};

// EMITS
const emit = defineEmits<{
  (e: 'change', dates: Dayjs[], datestrings: string[]): void
  (e: 'changeFormat', format: string): void
}>();
const _change = () => { emit('change', dates.value, datestrings.value) };
const _changeFormat = () => { emit('changeFormat', format.value) };
</script>

<template>
  <div id="RangepickerWrapper">
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
  </div>
</template>

<style lang="less">
#RangepickerWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 500px) {
    .ant-picker {
      input {
        font-size: 12px !important;
      }
    }
    .ant-select-selector {
      height: 30px;
      .ant-select-selection-item {
        font-size: 12px !important;
      }
    }
  }
}
.ant-picker-panels {
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    .ant-picker-header {
      border-top: 4px solid green;
      border-bottom: 1px solid lightgreen;
    }
  }
}
</style>