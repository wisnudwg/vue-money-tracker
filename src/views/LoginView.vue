<script setup lang="ts">
import { reactive } from 'vue';
import { Button, Checkbox, Form, Input, Spin } from 'ant-design-vue';

import AuthLayout from '@/components/layouts/AuthLayout.vue';

import router from '@/router';

import { userMethods, userStates } from '@/stores/user';

import type { UserLogin } from '@/types';

const { Item: FormItem } = Form;
const { Password: InputPassword } = Input;

// STORE
const { login } = userMethods;
const { loginLoading } = userStates;

interface FormState {
  email: string,
  password: string,
  remember: boolean,
};
const formState = reactive<FormState>({
  email: '',
  password: '',
  remember: true,
});
const onFinish = (values: UserLogin) => {
  login(values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
};
const gotoRegister = () => {
  router.push({ path: 'register' });
};
</script>

<template>
  <AuthLayout id="LoginPage">
    <template #pageContent>
      <Form
        :model="formState"
        name="LoginForm"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
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
          name="remember"
          :wrapper-col="{ offset: 0, span: 16 }"
        >
          <Checkbox v-model:checked="formState.remember">Remember Me</Checkbox>
        </FormItem>
        <br />
        <FormItem
          :wrapper-col="{ offset: 0, span: 24 }"
        >
          <Button id="LoginBtn" type="primary" html-type="submit" :disabled="loginLoading"><Spin :hidden="!loginLoading" /> Login</Button>
        </FormItem>
      </Form>
      <p class="auth-footer-p">
        Don&apos;t have an account yet? <span class="actionable-span" @click="gotoRegister">Register Here</span>
      </p>
    </template>
  </AuthLayout>
</template>

<style lang="less">
#LoginPage {
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
  #LoginBtn {
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
    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }
}
</style>