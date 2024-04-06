<script setup lang="ts">
import { defineProps, onBeforeMount, withDefaults } from 'vue';
import { Col, FloatButton, Layout, Row } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

import DatePicker from '@/components/atoms/DatePicker.vue';
import ModalAddEditEntry from '../groups/ModalAddEditEntry.vue';
import RangePicker from '@/components/atoms/RangePicker.vue';
import ProfileMenuIcon from '@/components/atoms/ProfileMenuIcon.vue';

import initvals from '@/initvals';

import router from '@/router';

import { addEditEntryMethods } from '@/stores/add-edit-entry';
import { datepickerMethods, datepickerStates } from '@/stores/datepicker';
import { entryOptionsMethods } from '@/stores/entry-options';
import { rangepickerMethods, rangepickerStates } from '@/stores/rangepicker';
import { userStates } from '@/stores/user';
import LS from '@/stores/LOCALSTORAGE';

import { formatNumber } from '@/utils/number';
import { upperCaseFirstLetter } from '@/utils/string';

const { Header, Content } = Layout;

// STORE
const { openModalAddEditEntry } = addEditEntryMethods;
const { date: dpDate, format: dpFormat } = datepickerStates;
const { changeDate, changeFormat: changeDpFormat } = datepickerMethods;
const { getAssets, getExpenseCategories, getIncomeCategories, getNotes } = entryOptionsMethods;
const { dates: rpDates, format: rpFormat } = rangepickerStates;
const { changeRange, changeFormat: changeRpFormat } = rangepickerMethods;
const { name } = userStates;

// PROPS
interface Props {
  id?: number | string,
  income?: number,
  expense?: number,
  total?: number,
}
const props = withDefaults(defineProps<Props>(), {
  id: '',
  income: 0,
  expense: 0,
  total: 0,
});

// CONSTANTS
const dashboardNav = ['daily', 'calendar', 'annual', 'chart'].map(nav => ({ value: nav, label: upperCaseFirstLetter(nav) }));
const navigate = (slug: string) => {
  if (['annual'].includes(slug)) changeDpFormat('year');
  if (['daily', 'calendar'].includes(slug)) changeDpFormat('month');
  localStorage.setItem(LS.LOCATION, slug);
  router.push({ path: `/${slug}` });
};

// METHODS
onBeforeMount(() => {
  getAssets();
  getExpenseCategories();
  getIncomeCategories();
  getNotes();
});
</script>

<template>
  <Layout :id="props.id">
    <Header id="Header">
      <Row :gutter="[16, 16]" :align="'middle'">
        <Col :flex="1" v-if="router.currentRoute.value.name !== 'chart'">
          <DatePicker :allowFormatChange="false" :defaultValue="dpDate" :format="(dpFormat as any)" @change="changeDate" @changeFormat="changeDpFormat" />
        </Col>
        <Col :flex="1" v-if="router.currentRoute.value.name === 'chart'">
          <RangePicker :allowFormatChange="true" :defaultValues="(rpDates as any)" :format="(rpFormat as any)" @change="changeRange" @changeFormat="changeRpFormat" />
        </Col>
        <Col :flex="1" style="text-align: right;">
          <span style="color: #FFFFFF; font-size: 16px; font-weight: 600;">{{ name }}</span>&nbsp;&nbsp;
          <span><ProfileMenuIcon /></span>
        </Col>
      </Row>
    </Header>
    <Layout>
      <Header id="Subheader">
        <Row :gutter="[16, 16]" :align="'middle'">
          <Col v-for="nav in dashboardNav" :flex="1" v-bind:key="nav.value">
            <span
              @click="() => navigate(nav.value)"
              class="dashboard-nav"
              :class="router.currentRoute.value.name === nav.value ? 'active' : ''"
            >{{ nav.label }}</span>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Header id="PageHeader">
          <Row :gutter="[16, 16]">
            <Col :flex="1" class="income">
              Income : <span class="total">{{ formatNumber(props.income) }}</span>
            </Col>
            <Col :flex="1" class="expense">
              Expense : <span class="total">{{ formatNumber(props.expense) }}</span>
            </Col>
            <Col :flex="1" class="balance">
              Total : <span class="total">{{ formatNumber(props.total) }}</span>
            </Col>
          </Row>
        </Header>
        <Content id="Content">
          <slot name="pageContent"></slot>
          <FloatButton
            id="AddEntryFloatBtn"
            @click="() => openModalAddEditEntry({ ...initvals.entry })"
            kontol="['daily', 'calendar'].includes(router.currentRoute.value.name)"
          >
            <template #icon><PlusOutlined /></template>
          </FloatButton>
          <ModalAddEditEntry />
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>

<style lang="less">
#Header {
  background-color: green;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  
}
#Subheader {
  background-color: lightgray;
  width: 100%;
  .ant-col {
    text-align: center;
    .dashboard-nav {
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      transition: all .2s ease-in-out;
      &:hover {
        opacity: .5;
      }
      &.active {
        color: green;
      }
    }
  }
}
#PageHeader {
  background-color: #FFFFFF;
  width: 100%;
  .ant-col {
    text-align: center;
  }
}
#Content {
  background-color: #333333;
  height: 74vh;
  overflow-y: scroll;
  #AddEntryFloatBtn {
    transform: scale(1.5) translateX(-3vw) translateY(-2vh);
    transition: all .2s ease-in-out;
    &:hover {
      opacity: .5;
    }
    .ant-float-btn-body {
      background-color: lightgreen !important;
      border: 3px solid green;
      .ant-float-btn-icon {
        color: green;
      }
    }
  }
}
</style>