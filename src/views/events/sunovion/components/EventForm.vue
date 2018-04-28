<template>
  <div class="form-container">
    <div class="form-main-container">
      <el-form ref="form" :model="eventObj" :rules="rules" size="small" class="form-container"
               v-loading.lock="loading" label-position="top">
        <el-tabs tab-position="left">
          <el-tab-pane label="Event">
            <el-card>
              <div>
                <el-row>
                  <el-col :span="12">
                    <h5 class="form--label">Requestor Info</h5>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :lg="8">
                    <el-form-item prop="requestor_name">
                      <el-input v-model="eventObj.requestor_name" placeholder="Requestor Name (required)"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8">
                    <el-form-item prop="phone">
                      <el-input v-model="eventObj.phone" placeholder="Requestor Phone (required)"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8">
                    <el-form-item prop="email">
                      <el-input v-model="eventObj.email" placeholder="Requestor Email (required)"/>
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
                      <el-input v-model="eventObj.name" placeholder="Event Name (required)"/>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="5">
                    <el-form-item prop="date">
                      <el-date-picker type="date" placeholder="Event Date (required)" v-model="eventObj.date"
                                      style="width: 100%;"
                                      value-format="yyyy-MM-dd"/>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="6">
                    <el-form-item prop="time">
                      <el-time-select v-model="eventObj.time" placeholder="Event Time (required)"
                                      :picker-options="timePickerOptions"/>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="3">
                    <el-form-item prop="period">
                      <el-radio-group v-model="eventObj.period">
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
                      <el-radio-group v-model="eventObj.duration" size="small">
                        <el-radio border :label="60">1 hour</el-radio>
                        <el-radio :label="90" border>1 1/2 hours</el-radio>
                        <el-radio :label="120" border>2 hours</el-radio>
                        <el-radio :label="240" border>half day</el-radio>
                        <el-radio :label="480" border>all day</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <p class="form--label">Additional Questions</p>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :lg="6">
                    <el-form-item prop="producer_required">
                      <el-checkbox v-model="eventObj.producer_required" label="Is a producer required on site?"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="5">
                    <el-form-item prop="rehearsal_required">
                      <el-checkbox v-model="eventObj.rehearsal_required" label="Would you like a rehearsal?"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="7">
                    <el-form-item prop="technology_check">
                      <el-checkbox v-model="eventObj.technology_check" label="Would you like a technology check?"/>
                      <el-tooltip style="margin-left: 5px" class="item" effect="dark" placement="top"
                                  content="We recommend 30 minutes tech check to ensure higher quality events.">
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="6">
                    <el-form-item prop="recording_required">
                      <el-checkbox v-model="eventObj.recording_required" label="Recording Required?"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :lg="7">
                    <el-form-item label="No. of participants" prop="participants_count">
                      <el-input-number v-model="eventObj.participants_count" controls-position="right" :min="1"/>
                      <el-tooltip style="margin-left: 5px" class="item" effect="dark"
                                  content="Expected number of participants planned for this event?" placement="top">
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </el-form-item>

                  </el-col>
                  <el-col :lg="7">
                    <el-form-item label="No. of presenters" prop="presenters_count">
                      <el-input-number v-model="eventObj.presenters_count" controls-position="right" :min="1"/>
                      <el-tooltip style="margin-left: 5px" class="item" effect="dark"
                                  content="Number of presenters planned for the event" placement="top">
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row>
                  <el-col :span="12">
                    <h5 class="form--label">Presenters</h5>
                  </el-col>
                </el-row>

                <el-row v-for="(presenter, index) in eventObj.presenters" :key="index" :gutter="20">
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
                                v-model="eventObj.notes"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <h5 class="form--label">Status</h5>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :lg="12">
                    <el-form-item prop="status">
                      <el-select v-model="eventObj.status" placeholder="(required)">
                        <el-option label="new" value="new"/>
                        <el-option label="reviewed" value="reviewed"/>
                        <el-option label="accepted" value="accepted"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="Internal" name="internal">
            <el-card>
              <h4 class="form--label">Project Info</h4>
              <div>
                <el-row>
                  <el-col :lg="4">
                    <el-form-item prop="project_code">
                      <el-select v-model="projectObj.project_code" @change="handleProjectChange"
                                 style="min-width: 400px; max-width: 100%">
                        <el-option v-for="(projectCode, index) in projectCodes" :label="projectCode"
                                   :value="projectCode" :key="index"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :lg="4">
                    <h5>Client</h5>
                    {{projectObj.client}}
                  </el-col>
                  <el-col :lg="4">
                    <h5>Fulfilled by</h5>
                    {{projectObj.fulfilled_by}}
                  </el-col>
                  <el-col :lg="4">
                    <h5>SOW Status</h5>
                    {{projectObj.sow_status}}
                  </el-col>
                  <el-col :lg="4">
                    <h5>Invite Sent by</h5>
                    {{projectObj.invite_sent_by}}
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :lg="4">
                    <h5>Invite type</h5>
                    {{projectObj.invite_type}}
                  </el-col>
                  <el-col :lg="4">
                    <h5>Invoice Sheet</h5>
                    {{projectObj.invoice_sheet}}
                  </el-col>
                  <el-col :lg="4">
                    <h5>Run Sheet</h5>
                    {{projectObj.run_sheet}}
                  </el-col>
                  <el-col :lg="4">
                    <h5>Reporting</h5>
                    {{projectObj.reporting}}
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :lg="12">
                    <h4>Notes</h4>
                    <p>{{projectObj.notes}}</p>
                  </el-col>
                </el-row>
                <h4>Contacts</h4>
                <el-row v-for="(contact, index) in contacts" :key="index" :gutter="20">
                  <el-col :lg="6">
                    <h4>Name</h4>
                    {{contact.name}}
                  </el-col>
                  <el-col :lg="6">
                    <h4>Email</h4>
                    {{contact.email}}
                  </el-col>
                  <el-col :lg="6">
                    <h4>Phone</h4>
                    {{contact.phone}}
                  </el-col>
                  <el-col :lg="6">
                    <h5>Contact Type</h5>
                    {{contact.contact_type}}
                  </el-col>
                </el-row>

              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="page-component-up">
          <el-button type="warning" @click="dialogVisible = true" icon="el-icon-edit-outline" size="large"
                     v-if="isEdit">
            Request Change
          </el-button>
          <el-button type="primary " @click="handleUpdate" icon="el-icon-upload2" size="large" v-if="isEdit">
            Update Event
          </el-button>
          <el-button type="primary " @click="handleCreate" icon="el-icon-upload2" size="large" v-else>
            Create Event
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="Request Change"
      :visible="dialogVisible"
      width="50%">
      <el-input type="textarea" :rows="4" placeholder=""
                v-model="change_notes"/>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleRequestChange">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { createEvent, fetchEvent, updateEvent } from '@/api/sunovionEvent'
  import { fetchProject, fetchProjectByProjectCode } from '@/api/project'
  import { requestBiogenChange } from '@/api/common'
  import {
    requiredValidator,
    emailValidator,
    checkDate,
    timeZones,
    clients,
    internalClients,
    sowStatus,
    inviteType,
    contactTypes
  } from '@/utils/constants'

  const defaultEventObj = {
    name: '',
    phone: '',
    email: '',
    requestor_name: '',
    date: '',
    time: '',
    period: '',
    timezone: 'US/Eastern',
    duration: '',
    presenters: [],
    participants_count: 10,
    presenters_count: 1,
    program_meeting_id: '',
    notes: '',
    project: '',
    producer_required: false,
    rehearsal_required: false,
    recording_required: false,
    technology_check: false,
    status: 'new'
  }

  const defaultProjectObj = {
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

  export default {
    name: 'biogenEventDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      eventId: String
    },
    computed: {
      projectCodes() {
        return this.$store.getters.sunovionProjectCodes
      }
    },
    data() {
      return {
        timePickerOptions: {
          start: '01:00',
          step: '00:15',
          end: '12:00'
        },
        timeZones,
        clients,
        internalClients,
        sowStatus,
        inviteType,
        contactTypes,
        eventObj: Object.assign({}, defaultEventObj),
        projectObj: Object.assign({}, defaultProjectObj),
        contacts: [],
        loading: false,
        dialogVisible: false,
        change_notes: '',
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
        this.projectObj = Object.assign({}, defaultProjectObj)
      }
      this.getProjects()
    },
    methods: {
      getProjects() {
        if (this.projectCodes.length === 0) {
          this.$store.dispatch('FetchProjectCodes', 'Sunovion')
        }
      },
      removePresenter(item) {
        const index = this.eventObj.presenters.indexOf(item)
        this.eventObj.presenters.splice(index, 1)
      },
      addPresenter() {
        this.eventObj.presenters.push({
          name: '',
          email: ''
        })
      },
      getEvent() {
        this.loading = true
        fetchEvent(this.eventId).then(event => {
          this.eventObj = event
          if (event.project) {
            fetchProject(event.project).then(project => {
              this.projectObj = project
              this.contacts = project.contacts
              this.loading = false
            })
          }
          if (this.eventObj.presenters == null) this.eventObj.presenters = []
          this.loading = false
        })
      },
      handleUpdate() {
        this.$refs.form.validate(success => {
          if (success) {
            this.loading = true
            if (this.projectObj.project_code) {
              fetchProjectByProjectCode(this.projectObj.project_code).then(project => {
                this.eventObj.project = project.id
                return project
              }).then(project => {
                updateEvent(this.eventId, this.eventObj)
                  .then(() => {
                    this.projectObj = project
                    this.projectObj.contacts = project.contacts
                    this.loading = false
                    this.notifySuccess('Successfully updated event')
                  })
              })
            } else {
              updateEvent(this.eventId, this.eventObj)
                .then(() => {
                  this.loading = false
                  this.notifySuccess('Successfully updated event')
                })
            }
          } else {
            this.notifyError()
          }
        })
      },
      handleProjectChange(value) {
        this.loading = true
        fetchProjectByProjectCode(value).then(project => {
          this.projectObj = project
          this.contacts = project.contacts
          this.loading = false
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
      },
      handleRequestChange() {
        this.dialogVisible = false
        this.loading = true
        requestBiogenChange({
          message: this.change_notes,
          eventID: this.eventId,
          eventName: this.eventObj.name,
          client: 'sunovion'
        }).then(response => {
          this.loading = false
        })
      }
    }
  }
</script>
