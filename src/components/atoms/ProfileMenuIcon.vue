<script setup lang="ts">
import { Popover } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';

import router from '@/router';

// METHODS
const logout = () => {
  router.push({ path: '/login' });
  localStorage.clear();
};
const gotoProfile = () => {
  router.push({ path: '/profile' });
};
</script>

<template>
  <div class="profile-menu-container">
    <Popover trigger="click" placement="bottomRight" overlayClassName="profile-menu-content">
      <template #content>
        <ul>
          <li @click="gotoProfile">Profile</li>
          <li @click="logout">Logout</li>
        </ul>
      </template>
      <UserOutlined />
    </Popover>
  </div>
</template>

<style lang="less">
.profile-menu-container {
  border: 3px solid lightgreen;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  text-align: center;
  height: 50px;
  width: 50px;
  transform: scale(0.7);
  transition: all .2s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
  .anticon-user {
    color: lightgreen;
    transform: scale(2.6) translateY(-2px);
  }
}
.profile-menu-content {
  .ant-popover-inner {
    padding: 5px 10px !important;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        cursor: pointer;
        margin-bottom: 10px;
        transition: all .2s ease-in-out;
        &:hover {
          opacity: .5;
        }
      }
      li:nth-child(1) {
        color: orange;
        margin-top: 5px;
      }
      li:nth-child(2) {
        color: green;
      }
    }
  }
}
</style>