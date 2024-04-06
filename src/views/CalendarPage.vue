<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Calendar, Drawer, Spin } from 'ant-design-vue';

import DailyTable from '@/components/groups/DailyTable.vue';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';

import { dataMethods, dataStates } from '@/stores/data';
import { datepickerStates } from '@/stores/datepicker';

import { formatDate } from '@/utils/date';
import { formatNumber } from '@/utils/number';

// STORE
const { data, loading } = dataStates;
const { fetchData } = dataMethods;
const { date, datestring } = datepickerStates;

// STATE
const openDrawer = ref(false);
const drawerDatestring = ref("");
const drawerEntries = ref([]);

// METHODS
const onOpenDrawer = (targetDatestring: string | undefined) => {
  drawerDatestring.value = targetDatestring;
  drawerEntries.value = data.value.daily.find(item => item.datestring === targetDatestring)?.entries || [];
  openDrawer.value = true;
};
const onCloseDrawer = () => {
  drawerDatestring.value = "";
  drawerEntries.value = [];
  openDrawer.value = false;
};

// LIFECYCLE
onBeforeMount(() => {
  fetchData(datestring.value);
});

</script>

<template>
  <DashboardLayout id="CalendarPage" :income="data.summary.income" :expense="data.summary.expense" :total="data.summary.total">
    <template #pageContent>
      <Calendar
        :fullscreen="false"
        mode="month"
        :value="date"
        @select="(value) => {
          onOpenDrawer(formatDate(new Date(value as any).getTime()));
        }"
      >
        <template #dateCellRender="{ current }">
          <div v-if="!loading">
            <ul v-if="data.daily.find(item => item.datestring === formatDate(new Date(current).getTime()))?.entries?.length" class="calendar-cell-entries">
              <li
                v-for="item in data.daily.find(item => item.datestring === formatDate(new Date(current).getTime()))?.entries || []"
                v-bind:key="`${item?.id}`"
                :class="item.operation !== 'transfer' ? item.operation : 'balance'"
              >
                {{ formatNumber(item.amount) }}
              </li>
            </ul>
          </div>
          <div v-if="loading">
            <Spin />
          </div>
        </template>
      </Calendar>
      <Drawer :open="openDrawer" @close="onCloseDrawer" height="100vh" placement="bottom">
        <DailyTable :datestring="drawerDatestring" :entries="drawerEntries"/>
      </Drawer>
    </template>
  </DashboardLayout>
</template>

<style lang="less">
#CalendarPage {
  .ant-picker-calendar {
    .ant-picker-calendar-header {
      display: none;
    }
    .ant-picker-body {
      padding: 0;
    }
    thead {
      th {
        background-color: #666666;
        border-left: 1px solid #FFFFFF;
        color: #FFFFFF;
        font-weight: 700;
      }
      th:nth-child(1) {
        background-color: red;
        border-left: none;
        color: #FFFFFF;
      }
      th:nth-child(7) {
        background-color: green;
        color: #FFFFFF;
      }
    }
    .ant-picker-cell {
      background-color: #BBBBBB;
      border: 1px solid #AAAAAA;
      height: 100px;
      transition: all .3s ease-in-out;
      &.ant-picker-cell-in-view {
        background-color: #FFFFFF;
      }
      .ant-picker-cell-inner::before {
        border: none;
      }
      .ant-picker-calendar-date-value {
        border: none;
      }
      &.ant-picker-cell-selected {
        background-color: #EAEAEA;
        border: 3px solid green;
        .ant-picker-calendar-date-value {
          border: none !important;
          background-color: #EAEAEA;
          color: green;
        }
        &:hover {
          background-color: #EAEAEA;
          .ant-picker-calendar-date-value {
            background-color: #EAEAEA;
          }
        }
      }
      &:hover {
        background-color: lightgreen;
        .ant-picker-calendar-date-value {
          background-color: lightgreen;
        }
      }
      .calendar-cell-entries {
        height: 40px;
        list-style: none;
        margin: 0;
        overflow-y: hidden;
        padding: 0 10px 0 0;
        li {
          font-size: 12px;
        }
      }
    }
  }
}
.ant-drawer-body {
  background-color: #777777 !important;
  .ant-table {
    border-radius: 0;
    .anticon-plus-circle {
      color: green;
      transform: scale(2);
      transition: all .2s ease-in-out;
      &:hover {
        opacity: 0.7;
      }
    }
    .ant-table-thead {
      display: none;
    }
  }
}
</style>