<template>
  <div class="content">
    <div style="margin-bottom: 20px;">
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="small">Excel导入</el-button>
        </el-col>
      </el-row>
    </div>
    <HeadSenior ref="HeadSenior" @showSearch="showSearch" :data="tableHead" title="订单号" @getSearch="headleSearch" />
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
        :default-sort="{prop: 'orderTime',order: 'descending'}"
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
          align="center"
          :formatter="indexMethod">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          :label="tableHead[1].name"
          v-if="tableHead[1].visible"
          sortable="custom"
          min-width="230">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row === null"
              v-model="search.orderNum"
              @change="headleSearch"
              @keyup.13="headleSearch"
              size="mini"
              placeholder="输入关键词搜索"/>
            <div v-if="scope.row !== null">
              {{scope.row.orderNum}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="outletName"
          :label="tableHead[2].name"
          v-if="tableHead[2].visible"
          sortable="custom"
          min-width="240">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row === null"
              v-model="search.orderNum"
              @change="headleSearch"
              @keyup.13="headleSearch"
              size="mini"
              placeholder="输入关键词搜索"/>
            <div v-if="scope.row !== null">
              {{scope.row.outletName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderTime"
          :label="tableHead[3].name"
          v-if="tableHead[3].visible"
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
            <span v-if="scope.row !== null">{{scope.row.orderTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="afterTaxTotal"
          :label="tableHead[4].name"
          v-if="tableHead[4].visible"
          sortable="custom"
          min-width="140">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.afterTaxTotal}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[5].name"
          v-if="tableHead[5].visible"
          fixed="right"
          width="100">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-button type="success" @click="showOrder(scope.row)" size="mini" v-if="scope.row.isInvoiced === 1">查看</el-button>
              <el-button type="primary" @click="showOrder(scope.row)" size="mini" v-else>开发票</el-button>
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
    <OrderView ref="orderView" :success="getList" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { table } from '@/mixins/table'
import OrderView from '@/components/order/view'
export default {
  name: 'orderList',
  mixins: [table],
  data () {
    return {
      search: {
        orderNum: '',
        code: '',
        num: '',
        payerName: ''
      }
    }
  },
  computed: {
    ...mapState({
      tableHead: state => state.order.tableHead
    })
  },
  watch: {
    'searchDefault.name': function (val) {
      this.search.orderNum = val
    }
  },
  mounted () {
  },
  methods: {
    getList () {
      this.tableLoad = true
      let data = Object.assign({}, this.listData)
      if (this.searchDefault.isOpened) {
        data = Object.assign({}, data, this.search)
      } else {
        data.orderNum = data.name
      }
      delete data.name
      this.$store.dispatch('order/list', data).then((res) => {
        console.log(res)
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
    showOrder (data) {
      this.$refs['orderView'].show(data)
    }
  },
  components: {
    OrderView
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
