<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from '@/views/login/cpns/login-panel.vue'

export default defineComponent({
  name: 'login',
  components: {
    loginPanel
  }
})
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
