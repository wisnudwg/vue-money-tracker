<script setup lang="ts">
import { reactive } from 'vue';
import { Button as AButton, Form, Input, Layout, notification } from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';

import router from '@/router';

import { userStates, userMethods } from '@/stores/user';

import type { User } from '@/types';

const { Item: FormItem } = Form;
const { Password: InputPassword } = Input;
const { Content, Header } = Layout;
const { error: NotifError } = notification;

// STORE
const { id, name, phone, email, password, currency } = userStates;
const { updateUser } = userMethods;

// STATE
interface FormState {
  name: string,
  phone: string,
  email: string,
  password: string,
  confirm_password: string,
  currency: string,
};
const formState = reactive<FormState>({
  name: name.value,
  phone: phone.value,
  email: email.value,
  password: password.value,
  confirm_password: password.value,
  currency: currency.value,
});

// METHODS
const onFinish = (values: User) => {
  if (values.password !== values.confirm_password) {
    NotifError({ message: 'Error', description: 'Passwords do not match' });
  } else {
    updateUser({ ...values, id: id.value });
  };
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
};
const onBackLink = () => {
  router.back();
};

</script>

<template>
  <Layout id="ProfilePage">
    <Header id="ProfilePageHeader">
      <span id="BackLink" @click="onBackLink"><LeftOutlined /> Back</span>
    </Header>
    <Content id="ProfilePageContent">
      <div id="ProfileFormContainer">
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
          <FormItem
            label="Currency"
            name="currency"
            :rules="[{ required: true, message: 'Please input a currency value' }]"
          >
            <Input v-model:value="formState.currency" />
          </FormItem>
          <br />
          <FormItem
            :wrapper-col="{ offset: 0, span: 24 }"
          >
            <AButton id="UpdateBtn" type="primary" html-type="submit">Update Profile</AButton>
          </FormItem>
        </Form>
        <AButton id="BackToDashboardBtn" type="primary" @click="onBackLink">back to dashboard</AButton>
      </div>
    </Content>
  </Layout>
</template>

<style lang="less">
#ProfilePage {
  #ProfilePageHeader {
    background-color: green;
    #BackLink {
      color: #FFFFFF;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s ease-in-out;
      &:hover {
        opacity: .5;
      }
    }
  }
  #ProfileFormContainer {
    background-color: lightgreen;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    #UpdateBtn {
      background-color: green;
      color: white;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 2px;
      width: 100%;
      transition: all .2s ease-in-out;
      &:hover {
        opacity: .5;
      }
    }
    #BackToDashboardBtn {
      float: right;
      font-size: 18px;
      font-weight: 700;
      background-color: green;
      color: white;
      &:hover {
        opacity: .5;
      }
    }
    width: 50vw;
  }
}
</style>