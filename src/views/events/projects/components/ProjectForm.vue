<template>
  <div class="form-container">
    <div class="form-main-container">
      <el-form ref="form" :model="projectObj" :rules="rules" size="small" class="form-container"
               v-loading.fullscreen.lock="loading" label-position="top">
        <el-card style="padding: 20px">
          <h4 class="form--label">{{projectLabel}}</h4>
          <div>
            <el-row :gutter="20">
              <el-col :lg="4">
                <el-form-item prop="client" label="Client">
                  <el-select v-model="projectObj.client">
                    <el-option v-for="client in clients" :label="client" :value="client" :key="client"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :lg="4">
                <el-form-item prop="fulfilled_by" label="Fulfilled by">
                  <el-select v-model="projectObj.fulfilled_by">
                    <el-option v-for="client in internalClients" :label="client" :value="client" :key="client"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :lg="4">
                <el-form-item prop="sow_status" label="SOW Status">
                  <el-select v-model="projectObj.sow_status">
                    <el-option v-for="status in sowStatus" :label="status" :value="status" :key="status"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :lg="4">
                <el-form-item prop="invite_sent_by" label="Invite sent by">
                  <el-select v-model="projectObj.invite_sent_by">
                    <el-option v-for="client in internalClients" :label="client" :value="client" :key="client"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :lg="4">
                <el-form-item prop="invite_type" label="Invite type">
                  <el-select v-model="projectObj.invite_type">
                    <el-option v-for="invite in inviteType" :label="invite" :value="invite" :key="invite"/>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :lg="10">
                <el-form-item prop="invoice_sheet" label="Invoice sheet">
                  <el-input v-model="projectObj.invoice_sheet"/>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <el-form-item prop="run_sheet" label="Run sheet?">
                  <el-checkbox v-model="projectObj.run_sheet"/>
                </el-form-item>
              </el-col>

              <el-col :lg="2">
                <el-form-item prop="reporting" label="Reporting?">
                  <el-checkbox v-model="projectObj.reporting"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="12">
                <el-form-item prop="notes" label="Additional notes">
                  <el-input type="textarea" :rows="4" placeholder="add information not found on the fields above"
                            v-model="projectObj.notes"/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <h5 class="form--label">Contacts</h5>
            <div v-for="(contact, index) in contacts" :key="index" :gutter="20">
              <el-row style="padding-bottom: 10px; padding-top: 10px">
                <el-col :lg="12">
                  <el-form-item :prop="'contacts.' + index + '.contact_type'">
                    <el-select v-model="contact.contact_type" placeholder="Contact Type">
                      <el-option v-for="contactType in contactTypes" :label="contactType" :key="contactType"
                                 :value="contactType"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :lg="6">
                  <el-form-item :prop="'contacts.' + index + '.name'"
                                :rules="[{required: true,message: 'This field is required.',trigger: 'change'}]">
                    <el-input v-model="contact.name" placeholder="Contact Name"/>
                  </el-form-item>
                </el-col>

                <el-col :lg="6">
                  <el-form-item
                    :prop="'contacts.' + index + '.email'"
                    :rules="[{ type: 'email', message: 'Please input correct email address', trigger: 'change' }]"
                  >
                    <el-input v-model="contact.email" placeholder="Contact Email"/>
                  </el-form-item>
                </el-col>

                <el-col :lg="6">
                  <el-form-item :prop="'contacts.' + index + '.phone'">
                    <el-input v-model="contact.phone" placeholder="Contact Phone"/>
                  </el-form-item>
                </el-col>

                <el-col :span="2">
                  <el-button circle @click.prevent="removeContact(contact)" icon="el-icon-delete" size="small"
                             style="margin-bottom: 10px"/>
                </el-col>
              </el-row>
            </div>
            <p>
              <el-button type="primary" icon="el-icon-plus" @click="addContact" size="small">
                add contact
              </el-button>
            </p>
          </div>
        </el-card>
        <el-form-item class="page-component-up">
          <el-button type="primary " @click="handleUpdate" icon="el-icon-upload2" size="large" v-if="isEdit">
            Update Project
          </el-button>
          <el-button type="primary " @click="handleCreate" icon="el-icon-upload2" size="large" v-else>
            Create Project
          </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import { fetchProject, updateProject, createProject } from '@/api/project'
  import {
    requiredValidator,
    emailValidator,
    checkDate,
    timeZones,
    projectCodes,
    clients,
    internalClients,
    sowStatus,
    inviteType,
    contactTypes
  } from '@/utils/constants'

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
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      projectCode: String
    },
    data() {
      return {
        timePickerOptions: {
          start: '01:00',
          step: '00:15',
          end: '12:00'
        },
        timeZones,
        projectCodes,
        clients,
        internalClients,
        sowStatus,
        inviteType,
        contactTypes,
        projectObj: Object.assign({}, defaultProjectObj),
        contacts: [],
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
        this.getProject()
      } else {
        this.projectObj = Object.assign({}, defaultProjectObj)
      }
    },
    computed: {
      projectLabel() {
        if (this.projectObj.project_code) {
          const projectCodeObj = this.projectCodes.find(obj => {
            if (obj.value === this.projectObj.project_code) return true
          })
          return projectCodeObj.label
        }
      }
    },
    methods: {
      removeContact(item) {
        const index = this.contacts.indexOf(item)
        this.contacts.splice(index, 1)
      },
      addContact() {
        this.contacts.push({
          name: '',
          email: '',
          phone: '',
          contact_type: ''
        })
      },
      getProject() {
        this.loading = true
        fetchProject(this.projectCode).then(project => {
          this.projectObj = project
          this.contacts = project.contacts || []
          this.loading = false
        })
      },
      handleUpdate() {
        this.$refs.form.validate(success => {
          if (success) {
            this.loading = true
            this.projectObj['contacts'] = this.contacts
            updateProject(this.projectCode, this.projectObj).then(() => {
              this.notifySuccess('successfully updated project')
              this.loading = false
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
            createProject(this.projectObj)
              .then(() => {
                this.loading = false
                this.resetForm()
                this.notifySuccess('Successfully created project')
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

