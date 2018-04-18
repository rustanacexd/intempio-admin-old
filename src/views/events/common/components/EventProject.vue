<template>
  <div>
    <el-row :gutter="20">
      <el-col :lg="4">
        <el-form-item prop="project_code" label="Project Code">
          <el-select v-model="form.project_code">
            <el-option v-for="project in projectCodes" :label="project" :value="project" :key="project"/>
          </el-select>
        </el-form-item>

      </el-col>
      <el-col :lg="4">
        <el-form-item prop="client" label="Client">
          <el-select v-model="form.client">
            <el-option v-for="client in clients" :label="client" :value="client" :key="client"/>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :lg="4">
        <el-form-item prop="fulfilled_by" label="Fulfilled by">
          <el-select v-model="form.fulfilled_by">
            <el-option v-for="client in internalClients" :label="client" :value="client" :key="client"/>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :lg="4">
        <el-form-item prop="sow_status" label="SOW Status">
          <el-select v-model="form.sow_status">
            <el-option v-for="status in sowStatus" :label="status" :value="status" :key="status"/>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :lg="4">
        <el-form-item prop="invite_sent_by" label="Invite sent by">
          <el-select v-model="form.invite_sent_by">
            <el-option v-for="client in internalClients" :label="client" :value="client" :key="client"/>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :lg="4">
        <el-form-item prop="invite_type" label="Invite type">
          <el-select v-model="form.invite_type">
            <el-option v-for="invite in inviteType" :label="invite" :value="invite" :key="invite"/>
          </el-select>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :lg="10">
        <el-form-item prop="invoice_sheet" label="Invoice sheet">
          <el-input v-model="form.invoice_sheet"/>
        </el-form-item>
      </el-col>
      <el-col :lg="2">
        <el-form-item prop="run_sheet" label="Run sheet?">
          <el-checkbox v-model="form.run_sheet"/>
        </el-form-item>
      </el-col>

      <el-col :lg="2">
        <el-form-item prop="reporting" label="Reporting?">
          <el-checkbox v-model="form.reporting"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="12">
        <el-form-item prop="notes" label="Additional notes">
          <el-input type="textarea" :rows="4" placeholder="add information not found on the fields above"
                    v-model="form.notes"/>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const projectCodes = [
    '2018.001 Nov - Legal 2018 Support',
    '2018.002 Bio - EOD HCP and SMA PEP Programs',
    '2018.003 Nov PLS 1st',
    '2018.005 Ver - VAKO 2018',
    '2018.007 Nov - Post ENETS 2018',
    '2018.008 Sun - Training Studio Session Support',
    '2018.008.01 Sun - Sainz January Fast Start',
    '2018.008.02 Sun - January New Hire Training',
    '2018.008.03 Sun - The Hospital Expert',
    '2018.008.04 Studio Maintenance',
    '2018.008.05 Sun - April New Hire Phase II',
    '2018.009 Nov - Onc VA Reimagining Access Meeting',
    '2018.011 Nov - Onc IDAPS Meeting',
    '2018.012 Nov - PLS IDAPS',
    '2018.013 Nov - Onc MA IDAPS',
    '2018.014 Nov - MMS Support Plan',
    '2018.015 Nov - Onc Franchise Head Sessions',
    '2018.016 Bio - WW Medical Speaker Meetings',
    '2018.018 Nov - Onc International Broadcast',
    '2018.019 Bio - FFT Training',
    '2018.020 Ver - Multi event contract',
    '2018.021 Nov - Additional Legal Support',
    '2018.022 Bio - Marketing Sessions',
    '2018.023 Bio - MS Patient Webinars',
    '2018.024 Nov - Segmented Marketing',
    '2018.025 GE - NPI August'
  ]
  const clients = ['Novartis', 'Biogen', 'Vertex', 'Sunovion', 'GE']
  const internalClients = ['Intempio', 'RVibe']
  const sowStatus = ['Client', 'Signed']
  const inviteType = ['single', 'recurring']

  export default {
    props: { form: Object },
    data() {
      return {
        projectCodes,
        clients,
        internalClients,
        sowStatus,
        inviteType
      }
    }
  }
</script>
