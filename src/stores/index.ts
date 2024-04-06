import {
  createPinia,
  defineStore as _defineStore,
  storeToRefs as _storeToRefs,
} from "pinia";

export const piniaInstance = createPinia();
export const defineStore = _defineStore;
export const storeToRefs = _storeToRefs; 