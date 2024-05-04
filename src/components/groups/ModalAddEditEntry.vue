<script setup lang="ts">
import { AutoComplete, DatePicker, InputNumber, Modal, Segmented, TimePicker } from 'ant-design-vue';
import dayjs from 'dayjs';

import { addEditEntryMethods, addEditEntryStates } from '@/stores/add-edit-entry';
import { entryOptionsStates } from '@/stores/entry-options';
import { userStates } from '@/stores/user';

import { filterOptionOnSearch } from '@/utils/string';

// STORE
const { open, entry } = addEditEntryStates;
const { onAddEditEntry, closeModalAddEditEntry } = addEditEntryMethods;
const { assets, incomeCategories, expenseCategories, notes } = entryOptionsStates;
const { currency } = userStates;
</script>

<template>
  <Modal :open="open" @cancel="closeModalAddEditEntry" @ok="onAddEditEntry" wrapClassName="modal-add-edit-entry-wrapper">
    <div v-if="open">
      <div style="margin-bottom: 10px; text-align: center">
        <Segmented
          class="operation-segmented"
          @change="(value) => { entry.operation = (value as string) }"
          :value="entry.operation"
          :options="['income', 'expense', 'transfer'].map(v => ({ value: v, label: v }))"
        />
      </div>
      <table>
        <tr>
          <td>Date-Time </td>
          <td>
            <DatePicker
              @change="(date, datestring) => entry.date = dayjs(new Date(date as any))"
              :value="entry.date"
              format="DD MMM YYYY"
            />&nbsp;
            <TimePicker
              @change="(time, timestring) => entry.time = dayjs(new Date(time as any), 'HH:mm:ss')"
              :value="entry.time"
              format="HH:mm:ss"
            />
          </td>
        </tr>
        <tr>
          <td>Amount </td>
          <td>
            <InputNumber
              @change="(value) => { entry.amount = (value as number) }"
              :value="entry.amount"
              :prefix="currency"
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\$\s?|(,*)/g, '')"
              class="fw-input"
            />
          </td>
        </tr>
        <tr v-if="entry.operation !== 'income'">
          <td>Source </td>
          <td>
            <AutoComplete
              @change="(value) => { entry.source = (value as string) }"
              :value="entry.source"
              :options="(assets.map(e => ({ label: e, value: e })).filter(el => filterOptionOnSearch(el)(entry.source)) as any)"
              class="fw-input"
            />
          </td>
        </tr>
        <tr v-if="entry.operation === 'income'">
          <td>Category</td>
          <td>
            <AutoComplete
              @change="(value) => { entry.category = (value as string) }"
              :value="entry.category"
              :options="(incomeCategories.map(e => ({ label: e, value: e })).filter(el => filterOptionOnSearch(el)(entry.category)) as any)"
              class="fw-input"
            />
          </td>
        </tr>
        <tr v-if="entry.operation === 'expense'">
          <td>Category </td>
          <td>
            <AutoComplete
              @change="(value) => { entry.category = (value as string) }"
              :value="entry.category"
              :options="(expenseCategories.map(e => ({ label: e, value: e })).filter(el => filterOptionOnSearch(el)(entry.category)) as any)"
              class="fw-input"
            />
          </td>
        </tr>
        <tr v-if="entry.operation !== 'expense'">
          <td>Target </td>
          <td>
            <AutoComplete
              @change="(value) => { entry.target = (value as string) }"
              :value="entry.target"
              :options="(assets.map(e => ({ label: e, value: e })).filter(el => filterOptionOnSearch(el)(entry.target)) as any)"
              class="fw-input"
            />
          </td>
        </tr>
        <tr>
          <td>Note </td>
          <td>
            <AutoComplete
              @change="(value) => { entry.note = (value as string) }"
              :value="entry.note"
              :options="(notes.map(e => ({ label: e, value: e })).filter(el => filterOptionOnSearch(el)(entry.note)) as any)"
              class="fw-input"
            />
          </td>
        </tr>
      </table>
    </div>
  </Modal>
</template>

<style lang="less">
.fw-input {
  width: 300px;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
.ant-modal-close {
  @media screen and (max-width: 500px) {
    display: none;
  }
}
.modal-add-edit-entry-wrapper {
  td {
    padding-bottom: 0px;
  }
  .ant-segmented-thumb {
    transition: all .1s ease-in-out;
  }
  .ant-segmented-item:nth-child(1) {
    &.ant-segmented-item-selected {
      color: #FFFFFF;
      background-color: green;
    }
  }
  .ant-segmented-item:nth-child(2) {
    &.ant-segmented-item-selected {
      color: #FFFFFF;
      background-color: red;
    }
  }
  .ant-segmented-item:nth-child(3) {
    &.ant-segmented-item-selected {
      color: #FFFFFF;
      background-color: #666666;
    }
  }
  .ant-input-number-affix-wrapper {
    &:hover {
      border: 1px solid lightgreen;
    }
  }
  .ant-select-selector {
    &:hover {
      border: 1px solid lightgreen !important;
    }
  }
  .ant-btn-default {
    &:hover {
      border: 1px solid red;
      color: red;
    }
  }
  .ant-btn-primary {
    background-color: green !important;
    &:hover {
      opacity: .5;
    }
  }
}
</style>