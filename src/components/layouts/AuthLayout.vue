<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { Layout } from 'ant-design-vue';

const { Content } = Layout;

// PROPS
interface Props {
  id: string,
};
const props = withDefaults(defineProps<Props>(), {
  id: '',
});
</script>

<template>
  <Layout id="AuthLayout">
    <Content id="Content">
      <div :id="props.id">
        <slot name="pageContent"></slot>
      </div>
    </Content>
  </Layout>
</template>

<style lang="less">
#AuthLayout {
  #Content {
    // background-color: lightgreen;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .btn {
      font-size: 16px;
      width: 100%;
    }
  }
}
</style>