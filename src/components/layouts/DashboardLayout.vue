<script setup lang="ts">
import { defineProps, onBeforeMount, withDefaults } from 'vue';
import { Col, FloatButton, Image, Layout, Row, Space } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

import logo from '@/assets/money_tracker_logo.svg';

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
      <Space class="left-section-sm" v-if="router.currentRoute.value.name !== 'chart'">
        <DatePicker :allowFormatChange="false" :defaultValue="dpDate" :format="(dpFormat as any)" @change="changeDate" @changeFormat="changeDpFormat" />
      </Space>
      <Space class="left-section-sm" v-if="router.currentRoute.value.name === 'chart'">
        <RangePicker :allowFormatChange="true" :defaultValues="(rpDates as any)" :format="(rpFormat as any)" @change="changeRange" @changeFormat="changeRpFormat" />
      </Space>
      <Space class="left-section-lg" direction="horizontal" size="large" v-if="router.currentRoute.value.name !== 'chart'">
        <Image :src="logo" alt="" :width="40" :preview="false" />
        <DatePicker :allowFormatChange="false" :defaultValue="dpDate" :format="(dpFormat as any)" @change="changeDate" @changeFormat="changeDpFormat" />
      </Space>
      <Space class="left-section-lg" direction="horizontal" size="large" v-if="router.currentRoute.value.name === 'chart'">
        <Image :src="logo" alt="" :width="40" :preview="false" />
        <RangePicker :allowFormatChange="true" :defaultValues="(rpDates as any)" :format="(rpFormat as any)" @change="changeRange" @changeFormat="changeRpFormat" />
      </Space>
      <Space direction="horizontal" size="large">
        <span id="NameInHeader">{{ name }}</span>&nbsp;&nbsp;
        <span><ProfileMenuIcon /></span>
      </Space>
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
              <span class="label">Income : </span><span class="total">{{ formatNumber(props.income) }}</span>
            </Col>
            <Col :flex="1" class="expense">
              <span class="label">Expense : </span><span class="total">{{ formatNumber(props.expense) }}</span>
            </Col>
            <Col :flex="1" class="balance">
              <span class="label">Total : </span><span class="total">{{ formatNumber(props.total) }}</span>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  @media screen and (min-width: 501px) {
    padding: 0 50px;
    .left-section-sm {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    padding: 0 10px;
    .left-section-lg {
      display: none;
    }
  }
  #NameInHeader {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    @media screen and (max-width: 500px) {
      display: none;
    }
  }
}
#Subheader {
  background-color: lightgray;
  width: 100%;
  @media screen and (max-width: 500px) {
    padding: 0 10px;
  }
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
  @media screen and (max-width: 500px) {
    padding: 0 10px;
    .total {
      font-size: 14px;
    }
    .label {
      display: none;
    }
  }
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