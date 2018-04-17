<template>
  <event-form :is-edit='true' :event-id="this.$route.params.eventId"></event-form>
</template>

<script>
  import EventForm from './components/EventForm'

  export default {
    components: { EventForm }
  }
</script>

