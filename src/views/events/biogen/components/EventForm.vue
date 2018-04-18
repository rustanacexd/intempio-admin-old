<template>
  <div class="form-container">
    <div class="form-main-container">
      <el-form ref="form" :model="eventObj" :rules="rules" size="small" class="form-container"
               v-loading.fullscreen.lock="loading" label-position="top">
        <el-tabs tab-position="left" value="internal">
          <el-tab-pane label="Event">
            <event-form-fields :form="eventObj"/>
          </el-tab-pane>

          <el-tab-pane label="Internal" name="internal">
            <h4>Project Info</h4>
            <event-project :form="eventObj.project"/>
            <h4>Contacts</h4>
            <event-contacts :form="eventObj.contacts"/>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="page-component-up">
          <el-button type="primary " @click="handleUpdate" icon="el-icon-upload2" size="large" v-if="isEdit">
            Update Event
          </el-button>
          <el-button type="primary " @click="handleCreate" icon="el-icon-upload2" size="large" v-else>
            Create Event
          </el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
  import { createEvent, fetchEvent, updateEvent } from '@/api/biogenEvent'
  import EventFormFields from './EventFormFields'
  import EventProject from '../../common/components/EventProject'
  import EventContacts from '../../common/components/EventContacts'

  const defaultEventObj = {
    name: '',
    phone: '',
    email: '',
    requestor_name: '',
    date: '',
    time: '',
    period: '',
    timezone: 'EST',
    duration: '',
    presenters: [],
    participants_count: 10,
    presenters_count: 1,
    program_meeting_id: '',
    notes: '',
    eod_webcast: '',
    ms_sma: '',
    slide_deck_name: '',
    slide_deck_id: '',
    project: {
      project_code: '',
      client: '',
      fulfilled_by: '',
      sow_status: '',
      invite_sent_by: '',
      invite_type: '',
      invoice_sheet: '',
      run_sheet: false,
      reporting: false,
      notes: ''
    },
    contacts: []
  }

  export default {
    name: 'biogenEventDetail',
    components: { EventFormFields, EventProject, EventContacts },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      eventId: String
    },
    data() {
      const requiredValidator = {
        required: true,
        message: 'This field is required.',
        trigger: 'change'
      }

      const emailValidator = {
        type: 'email',
        message: 'Please input correct email address',
        trigger: 'change'
      }

      const checkDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('This field is required'))
        }
        setTimeout(() => {
          if (new Date(Date.parse(value)).getDate() < new Date().getDate()) {
            callback(new Error("Can't enter past dates."))
          } else {
            callback()
          }
        }, 0)
      }
      return {
        eventObj: Object.assign({}, defaultEventObj),
        loading: false,
        rules: {
          requestor_name: [requiredValidator],
          phone: [requiredValidator],
          email: [requiredValidator, emailValidator],
          name: [requiredValidator],
          date: [{ validator: checkDate, trigger: 'blur' }],
          time: [requiredValidator],
          period: [requiredValidator],
          duration: [requiredValidator],
          ms_sma: [requiredValidator],
          eod_webcast: [requiredValidator],
          slide_deck_id: [requiredValidator]
        }
      }
    },
    created() {
      if (this.isEdit) {
        this.getEvent()
      } else {
        this.eventObj = Object.assign({}, defaultEventObj)
      }
    },

    methods: {
      getEvent() {
        fetchEvent(this.eventId).then(data => {
          this.eventObj = data
          if (this.eventObj.project == null) this.eventObj.project = Object.assign({}, defaultEventObj.project)
          if (this.eventObj.presenters == null) this.eventObj.presenters = []
        })
      },
      handleUpdate() {
        this.$refs.form.validate(success => {
          if (success) {
            this.loading = true
            updateEvent(this.eventId, this.eventObj)
              .then(() => {
                this.loading = false
                this.notifySuccess('Successfully updated event')
              })
          } else {
            this.notifyError()
          }
        })
      },
      handleCreate() {
        this.$refs.form.validate(success => {
          if (success) {
            this.loading = true
            createEvent(this.eventObj)
              .then(() => {
                this.loading = false
                this.resetForm()
                this.notifySuccess('Successfully created event')
              })
          } else {
            this.notifyError()
          }
        })
      },
      resetForm() {
        this.$refs.form.resetFields()
      },
      notifyError() {
        this.$notify({
          title: 'Error',
          message: 'Some required fields are missing.',
          type: 'error',
          duration: 3000
        })
      },
      notifySuccess(notificationText) {
        this.$notify({
          title: 'Success',
          message: notificationText,
          type: 'success',
          duration: 3000
        })
      }
    }
  }
</script>
