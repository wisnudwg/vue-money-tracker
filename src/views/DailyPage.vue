<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { Empty, Skeleton } from 'ant-design-vue';

import DailyTable from '@/components/groups/DailyTable.vue';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';

import { dataStates, dataMethods } from '@/stores/data';
import { datepickerStates } from '@/stores/datepicker';

// STORE
const { data, loading } = dataStates;
const { fetchData } = dataMethods;
const { datestring } = datepickerStates;

onBeforeMount(() => {
  fetchData(datestring.value);
});
</script>

<template>
  <DashboardLayout id="DailyPage" :income="data.summary.income" :expense="data.summary.expense" :total="data.summary.total">
    <template #pageContent>
      <div v-if="loading">
        <div v-for="x in new Array(3).fill(0).length" :key="`${x}`" class="skeleton-container">
          <Skeleton active :paragraph="{ rows: 4 }" />
        </div>
      </div>
      <div v-if="!loading">
        <template v-if="data.daily.length > 0">
          <div class="daily-table-wrapper" v-for="d in data.daily" :key="d.datestring">
            <DailyTable :datestring="d.datestring" :entries="(d.entries as any)" />
          </div>
        </template>
        <template v-if="data.daily.length === 0">
          <div class="empty-container">
            <Empty />
          </div>
        </template>
      </div>
    </template>
  </DashboardLayout>
</template>

<style lang="less">
#DailyPage {
  .empty-container {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .ant-empty {
      transform: scale(1.5);
    }
    .ant-empty-description {
      color: #555555 !important;
      font-weight: 600 !important;
    }
  }
  .skeleton-container {
    background-color: #FFFFFF;
    margin: 2vh 0;
    padding: 2vw;
  }
  .daily-table-wrapper {
    padding: 2vh 2vw;
  }
}
</style>