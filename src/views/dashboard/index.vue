<template>
  <div class="dashboard-container">
    <div class="dashboard-text">fullname:{{fullname}}</div>
    <div class="dashboard-text">role: {{role}}</div>
    <div class="dashboard-text">username: {{username}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'fullname',
      'role',
      'username',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
