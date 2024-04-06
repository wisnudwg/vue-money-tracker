<script setup lang="ts">
import { Modal } from 'ant-design-vue';
import DailyDate from '@/components/atoms/DailyDate.vue';

import { deleteEntryMethods, deleteEntryStates } from '@/stores/delete-entry';

import { formatNumber } from '@/utils/number';

// STORE
const { open, entry } = deleteEntryStates;
const { closeModalDeleteEntry, onDeleteEntry } = deleteEntryMethods;

</script>

<template>
  <Modal :open=open @cancel="closeModalDeleteEntry" @ok="onDeleteEntry" wrapClassName="modal-delete-entry-wrapper">
    <p>Are you sure you want to delete this entry?</p>
    <p style="font-size: 16px; font-weight: 600;"><DailyDate :datestring="entry.datestring" /></p>
    <p>
      <span :class="entry.operation !== 'transfer' ? entry.operation : 'balance'">
        {{ formatNumber(entry.amount) }}
      </span>&nbsp;&nbsp;
      <span>
        {{ entry.note }}
      </span>&nbsp;&nbsp;
      <span style="font-size: 12px; color: #888888">
        ({{ entry.source }})
      </span>
    </p>
  </Modal>
</template>

<style lang="less">
.modal-delete-entry-wrapper {
  .ant-btn-default {
    &:hover {
      border: 1px solid green;
      color: green;
    }
  }
  .ant-btn-primary {
    background-color: red !important;
    color: #FFFFFF;
    &:hover {
      opacity: .5;
    }
  }
}
</style>