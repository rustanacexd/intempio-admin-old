<template>
  <event-detail :is-edit='true' :event-id="this.$route.params.eventId"></event-detail>
</template>

<script>
  import EventDetail from './components/EventDetail'

  export default {
    components: { EventDetail }
  }
</script>

