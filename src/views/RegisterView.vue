<script setup lang="ts">
import { reactive } from 'vue';
import { Button, Form, Input, notification } from 'ant-design-vue';

import AuthLayout from '@/components/layouts/AuthLayout.vue';

import router from '@/router';

import { userMethods, userStates } from '@/stores/user';

import type { User } from '@/types';

const { Item: FormItem } = Form;
const { Password: InputPassword } = Input;
const { error: NotifError } = notification;

// STORE
const { register } = userMethods;
const { registerLoading } = userStates;

interface FormState {
  name: string,
  phone: string,
  email: string,
  password: string,
  confirm_password: string,
};
const formState = reactive<FormState>({
  name: '',
  phone: '',
  email: '',
  password: '',
  confirm_password: '',
});
const onFinish = (values: User) => {
  if (values.password !== values.confirm_password) {
    NotifError({ message: 'Error', description: 'Passwords do not match' });
  } else {
    register(values)
  }
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
};
const gotoLogin = () => {
  router.push({ path: 'login' });
};
</script>

<template>
  <AuthLayout id="RegisterPage">
    <template #pageContent>
      <Form
        :model="formState"
        name="RegisterForm"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <FormItem
          label="Name"
          name="name"
          :rules="[{ required: true, message: 'Please input your name' }]"
        >
          <Input v-model:value="formState.name" />
        </FormItem>
        <FormItem
          label="Phone"
          name="phone"
          :rules="[{ required: true, message: 'Please input your phone number' }]"
        >
          <Input prefix="" v-model:value="formState.phone" />
        </FormItem>
        <FormItem
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Please input your email' }]"
        >
          <Input v-model:value="formState.email" />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password' }]"
        >
          <InputPassword v-model:value="formState.password" />
        </FormItem>
        <FormItem
          label="Confirm Password"
          name="confirm_password"
          :rules="[{ required: true, message: 'Please input your re-typed password' }]"
        >
          <InputPassword v-model:value="formState.confirm_password" />
        </FormItem>
        <br />
        <FormItem
          :wrapper-col="{ offset: 0, span: 24 }"
        >
          <Button id="RegisterBtn" type="primary" html-type="submit" :loading="registerLoading">Register</Button>
        </FormItem>
      </Form>
      <p class="auth-footer-p">
        Already have an account? <span class="actionable-span" @click="gotoLogin">Login Here</span>
      </p>
    </template>
  </AuthLayout>
</template>

<style lang="less">
#RegisterPage {
  background-color: white;
  border-radius: 10px;
  padding: 5vh 5vw;
  .ant-input, .ant-input-affix-wrapper {
    .ant-input {
      border: none;
      &:hover {
        border: none;
      }
    }
    &:hover {
      border: 1px solid green;
    }
  }
  .ant-checkbox-inner {
    &:hover {
      border: 1px solid green !important;
    }
  }
  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: green;
      border: 1px solid green;
      &:hover {
        border: 1px solid green;
      }
    }
  }
  #RegisterBtn {
    background-color: green;
    border: 1px solid lightgreen;
    border-radius: 6px;
    color: #FFFFFF;
    cursor: pointer;
    letter-spacing: 2px;
    padding: 5px 0;
    transition: all .2s ease-in-out;
    width: 100%;
    &:hover {
      opacity: .5;
    }
  }
}
</style>