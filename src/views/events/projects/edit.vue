<template>
  <project-form :is-edit='true' :id="this.$route.params.id"></project-form>
</template>

<script>
  import ProjectForm from './components/ProjectForm'

  export default {
    components: { ProjectForm }
  }
</script>

<style scoped>

</style>
