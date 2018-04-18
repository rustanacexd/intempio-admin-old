<template>
  <div>
    <div v-for="(contact, index) in form" :key="index" :gutter="20">
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
            :rules="[{ type: 'email', message: 'Please input correct email address', trigger: 'change' }]"
            :prop="'contacts.' + index + '.email'">
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
</template>

<script>
  const contactTypes = ['primary', 'secondary', 'internal', 'technical']
  export default {
    props: { form: Array },
    data() {
      return {
        contactTypes
      }
    },
    methods: {
      removeContact(item) {
        const index = this.form.indexOf(item)
        this.form.splice(index, 1)
      },
      addContact() {
        this.form.push({
          name: '',
          email: '',
          phone: '',
          contact_type: ''
        })
      }
    }
  }
</script>

