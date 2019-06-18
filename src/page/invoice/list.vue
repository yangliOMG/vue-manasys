<template>
  <div class="content">
    <div style="margin-bottom: 20px;">
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>发票管理</el-breadcrumb-item>
            <el-breadcrumb-item>发票列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button @click="sendMail" type="primary" size="small">发送邮箱</el-button>
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
          prop="orderNum"
          :label="tableHead[1].name"
          v-if="tableHead[1].visible"
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
              {{scope.row.orderNum}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          :label="tableHead[2].name"
          v-if="tableHead[2].visible"
          sortable="custom"
          min-width="120">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row === null"
              v-model="search.num"
              @change="headleSearch"
              @keyup.13="headleSearch"
              size="mini"
              placeholder="输入关键词搜索"/>
            <div v-if="scope.row !== null">
              {{scope.row.num}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          :label="tableHead[3].name"
          v-if="tableHead[3].visible"
          sortable="custom"
          min-width="150">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row === null"
              v-model="search.code"
              @change="headleSearch"
              @keyup.13="headleSearch"
              size="mini"
              placeholder="输入关键词搜索"/>
            <div v-if="scope.row !== null">
              {{scope.row.code}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          :label="tableHead[4].name"
          v-if="tableHead[4].visible"
          sortable="custom"
          align="center"
          width="120">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-tag v-if="scope.row.type === 0">蓝字发票</el-tag>
              <el-tag v-if="scope.row.type === 1" type="danger">红字发票</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          :label="tableHead[5].name"
          v-if="tableHead[5].visible"
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
          :label="tableHead[6].name"
          v-if="tableHead[6].visible"
          min-width="200">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row === null"
              v-model="search.payerName"
              @change="headleSearch"
              @keyup.13="headleSearch"
              size="mini"
              placeholder="输入关键词搜索"/>
            <div v-if="scope.row !== null">
              {{scope.row.payerName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[7].name"
          v-if="tableHead[7].visible"
          sortable="custom"
          min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              {{scope.row.afterTaxTotal}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[8].name"
          v-if="tableHead[8].visible"
          min-width="200">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row === null"
              v-model="search.outletName"
              filterable
              remote
              size="mini"
              @change="headleSearch"
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="outletName.loading">
              <el-option
                v-for="item in outletName.list"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
            <div v-if="scope.row !== null">
              {{scope.row.outletName}}
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
              <el-tag type="success">{{scope.row.payee}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[10].name"
          v-if="tableHead[10].visible"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-button @click="showInvoice(scope.row)" type="primary" size="mini">查看</el-button>
              <span></span>
              <el-button @click="download(scope.row)" type="success" size="mini">下载</el-button>
              <span></span>
              <el-button @click="redInvoice(scope.row)" type="danger" size="mini" :disabled="scope.row.type === 1">红冲</el-button>
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
    <InvoicePdf ref="invoicePdf" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { table } from '@/mixins/table'
import InvoicePdf from '@/components/invoice/invoicePdf.vue'
export default {
  name: 'invoiceList',
  mixins: [table],
  data () {
    return {
      outletName: {
        list: [],
        loading: false
      },
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
      tableHead: state => state.invoice.tableHead
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
      console.log(data)
      this.$store.dispatch('invoice/list', data).then((res) => {
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
    remoteMethod (query) {
      if (query !== '') {
        this.outletName.loading = true
        this.$store.dispatch('common/outletSelector', query).then((res) => {
          this.outletName.loading = false
          if (res.data.status === 1) {
            this.outletName.list = res.data.data
          }
        })
      } else {
        this.outletName.list = []
      }
    },
    redInvoice (data) {
      this.$confirm('此操作将红冲该发票, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('invoice/red', {id: data.id}).then((res) => {
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
    },
    download (data) {
      window.open('http://127.0.0.1:3001/server/goodSort/download?code=' + data.code + '&num=' + data.num)
    },
    showInvoice (data) {
      this.$refs['invoicePdf'].show(data)
    },
    sendMail () {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择发票')
      } else {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          let arrays = []
          this.selectData.forEach(el => arrays.push(el.id))
          this.$store.dispatch('invoice/send', {
            email: value,
            invoice: arrays
          }).then((res) => {
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
    InvoicePdf
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
