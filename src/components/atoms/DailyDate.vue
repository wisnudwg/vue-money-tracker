<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';

// PROPS
interface Props {
  datestring: string,
};
const props = withDefaults(defineProps<Props>(), {
  datestring: 'DAY DD MMM YYYY',
});

// FROM PROPS
const day = computed(() => props.datestring.split(' ')[0]);
const date = computed(() => props.datestring.split(' ')[1]);
const month = computed(() => props.datestring.split(' ')[2]);
const year = computed(() => props.datestring.split(' ')[3]);
const isWeekend = computed(() => ['Sat', 'Sun'].includes(props.datestring.split(' ')[0]));
</script>

<template>
  <span class="dailydate">
    <span class="date" :class="isWeekend ? day.toLowerCase() : 'weekday'">{{ date }}</span>
    <span class="day" :class="isWeekend ? day.toLowerCase() : 'weekday'">{{ day }}</span>
    <span class="month">{{ month }}</span>
    <span class="year">{{ year }}</span>
  </span>
</template>

<style lang="less" scoped>
.dailydate {
  span {
    padding-left: 4px;
  }
  .date {
    font-size: 14px;
    font-weight: 600;
    padding-right: 2px;
    &.sat {
      color: green;
    }
    &.sun {
      color: red;
    }
  }
  .day {
    border-radius: 2px;
    font-size: 16px;
    padding: 2px 5px;
    &.weekday {
      background-color: gray;
      color: #FFFFFF;
    }
    &.sat {
      background-color: green;
      color: #FFFFFF;
    }
    &.sun {
      background-color: red;
      color: #FFFFFF;
    }
  }
  .month {
    font-size: 14px;
    font-weight: 600;
  }
  .year {
    font-size: 12px;
    font-weight: 600;
  }
}
</style>