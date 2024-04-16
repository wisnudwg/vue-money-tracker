import { ref } from 'vue';
import { notification } from 'ant-design-vue';
import axios from 'axios';

import { defineStore, storeToRefs, piniaInstance } from './';

import { EP } from '@/constants/env';

import router from '@/router';

import type { User, UserLogin } from '@/types';

notification.config({ duration: 5 })

const storeName = 'user';
const useStore = defineStore(storeName, () => {
  const token = ref(localStorage.getItem("Authorization") || '');
  const id = ref(localStorage.getItem("id") || 0);
  const name = ref(localStorage.getItem("name") || '');
  const phone = ref(localStorage.getItem("phone") || '');
  const email = ref(localStorage.getItem("email") || '');
  const password = ref(localStorage.getItem("password") || '');
  const currency = ref(localStorage.getItem("currency") || '');

  const loginLoading = ref(false);
  const registerLoading = ref(false);

  async function login(formValues: UserLogin) {
    loginLoading.value = true;
    axios.post(`${EP}login`, formValues, { headers: {} })
      .then((res) => {
        token.value = res.data.token; localStorage.setItem("Authorization", res.data.token);
        id.value = res.data.user.id; localStorage.setItem("id", res.data.user.id);
        name.value = res.data.user.name; localStorage.setItem("name", res.data.user.name);
        phone.value = res.data.user.phone; localStorage.setItem("phone", res.data.user.phone);
        email.value = formValues.email; localStorage.setItem("email", formValues.email);
        password.value = formValues.password; localStorage.setItem("password", formValues.password);
        currency.value = 'Rp.'; localStorage.setItem("currency", 'Rp.');

        setTimeout(() => {
          loginLoading.value = false;
          router.push({ path: '/daily' });
        }, 500)
      })
      .catch((err) => {
        loginLoading.value = false;
        notification.error({
          message: err.response.data.error.Number || 'Error',
          description: err.response.data.error.Message || err.response.data.error,
        })
      })
  };
  async function register(formValues: User) {
    registerLoading.value = true;
    axios.post(`${EP}register`, formValues, { headers: {} })
      .then(() => {
        notification.success({
          message: 'Registration Success!',
          description: 'You can now login',
        })
        registerLoading.value = false;
        router.push({ path: '/login' });
      })
      .catch((err) => {
        registerLoading.value = false;
        notification.error({
          message: err.response.data.error.Number || 'Error',
          description: err.response.data.error.Message || err.response.data.error,
        })
      })
  };
  async function updateUser(formValues: User) {
    axios.put(`${EP}update-user`, formValues , { headers: { "Authorization": token.value, "Uid": id.value } })
      .then(() => {
        name.value = formValues.name;
        phone.value = formValues.phone;
        email.value = formValues.email;
        password.value = formValues.password;
        notification.success({
          message: 'Update Success!',
          description: 'User data has been updated'
        })
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.error.Number || 'Error',
          description: err.response.data.error.Message || err.response.data.error,
        })
      })
  };

  return {
    token,
    id,
    name,
    phone,
    email,
    password,
    currency,

    loginLoading,
    registerLoading,

    register,
    login,
    updateUser,
  };
});
export const userMethods = useStore(piniaInstance);
export const userStates = storeToRefs(userMethods);