<template>
  <project-form :is-edit='true' :project-code="this.$route.params.projectCode"></project-form>
</template>

<script>
  import ProjectForm from './components/ProjectForm'

  export default {
    components: { ProjectForm }
  }
</script>

<style scoped>

</style>
