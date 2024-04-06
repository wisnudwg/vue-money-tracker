import 'ant-design-vue/dist/reset.css';
import './assets/main.css'

import { createApp } from 'vue'
import { piniaInstance } from './stores'

import Antd from 'ant-design-vue'
import dayjs from 'dayjs'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$dayjs = dayjs
app.use(Antd)
app.use(piniaInstance)
app.use(router)

app.mount('#app')
