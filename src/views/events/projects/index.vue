<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container" style="margin-bottom: 25px">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Search"
                v-model="listQuery.search">
      </el-input>


      <el-select @change='handleFilter' class="filter-item" v-model="listQuery.ordering">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">Add
      </el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="loading" border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="Lookup ID" width="300">
        <template slot-scope="scope">
          <span class="link-type" style="cursor: pointer" @click="handleUpdate(scope.row)">{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Project Code" width="300">
        <template slot-scope="scope">
          <span class="link-type" style="cursor: pointer"
                @click="handleUpdate(scope.row)">{{scope.row.project_code}}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="Project ID">-->
      <!--<template slot-scope="scope">-->
      <!--<span class="link-type" style="cursor: pointer"-->
      <!--@click="handleUpdate(scope.row)">{{scope.row.project_id}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="Client" width="100">
        <template slot-scope="scope">
          <span class="link-type" style="cursor: pointer" @click="handleUpdate(scope.row)">{{scope.row.client}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Fulfilled by" width="120">
        <template slot-scope="scope">
          <span class="link-type" style="cursor: pointer"
                @click="handleUpdate(scope.row)">{{scope.row.fulfilled_by}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Invite sent by" width="120">
        <template slot-scope="scope">
          <span class="link-type" style="cursor: pointer"
                @click="handleUpdate(scope.row)">{{scope.row.invite_sent_by}}</span>
        </template>
      </el-table-column>

      <el-table-column label="SOW status" width="100">
        <template slot-scope="scope">
          <span class="link-type" style="cursor: pointer"
                @click="handleUpdate(scope.row)">{{scope.row.sow_status}}</span>
        </template>
      </el-table-column>


      <el-table-column label="actions" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin-top: 25px">
      <el-pagination background @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
  import { fetchProjects, deleteProject } from '@/api/project'
  import waves from '@/directive/waves'

  const sortOptions = [
    { label: 'created descending', key: '-created' },
    { label: 'created ascending', key: 'created' },
    { label: 'modified descending', key: '-modified' },
    { label: 'modified ascending', key: 'modified' }
  ]

  export default {
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          search: '',
          page: 1,
          ordering: '-created',
          limit: 10
        },
        sortOptions,
        textMap: {
          update: 'Edit',
          create: 'Create'
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchProjects(this.listQuery).then(response => {
          this.list = response.results
          this.total = response.count
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleDelete(row) {
        this.$confirm('This will permanently delete the project. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteProject(row.id).then(() => {
            this.getList()
            this.$store.dispatch('FetchProjectCodes', row.client).then(() => {
              this.listLoading = false
              this.$notify({
                title: 'Success',
                message: `deleted ${row.project_code}`,
                type: 'success',
                duration: 3000
              })
            })
          })
        }).catch(() => {
          this.$notify({
            title: 'Info',
            message: `Delete Canceled`,
            type: 'info',
            duration: 3000
          })
        })
      },
      handleCreate() {
        this.$router.push({ name: 'createProject' })
      },
      handleUpdate(row) {
        this.$router.push({
          name: 'editProject',
          params: { id: row.id }
        })
      }
    }
  }
</script>
