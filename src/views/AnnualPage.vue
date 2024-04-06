<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { Skeleton } from 'ant-design-vue';

import MonthlyTable from '@/components/groups/MonthlyTable.vue';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';

import { dataStates, dataMethods } from '@/stores/data';
import { datepickerStates } from '@/stores/datepicker';

// CONSTANTS
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// STORE
const { data, loading } = dataStates;
const { fetchData } = dataMethods;
const { datestring } = datepickerStates;

// LIFECYCLE
onBeforeMount(() => {
  fetchData(datestring.value);
});
</script>

<template>
  <DashboardLayout id="AnnualPage" :income="data.summary.income" :expense="data.summary.expense" :total="data.summary.total">
    <template #pageContent>
      <div v-if="!loading">
        <div class="monthly-table-wrapper" v-for="m in months.map(mo => `${mo} ${datestring}`)" v-bind:key="`${m}`">
          <MonthlyTable :datestring="m" :entries="data.daily.filter(item => item.datestring.includes(m)) || []" />
        </div>
      </div>
      <div v-if="loading">
        <div v-for="x in new Array(3).fill(0).length" :key="`${x}`" class="skeleton-container">
          <Skeleton active :paragraph="{ rows: 4 }" />
        </div>
      </div>
    </template>
  </DashboardLayout>
</template>

<style lang="less">
#AnnualPage {
  .monthly-table-wrapper {
    padding: 2vh 2vw;
  }
  .skeleton-container {
    background-color: #FFFFFF;
    margin: 2vh 0;
    padding: 2vh 2vw;
  }
}
</style>