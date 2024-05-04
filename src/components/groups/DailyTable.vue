<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { Col, Row, Table } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons-vue';

import DailyDate from '@/components/atoms/DailyDate.vue';
import ModalAddEditEntry from '@/components/groups/ModalAddEditEntry.vue';
import ModalDeleteEntry from '@/components/groups/ModalDeleteEntry.vue';

import { addEditEntryMethods } from '@/stores/add-edit-entry';
import { deleteEntryMethods } from '@/stores/delete-entry';

import type { EntryPayload } from '@/types';

import { formatTime } from '@/utils/date';
import { fromPartialEntry } from '@/utils/entry';
import { formatNumber } from '@/utils/number';

// STORE
const { openModalAddEditEntry } = addEditEntryMethods;
const { openModalDeleteEntry } = deleteEntryMethods;

// PROPS
interface Props {
  datestring: string,
  entries: EntryPayload[],
}
const props = withDefaults(defineProps<Props>(), {
  datestring: '',
  entries: () => [],
});
</script>

<template>
  <Table
    bordered
    class="daily-table"
    :columns="['a','b','c','d'].map(col => ({ key: col, dataIndex: col, title: col, width: '200px' }))"
    :data-source="props.entries"
    :pagination="false"
  >
    <template #title>
      <Row :gutter="[16, 16]">
        <Col :flex="1">
          <span></span>
          <span><DailyDate :datestring="props.datestring" /></span>
        </Col>
        <Col :flex="1" class="income">
          <span></span>
          <span class="total">{{ formatNumber([0, ...props.entries.filter(item => item.operation === 'income').map(item => item.amount)].reduce((s,t) => s+t)) }}</span>
        </Col>
        <Col :flex="1" class="expense">
          <span></span>
          <span class="total">{{ formatNumber([0, ...props.entries.filter(item => item.operation === 'expense').map(item => item.amount)].reduce((s,t) => s+t)) }}</span>
        </Col>
        <Col :flex="1">
            <PlusCircleOutlined @click="() => openModalAddEditEntry(fromPartialEntry({ timestamp: new Date(`${props.datestring} ${formatTime(new Date().getTime())}`).getTime() }))" />
        </Col>
      </Row>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'a'">
        <span v-if="record.operation === 'expense'" class="record-category">
        {{ record.category }}</span>
        <span v-if="record.operation === 'income'" class="record-category">
          to : <span style="font-weight: 600">{{ record.target }}</span>
        </span>
        <span v-if="record.operation === 'transfer'" class="record-category" style="font-weight: 600">
          {{ record.source }} => {{ record.target }}
        </span>
      </template>
      <template v-if="column.key === 'b'">
        <span class="record-note">{{ record.note }}</span><br />
        <span class="record-source">
          {{ record.operation === 'transfer' ? 'transfer' : record.source }}
        </span>
      </template>
      <template v-if="column.key === 'c'">
        <div style="text-align: right">
          <span
            class="record-amount"
            :class="record.operation !== 'transfer' ? record.operation : 'balance'"
            :style="{ ...(record.operation === 'transfer' && { fontWeight: 600 }) }"
          >
            {{ formatNumber(record.amount) }}
          </span>
        </div>
      </template>
      <template v-if="column.key === 'd'">
        <div class="actions">
          <EditOutlined @click="() => openModalAddEditEntry(fromPartialEntry(record))" />
          &nbsp;&nbsp;&nbsp;
          <DeleteOutlined @click="() => openModalDeleteEntry(fromPartialEntry(record))"/>
        </div>
      </template>
    </template>
  </Table>
  <ModalAddEditEntry />
  <ModalDeleteEntry />
</template>

<style lang="less">
.daily-table {
  border-radius: 0;
  .ant-table {
    border-radius: 0 !important;
  }
  .ant-table-title {
    background-color: #EAEAEA;
    border-radius: 0 !important;
    .ant-col {
      text-align: center;
      span:nth-child(1) {
        font-size: 12px;
      }
      .anticon-plus-circle {
        color: green;
        cursor: pointer;
        transform: scale(2.2);
        transition: all .2s ease-in-out;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
  .ant-table-thead {
    display: none;
  }
  .ant-table-tbody {
    .record-source {
      color: #666666;
      font-size: 12px;
    }
    .actions {
      @media screen and (min-width: 501px) {
        text-align: center;
      }
      @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .anticon-edit {
        color: blue;
        transform: scale(1.4);
        transition: all .2s ease-in-out;
        &:hover {
          opacity: .5;
        }
      }
      .anticon-delete {
        color: red;
        transform: scale(1.4);
        transition: all .2s ease-in-out;
        &:hover {
          opacity: .5;
        }
      }
    }
  }
}
</style>