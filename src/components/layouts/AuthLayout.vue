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
  background-color: transparent;
  #Content {
    // padding: 25vh 25vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* background-color: transparent;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    left: 25vw;
    right: 25vw;
    top: 25vh;
    bottom: 0;
    margin: auto;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%); */
    @media screen and (max-width: 400px) {
      padding: 5vh 5vw;
    }
    .btn {
      font-size: 16px;
      width: 100%;
    }
  }
}
</style>