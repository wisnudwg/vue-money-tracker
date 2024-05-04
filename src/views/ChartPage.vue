<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { Col, Row, Spin } from 'ant-design-vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import DashboardLayout from '@/components/layouts/DashboardLayout.vue';

import { dataStates, dataMethods } from '@/stores/data';
import { entryOptionsStates } from '@/stores/entry-options';
import { rangepickerStates } from '@/stores/rangepicker';

ChartJS.register(ArcElement, Tooltip, Legend);

// STORE
const { data, loading } = dataStates;
const { fetchData } = dataMethods;
const { expenseCategories, incomeCategories } = entryOptionsStates;
const { dates } = rangepickerStates;

onBeforeMount(() => {
  fetchData(dates.value.map(date => new Date(date as any).getTime()));
});
</script>

<template>
  <DashboardLayout id="ChartPage" :income="data.summary.income" :expense="data.summary.expense" :total="data.summary.total">
    <template #pageContent>
      <div @click="() => console.log(data)">
        <Row :gutter="[0,0]" :align="'middle'">
          <Col :flex="1">
            <p class="chart-title income">Income</p>
            <p v-if="loading" class="loading-container"><Spin /></p>
            <Pie
              v-if="!loading"
              class="pie-chart"
              :data="{
                labels: incomeCategories,
                datasets: [{
                  backgroundColor: ['green', 'lightgreen', 'red', 'lightred', 'orange', 'lightorange', 'blue', 'lightblue'],
                  data: data.range.income,
                }],
              }"
              :options="{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    labels: { color: '#FFFFFF' },
                    position: 'left',
                  },
                }
              }"
            />
          </Col>
          <Col :flex="1">
            <p class="chart-title expense">Expense</p>
            <p v-if="loading" class="loading-container"><Spin /></p>
            <Pie
              v-if="!loading"
              class="pie-chart"
              :data="{
                labels: expenseCategories,
                datasets: [{
                  backgroundColor: ['green', 'lightgreen', 'red', 'lightred', 'orange', 'lightorange', 'blue', 'lightblue'],
                  data: data.range.expense,
                }],
              }"
              :options="{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    labels: { color: '#FFFFFF' },
                    position: 'left',
                  },
                }
              }"
            />
          </Col>
        </Row>
      </div>
    </template>
  </DashboardLayout>
</template>

<style lang="less">
#ChartPage {
  .chart-title {
    background-color: #EAEAEA;
    font-size: 16px;
    font-weight: 600;
    padding: 5px 0;
    text-align: center;
  }
  .pie-chart {
    padding: 0px !important;
    @media screen and (min-width: 501px) {
      margin: 0 5vw !important;
      height: 70vh !important;
      width: 70vh !important;
    }
  }
  .loading-container {
    text-align: center;
    line-height: 50vh;
    .ant-spin {
      transform: scale(2);
    }
  }
}
</style>