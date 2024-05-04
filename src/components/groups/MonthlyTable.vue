<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';
import { Col, Empty, Row, Table } from 'ant-design-vue';

import DailyTable from '@/components/groups/DailyTable.vue';

import type { Entries } from '@/types';

import { formatNumber } from '@/utils/number';

// STORE

// PROPS
interface Props {
  datestring: string,
  entries: Entries,
}
const props = withDefaults(defineProps<Props>(), {
  datestring: '',
  entries: () => [],
});

// FROM PROPS
const data = computed(() => {
  const summary = { income: 0, expense: 0 };
  const numOfWeeks = props.datestring.includes('Feb') && Number(props.datestring.split(' ')[1])%4 !== 0 ? 4 : 5;
  const rows = new Array(numOfWeeks).fill(0).map((n, i) => ({ key: `${i}`,week: `week ${i+1}`, income: 0, expense: 0 }));
  const forDailyTable = new Array(numOfWeeks).fill([]);

  const ops = ['income', 'expense'];
  for (let i=0; i<props.entries.length; i+=1) {
    const entry = props.entries[i];
    const rowIndex = Math.floor((new Date(entry.datestring).getDate()-1)/7);
    for (let j=0; j<ops.length; j+=1) {
      const operation = ops[j];
      const increment = [0, ...entry.entries.filter(item => item.operation === operation).map(item => item.amount)].reduce((s,t) => s+t);
      summary[operation] += increment;
      rows[rowIndex][operation] += increment;
    };
  };

  return { summary, rows, forDailyTable };
});
</script>

<template>
  <Table
    bordered
    class="monthly-table"
    :columns="['week','income','expense'].map(col => ({ key: col, dataIndex: col, title: col, width: '200px' }))"
    :data-source="data.rows"
    :pagination="false"
  >
    <template #title>
      <Row :gutter="[16, 16]">
        <Col :flex="1">
          <span></span>
          <span style="font-size: 16px; font-weight: 600">{{ props.datestring }}</span>
        </Col>
        <Col :flex="1" class="income">
          <span></span>
          <span class="total">{{ formatNumber(data.summary.income) }}</span>
        </Col>
        <Col :flex="1" class="expense">
          <span></span>
          <span class="total">{{ formatNumber(data.summary.expense) }}</span>
        </Col>
      </Row>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'week'">
        <span class="week-indicator">{{ record.week }}</span>
      </template>
      <template v-if="column.key === 'income'">
        <span class="income">{{ formatNumber(record.income) }}</span>
      </template>
      <template v-if="column.key === 'expense'">
        <span class="expense">{{ formatNumber(record.expense) }}</span>
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <template v-if="props.entries.filter(item => Math.floor((new Date(item.datestring).getDate()-1)/7) === Number(record.key)).length > 0">
        <template
          v-for="lv1 in props.entries.filter(item => Math.floor((new Date(item.datestring).getDate()-1)/7) === Number(record.key))"
          v-bind:key="lv1.datestring"
        >
          <DailyTable :datestring="lv1.datestring" :entries="lv1.entries" />
        </template>
      </template>
      <template v-if="props.entries.filter(item => Math.floor((new Date(item.datestring).getDate()-1)/7) === Number(record.key)).length === 0">
        <Empty />
      </template>
    </template>
  </Table>
</template>

<style lang="less">
.monthly-table {
  .ant-table {
    border-radius: 0;
  }
  .ant-table-title {
    background-color: #EAEAEA;
    border-radius: 0;
    .ant-col {
      text-align: center;
      span:nth-child(1) {
        font-size: 12px;
      }
    }
  }
  .ant-table-thead {
    display: none;
  }
  .ant-table-tbody {
    .week-indicator {
      font-size: 16px;
      font-weight: 600;
    }
    .ant-table-row-expand-icon {
      float: right;
      transform: scale(1.3);
    }
    .ant-table-row-expand-icon-collapsed {
      border: 1px solid green;
      color: green;
    }
    .ant-table-row-expand-icon-expanded {
      background-color: green;
      color: white;
    }
    .ant-table-expanded-row {
      .ant-table-bordered {
        margin-block: 1px !important;
        margin-inline: 3px !important;
      }
    }
    .ant-table-expanded-row > .ant-table-cell{
      background-color: lightgreen;
      padding: 25px 50px;
      @media screen and (max-width: 500px) {
        padding: 10px 0;
      }
    }
  }
}
</style>