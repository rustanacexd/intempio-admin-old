<template>
  <div class="form-container">
    <div class="form-main-container">
      <el-form ref="form" :model="form" :rules="rules" size="small" class="form-container"
               v-loading.fullscreen.lock="loading">
        <el-tabs tab-position="left">
          <el-tab-pane label="Event">
            <el-row>
              <el-col :span="12">
                <h5 class="form--label">Requestor Info</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="8">
                <el-form-item prop="requestor_name">
                  <el-input v-model="form.requestor_name" placeholder="Requestor Name (required)"/>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item prop="phone">
                  <el-input v-model="form.phone" placeholder="Requestor Phone (required)"/>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item prop="email">
                  <el-input v-model="form.email" placeholder="Requestor Email (required)"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <h5 class="form--label">Event Details</h5>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :lg="10">
                <el-form-item prop="name">
                  <el-input v-model="form.name" placeholder="Event Name (required)"/>
                </el-form-item>
              </el-col>

              <el-col :lg="5">
                <el-form-item prop="date">
                  <el-date-picker type="date" placeholder="Event Date (required)" v-model="form.date"
                                  style="width: 100%;"
                                  value-format="yyyy-MM-dd"/>
                </el-form-item>
              </el-col>

              <el-col :lg="6">
                <el-form-item prop="time">
                  <el-time-select v-model="form.time" placeholder="Event Time (required)"
                                  :picker-options="timePickerOptions"/>
                </el-form-item>
              </el-col>

              <el-col :lg="3">
                <el-form-item prop="period">
                  <el-radio-group v-model="form.period">
                    <el-radio-button label="am">AM</el-radio-button>
                    <el-radio-button label="pm">PM</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :lg="12">
                <el-row>
                  <el-col :lg="12">
                    <h5 class="form--label">Event Duration</h5>
                  </el-col>
                </el-row>

                <el-form-item prop="duration">
                  <el-radio-group v-model="form.duration" size="small">
                    <el-radio border :label="60">1 hour</el-radio>
                    <el-radio :label="90" border>1 1/2 hours</el-radio>
                    <el-radio :label="120" border>2 hours</el-radio>
                    <el-radio :label="240" border>half day</el-radio>
                    <el-radio :label="480" border>all day</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-row>
                  <el-col :lg="12">
                    <h5 class="form--label">Timezone</h5>
                  </el-col>
                </el-row>

                <el-form-item prop="timezone">
                  <el-select v-model="form.timezone" placeholder="(required)">
                    <el-option label="EST" value="EST"/>
                    <el-option label="EU/Basel" value="EU/Basel"/>
                    <el-option label="EU/Dublin" value="EU/Dublin"/>
                    <el-option label="US/NY" value="US/NY"/>
                  </el-select>
                </el-form-item>

              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :lg="7">
                <el-form-item label="No. of participants" prop="participants_count">
                  <el-input-number v-model="form.participants_count" controls-position="right" :min="1"/>
                  <el-tooltip style="margin-left: 5px" class="item" effect="dark"
                              content="Expected number of participants planned for this event?" placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </el-form-item>

              </el-col>
              <el-col :lg="7">
                <el-form-item label="No. of presenters" prop="presenters_count">
                  <el-input-number v-model="form.presenters_count" controls-position="right" :min="1"/>
                  <el-tooltip style="margin-left: 5px" class="item" effect="dark"
                              content="Number of presenters planned for the event" placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </el-form-item>
              </el-col>

              <el-col :lg="4">
                <el-form-item prop="ms_sma">
                  <el-radio-group v-model="form.ms_sma">
                    <el-radio-button label="MS">MS</el-radio-button>
                    <el-radio-button label="MSA">SMA</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :lg="4">
                <el-form-item prop="eod_webcast">
                  <el-radio-group v-model="form.eod_webcast">
                    <el-radio-button label="EOD">EOD</el-radio-button>
                    <el-radio-button label="Webcast">Webcast</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :lg="8">
                <el-form-item prop="slide_deck_name">
                  <el-input v-model="form.slide_deck_name" placeholder="Slide Deck Name"/>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item prop="slide_deck_id">
                  <el-input v-model="form.slide_deck_id" placeholder="Slide Deck ID"/>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item prop="program_meeting_id">
                  <el-input v-model="form.program_meeting_id" placeholder="Program Meeting ID"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <h5 class="form--label">Presenters</h5>
              </el-col>
            </el-row>

            <el-row v-for="(presenter, index) in form.presenters" :key="index" :gutter="20">
              <el-col :lg="10">
                <el-form-item :prop="'presenters.' + index + '.name'">
                  <el-input v-model="presenter.name" placeholder="Presenter Name"/>
                </el-form-item>
              </el-col>
              <el-col :lg="10">
                <el-form-item
                  :rules="[{ type: 'email', message: 'Please input correct email address', trigger: 'change' }]"
                  :prop="'presenters.' + index + '.email'">
                  <el-input v-model="presenter.email" placeholder="Presenter Email"/>
                </el-form-item>
              </el-col>

              <el-col :span="2">
                <el-button circle @click.prevent="removePresenter(presenter)" icon="el-icon-delete" size="small"
                           style="margin-bottom: 10px"/>
              </el-col>
            </el-row>

            <p>
              <el-button type="primary" icon="el-icon-plus" @click="addPresenter" size="small">
                add presenter
              </el-button>
            </p>

            <el-row>
              <el-col :span="12">
                <h5 class="form--label">Additional Notes</h5>
              </el-col>
            </el-row>

            <el-row>
              <el-col :lg="16">
                <el-form-item prop="notes">
                  <el-input type="textarea" :rows="4" placeholder="add information not found on the fields above"
                            v-model="form.notes"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="Project">Project</el-tab-pane>
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
  import { createEvent, fetchEvent, updateEvent } from '@/api/biogenEvent'

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
    slide_deck_id: ''
  }

  export default {
    name: 'biogenEventDetail',
    components: {},
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
        },
        timePickerOptions: {
          start: '01:00',
          step: '00:15',
          end: '12:00'
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
      },
      removePresenter(item) {
        const index = this.form.presenters.indexOf(item)
        this.form.presenters.splice(index, 1)
      },
      addPresenter() {
        this.form.presenters.push({
          name: '',
          email: ''
        })
      }
    }
  }
</script>
