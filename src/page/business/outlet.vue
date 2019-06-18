<template>
  <div class="content">
    <div style="margin-bottom: 20px;">
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>营业点管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button @click="addOutlet" type="primary" size="small">添加</el-button>
          <el-button @click="delOutlet" type="danger" size="small">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <HeadSenior @showSearch="showSearch" :data="tableHead" @getSearch="headleSearch"/>
    <div class="table">
      <el-table
        id="outletTable"
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
          min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.companyName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[3].name"
          v-if="tableHead[3].visible"
          align="center"
          min-width="150">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <img :src="scope.row.logoUrl" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[4].name"
          v-if="tableHead[4].visible"
          min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.num}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[5].name"
          v-if="tableHead[5].visible"
          min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.phone}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[6].name"
          v-if="tableHead[6].visible"
          min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.addr}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[7].name"
          v-if="tableHead[7].visible"
          min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.bank}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[8].name"
          v-if="tableHead[8].visible"
          min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.bankId}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[9].name"
          v-if="tableHead[9].visible"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-tag>{{scope.row.payee}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[10].name"
          v-if="tableHead[10].visible"
          align="center"
          width="100">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-tag>{{scope.row.checker}}</el-tag>
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
          width="80">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-button @click="editOutlet(scope.row)" type="success" size="mini">编辑</el-button>
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
    <OutletForm ref="OutletForm" :success="getList" />
  </div>
</template>

<script>
import OutletForm from '@/components/outlet/form.vue'
import { mapState } from 'vuex'
import { table } from '@/mixins/table'
export default {
  name: 'outlet',
  mixins: [table],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      tableHead: state => state.outlet.tableHead,
      companySelector: state => state.common.company.selector
    })
  },
  filters: {
    companyName: function (value) {
      return this.companySelector
    }
  },
  mounted () {
    this.$store.dispatch('common/companySelector')
  },
  methods: {
    getList () {
      this.tableLoad = true
      this.$store.dispatch('outlet/list', this.listData).then((res) => {
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
    addOutlet () {
      this.$refs['OutletForm'].show()
    },
    editOutlet (data) {
      this.$refs['OutletForm'].show('edit', data)
    },
    delOutlet () {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择营业点')
      } else {
        this.$confirm('此操作将永久删除该营业点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('outlet/delete', this.selectData).then((res) => {
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
    OutletForm
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
