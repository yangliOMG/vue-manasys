<template>
  <div class="content">
    <div style="margin-bottom: 20px;">
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>企业管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button @click="addCompany" type="primary" size="small">添加</el-button>
          <el-button @click="delCompany" type="danger" size="small">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <HeadSenior @showSearch="showSearch" :data="tableHead" @getSearch="headleSearch"/>
    <div class="table">
      <el-table
        id="companyTable"
        class="mainTable"
        ref="table"
        v-loading="tableLoad"
        element-loading-text="数据加载中"
        :data="tableData"
        @sort-change="sortTable"
        @selection-change="selectTable"
        :default-sort="{prop: 'date',order: 'descending'}"
        height="100%"
        :row-class-name="rowClass"
        border
        style="width: 100%;position:absolute;">
        <el-table-column
          type="selection"
          align="center"
          width="40"
          fixed="left"
          :selectable="(row, index) => index === 0?false:true">
        </el-table-column>
        <el-table-column
          :label="tableHead[0].name"
          v-if="tableHead[0].visible"
          width="50"
          fixed="left"
          align="center"
          :formatter="indexMethod">
        </el-table-column>
        <el-table-column
          :label="tableHead[1].name"
          v-if="tableHead[1].visible"
          min-width="240">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row === null"
              v-model="searchDefault.name"
              @change="headleSearch"
              @keyup.13="headleSearch"
              size="mini"
              placeholder="输入关键词搜索"/>
            <div v-if="scope.row !== null">
              {{scope.row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[2].name"
          v-if="tableHead[2].visible"
          align="center"
          width="100">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <img :src="scope.row.logoUrl" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[3].name"
          v-if="tableHead[3].visible"
          min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.taxno}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[4].name"
          v-if="tableHead[4].visible"
          min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.phone}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[5].name"
          v-if="tableHead[5].visible"
          min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.address}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[6].name"
          v-if="tableHead[6].visible"
          min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.bank}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[7].name"
          v-if="tableHead[7].visible"
          min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.bankId}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[8].name"
          v-if="tableHead[8].visible"
          min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.email}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[9].name"
          v-if="tableHead[9].visible"
          align="center"
          width="100">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-tag>{{scope.row.kind}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[10].name"
          v-if="tableHead[10].visible"
          min-width="250">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.code}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          :label="tableHead[11].name"
          v-if="tableHead[11].visible"
          sortable="custom"
          min-width="160">
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row === null"
              v-model="searchDefault.date"
              style="width:100%"
              type="daterange"
              size="mini"
              value-format="yyyy-MM-dd"
              @change="headleSearch"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <span v-if="scope.row !== null">{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[12].name"
          v-if="tableHead[12].visible"
          fixed="right"
          width="140">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-button @click="editCompany(scope.row)" type="success" size="mini">编辑</el-button>
              <span></span>
              <el-button @click="setCompany(scope.row)" type="primary" size="mini">设置</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Pagination">
      <div class="block">
        <el-pagination
          :disabled="tableLoad"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.page"
          :page-sizes="pagination.limits"
          :page-size.sync="pagination.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
    <CompanyForm ref="CompanyForm" :success="getList" />
    <CompanySet ref="CompanySet" :success="getList" />
  </div>
</template>

<script>
import CompanyForm from '@/components/company/form.vue'
import CompanySet from '@/components/company/set.vue'
import { mapState } from 'vuex'
import { table } from '@/mixins/table'
export default {
  name: 'company',
  mixins: [table],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      tableHead: state => state.company.tableHead
    })
  },
  mounted () {
  },
  methods: {
    getList () {
      this.tableLoad = true
      this.$store.dispatch('company/list', this.listData).then((res) => {
        this.tableLoad = false
        this.index = this.pagination.page
        if (res.data.status === 1) {
          this.tableData = [null].concat(res.data.data.list)
          this.setSearchOpen()
          this.pagination.total = res.data.data.total
        }
      }).catch((res) => {
        this.tableLoad = false
        this.$notify({
          title: '错误',
          dangerouslyUseHTMLString: true,
          message: res.response.data,
          type: 'error'
        })
      })
    },
    setCompany (data) {
      let { disabled, day, time } = {...data.set}
      this.$refs['CompanySet'].show({
        disabled, day, time
      })
    },
    addCompany () {
      this.$refs['CompanyForm'].show()
    },
    editCompany (data) {
      this.$refs['CompanyForm'].show('edit', data)
    },
    delCompany () {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择用户')
      } else {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('company/delete', this.selectData).then((res) => {
            if (res.data.status === 1) {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              })
              this.getList()
            } else {
              this.$notify({
                title: '错误',
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        }).catch(() => {})
      }
    }
  },
  components: {
    CompanyForm,
    CompanySet
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .table{
    flex: 1;
    position:relative;
    .basicHeader{
      display: inline-block;
    }
  }
  .Pagination{
    flex-basis: 100px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
}
</style>
