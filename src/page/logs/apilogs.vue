<template>
  <div class="content">
    <div style="margin-bottom: 20px;">
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>外部接口日志</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12" style="text-align:right;">
        </el-col>
      </el-row>
    </div>
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
          :label="tableHead[0].name"
          v-if="tableHead[0].visible"
          width="50"
          align="center"
          :formatter="indexMethod">
        </el-table-column>
        <el-table-column
          prop="date"
          :label="tableHead[1].name"
          v-if="tableHead[1].visible"
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
            <span v-if="scope.row !== null">{{scope.row.datetime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="interf"
          :label="tableHead[2].name"
          v-if="tableHead[2].visible"
          sortable="custom"
          min-width="120">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row === null"
              v-model="search.interf"
              @change="headleSearch"
              @keyup.13="headleSearch"
              size="mini"
              placeholder="输入关键词搜索"/>
            <div v-if="scope.row !== null">
              {{scope.row.interf}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[3].name"
          v-if="tableHead[3].visible"
          align="center"
          width="150">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-tag v-if="scope.row.operate === 0">成功</el-tag>
              <el-tag v-if="scope.row.operate === 1" type="danger">失败</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[4].name"
          v-if="tableHead[4].visible"
          fixed="right"
          width="80">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-button @click="showInfo(scope.row)" type="primary" size="mini">查看</el-button>
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
    <ViewApi ref="viewApi" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { table } from '@/mixins/table'
import ViewApi from '@/components/logs/viewApi'
export default {
  name: 'apilogs',
  mixins: [table],
  data () {
    return {
      type: '全部',
      search: {
      }
    }
  },
  computed: {
    ...mapState({
      tableHead: state => state.logs.apihead
    })
  },
  mounted () {
  },
  methods: {
    getList () {
      this.tableLoad = true
      let data = Object.assign({}, this.listData, this.search)
      this.$store.dispatch('logs/apiList', data).then((res) => {
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
    showInfo (data) {
      this.$refs['viewApi'].show(data)
    }
  },
  components: {
    ViewApi
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
