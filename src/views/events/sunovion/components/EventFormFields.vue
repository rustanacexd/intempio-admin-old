<template>
  <div>
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
        <p class="form--label">Event Details</p>
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
          <el-date-picker type="date" placeholder="Event Date (required)" v-model="form.date" style="width: 100%;"
                          value-format="yyyy-MM-dd"/>
        </el-form-item>
      </el-col>

      <el-col :lg="6">
        <el-form-item prop="time">
          <el-time-select v-model="form.time" placeholder="Event Time (required)" :picker-options="timePickerOptions"/>
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
      <el-col :span="12">
        <p class="form--label">Event Duration</p>
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

    <el-row>
      <el-col :span="12">
        <p class="form--label">Additional Questions</p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="6">
        <el-form-item prop="producer_required">
          <el-checkbox v-model="form.producer_required" label="Is a producer required on site?"/>
        </el-form-item>
      </el-col>
      <el-col :lg="5">
        <el-form-item prop="rehearsal_required">
          <el-checkbox v-model="form.rehearsal_required" label="Would you like a rehearsal?"/>
        </el-form-item>
      </el-col>
      <el-col :lg="7">
        <el-form-item prop="technology_check">
          <el-checkbox v-model="form.technology_check" label="Would you like a technology check?"/>
          <el-tooltip style="margin-left: 5px" class="item" effect="dark" placement="top"
                      content="We recommend 30 minutes tech check to ensure higher quality events.">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-form-item>
      </el-col>

      <el-col :lg="6">
        <el-form-item prop="recording_required">
          <el-checkbox v-model="form.recording_required" label="Recording Required?"/>
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
    </el-row>
    <el-row>
      <el-col :span="12">
        <p>Presenters</p>
      </el-col>
    </el-row>

    <el-row v-for="(presenter, index) in form.presenters" :key="presenter.key" :gutter="20">
      <el-col :lg="10">
        <el-form-item :prop="'presenters.' + index + '.name'">
          <el-input v-model="presenter.name" placeholder="Presenter Name"/>
        </el-form-item>
      </el-col>
      <el-col :lg="10">
        <el-form-item :rules="[{ type: 'email', message: 'Please input correct email address', trigger: 'change' }]"
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
      <el-col :lg="16">
        <el-form-item label="Additional Notes" prop="notes">
          <el-input type="textarea" :rows="4" placeholder="add information not found on the fields above"
                    v-model="form.notes"/>
        </el-form-item>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    props: { form: Object },
    data() {
      return {
        timePickerOptions: {
          start: '01:00',
          step: '00:15',
          end: '12:00'
        }
      }
    },
    methods: {
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

<style scoped>

</style>
