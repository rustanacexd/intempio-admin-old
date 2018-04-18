<template>
  <div class="form-container">
    <div class="form-main-container">
      <el-form ref="form" :model="form" :rules="rules" size="small" class="form-container"
               v-loading.fullscreen.lock="loading" label-position="top">
        <el-tabs tab-position="left">
          <el-tab-pane label="Event">
            <event-form-fields :form="form"/>
          </el-tab-pane>

          <el-tab-pane label="Project">
            <event-project-fields :form="form.project"/>
          </el-tab-pane>
          <el-tab-pane label="Contact(s)">Contact(s)</el-tab-pane>
        </el-tabs>
        <el-form-item class="page-component-up">
          <el-button type="primary " @click="submitForm" icon="el-icon-upload2" size="large">
            {{ isEdit ? 'Update' : 'Submit'}} Event
          </el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
  import { createEvent, fetchEvent, updateEvent, fetchOptions } from '@/api/biogenEvent'
  import EventFormFields from './EventFormFields'
  import EventProjectFields from './EventProjectFields'

  const defaultForm = {
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
    }
  }

  export default {
    name: 'biogenEventDetail',
    components: { EventFormFields, EventProjectFields },
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
        form: Object.assign({}, defaultForm),
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
        this.form = Object.assign({}, defaultForm)
      }
    },
    methods: {
      getEvent() {
        fetchEvent(this.eventId).then(data => {
          this.form = data
          if (this.form.presenters == null) this.form.presenters = []
        })
      },
      submitForm() {
        this.$refs.form.validate(success => {
          if (success) {
            this.loading = true
            const promise = this.isEdit ? updateEvent(this.eventId, this.form) : createEvent(this.form)
            const notificationText = this.isEdit ? 'updated' : 'submitted'

            promise.then(() => {
              this.loading = false
              this.$notify({
                title: 'Success',
                message: `Successfully ${notificationText} event.`,
                type: 'success',
                duration: 3000
              })
              if (!this.isEdit) this.resetForm()
            })
          } else {
            this.$notify({
              title: 'Error',
              message: 'Some required fields are missing.',
              type: 'error',
              duration: 3000
            })
          }
        })
      },
      resetForm() {
        this.$refs.form.resetFields()
      }
    }
  }
</script>
