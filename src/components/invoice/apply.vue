<template>
  <div id="invoice">
    <div class="invoice">
      <div class="header" v-show="showHead">
        <el-row type="flex" justify="space-between">
          <el-col :span="6" style="align-self: flex-end;">
            <div class="left">
              <img :src="require('@/images/QR.png')" alt="">
              机器编号：
            </div>
          </el-col>
          <el-col :span="12">
            <div class="top">
              <h5>山东增值税电子普通发票</h5>
              <img :src="require('@/images/3700.png')" alt="">
            </div>
          </el-col>
          <el-col :span="6" style="align-self: flex-end;">
            <div class="right">
              <dl>
                <dt>发票代码<span></span></dt>
                <dt>发票号码<span></span></dt>
                <dt>开票日期<span></span></dt>
                <dt>校验码<span></span></dt>
              </dl>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <div class="top">
          <div class="title">购买方</div>
          <ul class="area">
            <li>
              <p>名称<span></span></p>
              <div class="inputBox">
                <!-- <input type="text"> -->
                <el-select
                  class="payerInput"
                  v-model="payer.name"
                  :disabled="readonly"
                  filterable
                  remote
                  autocomplete="off"
                  placeholder=""
                  :remote-method="remoteMethod"
                  allow-create>
                  <el-option
                    v-for="item in payerNameAll.list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li>
              <p>纳税人识别号<span></span></p>
              <div class="inputBox">
                <input type="text" v-model="payer.taxno" autocomplete="off" :readonly="readonly">
              </div>
            </li>
            <li>
              <p>地址、电话<span></span></p>
              <div class="inputBox">
                <input type="text" v-model="payer.address" autocomplete="off" :readonly="readonly">
                <input type="text" v-model="payer.phone" autocomplete="off" :readonly="readonly">
              </div>
            </li>
            <li>
              <p>开户行及账号<span></span></p>
              <div class="inputBox">
                <input type="text" v-model="payer.bank" autocomplete="off" :readonly="readonly">
                <input type="text" v-model="payer.account" autocomplete="off" :readonly="readonly">
              </div>
            </li>
          </ul>
          <div class="title">密码区</div>
          <div class="area noright">
          </div>
        </div>
        <div class="table">
          <el-table
            id="invoiceApplyTable"
            ref="table"
            :data="item"
            :max-height="maxHeight"
            border
            size="mini"
            highlight-current-row
            :header-cell-style="headerstyle"
            cell-class-name="td"
            @row-click="rowClick"
            show-summary
            :summary-method="getSummaries"
            :cell-style="cellstyle">
            <el-table-column
              prop="name"
              width="245"
              show-overflow-tooltip
              :resizable="false"
              label="货物或应税劳务、服务名称">
            </el-table-column>
            <el-table-column
              prop="spec"
              min-width="95"
              :resizable="false"
              align="right"
              label="规格型号">
            </el-table-column>
            <el-table-column
              prop="unit"
              min-width="60"
              :resizable="false"
              align="right"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="qty"
              min-width="70"
              :resizable="false"
              show-overflow-tooltip
              align="right"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="price"
              min-width="110"
              :resizable="false"
              show-overflow-tooltip
              align="right"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="total"
              min-width="100"
              :resizable="false"
              show-overflow-tooltip
              align="right"
              label="金额">
            </el-table-column>
            <el-table-column
              prop="taxRate"
              min-width="60"
              :resizable="false"
              show-overflow-tooltip
              align="right"
              label="税率">
              <template slot-scope="scope">
                {{scope.row.taxRate}} %
              </template>
            </el-table-column>
            <el-table-column
              prop="tax"
              min-width="85"
              align="right"
              label="税额">
            </el-table-column>
          </el-table>
          <el-table
            id="invoiceApplyTable"
            :data="heji"
            border
            style="border-top:2px solid #9E520A;"
            :show-header="false"
            size="mini"
            :cell-style="cellstyle2">
            <el-table-column
              prop="name"
              :resizable="false"
              width="245">
            </el-table-column>
            <el-table-column
              prop="daxie"
              :resizable="false"
              min-width="215">
              <template slot-scope="scope">
                <span class="icon-round">×</span>
                <span style="vertical-align: middle;">{{scope.row.daxie}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="xiaoxie"
              align="right"
              :resizable="false"
              min-width="210">
              <template slot-scope="scope">
                <span style="color:#9E520A;">（小写） </span>¥ {{scope.row.xiaoxie}}
              </template>
            </el-table-column>
            <el-table-column
              min-width="145">
            </el-table-column>
          </el-table>
        </div>
        <div class="bottom">
          <div class="title">销售方</div>
          <ul class="area">
            <li>
              <p>名称<span></span></p>
              <div class="inputBox">
                <el-tooltip
                  :content="seller.name"
                  :disabled="sellerToolTip.sname"
                  placement="top-start">
                  <span id='sname'>{{seller.name}}</span>
                </el-tooltip>
              </div>
            </li>
            <li>
              <p>纳税人识别号<span></span></p>
              <div class="inputBox">
                <el-tooltip
                  :content="seller.taxno"
                  :disabled="sellerToolTip.staxno"
                  placement="top-start">
                  <span id='staxno'>{{seller.taxno}}</span>
                </el-tooltip>
              </div>
            </li>
            <li>
              <p>地址、电话<span></span></p>
              <div class="inputBox">
                <el-tooltip
                  :content="seller.address"
                  :disabled="sellerToolTip.saddress"
                  placement="top-start">
                  <span id='saddress'>{{seller.address}}</span>
                </el-tooltip>
                <el-tooltip
                  :content="seller.phone"
                  :disabled="sellerToolTip.sphone"
                  placement="top-start">
                  <span id='sphone'>{{seller.phone}}</span>
                </el-tooltip>
              </div>
            </li>
            <li>
              <p>开户行及账号<span></span></p>
              <div class="inputBox">
                <el-tooltip
                  :content="seller.bank"
                  :disabled="sellerToolTip.sbank"
                  placement="top-start">
                  <span id='sbank'>{{seller.bank}}</span>
                </el-tooltip>
                <el-tooltip
                  :content="seller.account"
                  :disabled="sellerToolTip.saccount"
                  placement="top-start">
                  <span id='saccount'>{{seller.account}}</span>
                </el-tooltip>
              </div>
            </li>
          </ul>
          <div class="title" style="line-height:38px;">备注</div>
          <div class="area noright">
            <textarea name="" v-model="operating.remark" :readonly="readonly"></textarea>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="part">
          <span>收款人：</span>
          <input type="text" v-model="operating.payee" autocomplete="off" :readonly="readonly">
        </div>
        <div class="part">
          <span>复核：</span>
          <input type="text" v-model="operating.checker" autocomplete="off" :readonly="readonly">
        </div>
        <div class="part">
          <span>开票人：</span>
          <input type="text" v-model="operating.drawer" autocomplete="off" :readonly="readonly">
        </div>
        <div class="part">
          <span>销售方：（章）</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DX } from '@/js/util.js'
export default {
  name: 'apply',
  props: {
    showHead: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: String,
      default: '100%'
    },
    invoiceItem: {
      type: Array,
      default: function () {
        return []
      }
    },
    payer: {
      type: Object,
      default: function () {
        return {
          name: '',
          taxno: '',
          address: '',
          phone: '',
          bank: '',
          account: ''
        }
      }
    },
    seller: {
      type: Object,
      default: function () {
        return {
          name: '烟台福山区振华商厦有限公司烟台福山区振华商厦',
          taxno: '913706116680796603',
          address: '福山区城里街147号',
          phone: '6305158',
          bank: '福山农行营业部',
          account: '345101040007866345101040007866'
        }
      }
    },
    operating: {
      type: Object,
      default: function () {
        return {
          payee: '',
          checker: '',
          drawer: '',
          remark: ''
        }
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      payerNameAll: {
        list: [],
        value: '',
        limit: 20,
        page: 1,
        disabled: false,
        loading: false,
        ajaxing: false,
        first: true
      },
      total: {
        total: 0,
        tax: 0
      },
      select: -1,
      sellerToolTip: {
        sname: false,
        staxno: false,
        saddress: false,
        sphone: false,
        sbank: false,
        saccount: false
      }
    }
  },
  watch: {
  },
  computed: {
    item () {
      return this.invoiceItem
    },
    heji () {
      let total = Number(Number(this.total.total).add(this.total.tax))
      return [{
        name: '价税合计（大写）',
        daxie: DX(total),
        xiaoxie: total
      }]
    }
  },
  beforeUpdate () {
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      document.querySelectorAll('.bottom .inputBox').forEach((el) => {
        el.childNodes.forEach((v) => {
          if (v.nodeType === 1 && v.scrollWidth === v.clientWidth) {
            this.$set(this.sellerToolTip, v.getAttribute('id'), true)
          } else if (v.nodeType === 1 && v.scrollWidth !== v.clientWidth) {
            this.$set(this.sellerToolTip, v.getAttribute('id'), false)
          }
        })
      })
    },
    remoteMethod (query, ischange = true) {
      if (query !== '') {
        if (ischange) {
          this.payerNameAll.value = query
          this.payerNameAll.page = 1
          this.payerNameAll.loading = true
        }
        this.$store.dispatch('common/goodsSelector', {limit: 20, page: this.payerNameAll.page, value: query}).then((res) => {
          this.payerNameAll.loading = false
          this.payerNameAll.ajaxing = false
          if (res.data.status === 1 && ischange) {
            this.payerNameAll.list = res.data.data.list
            this.payerNameAll.page++
          } else if (res.data.status === 1 && !ischange) {
            this.payerNameAll.list = this.payerNameAll.list.concat(res.data.data.list)
            this.payerNameAll.page++
          } else {
            this.message.error(res.data.msg)
          }
        })
      } else {
        this.payerNameAll.list = []
      }
    },
    cellstyle ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 7) {
        return {'border-right': '0'}
      }
    },
    cellstyle2 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 1 || columnIndex === 2) {
        return {'border-right': '0'}
      }
    },
    headerstyle ({row, column, rowIndex, columnIndex}) {
      const style = { 'color': '#9E520A', 'font-size': '1.375em', 'text-align': 'center' }
      if (columnIndex !== 7) {
        return Object.assign(style, {'border-right': '2px solid #9E520A'})
      } else {
        return Object.assign(style, {'border-right': 0})
      }
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合 计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (index === 5 || index === 7) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return Number(prev).add(curr)
            } else {
              return prev
            }
          }, 0)
        }
      })
      this.total.total = sums[5]
      this.total.tax = sums[7]
      sums[5] = '¥ ' + sums[5]
      sums[7] = '¥ ' + sums[7]
      return sums
    },
    rowClick (row, event, column) {
      this.select = row
    },
    getSelect () {
      return this.select
    },
    clearSelection () {
      this.select = -1
      this.$refs['table'].clearSelection()
    },
    setCurrentRow () {
      this.select = -1
      this.$refs['table'].setCurrentRow()
    },
    validate () {
      if (this.payer.name === '' || this.seller.name === '') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.invoice{
  font-size: 18px;
  background-color: #fff;
  border: @border;
  padding: 1.25em 1.875em;
  color: @brown;
  font-family: @songti;
  max-width: 1300px;
  min-width: 900px;
  margin:0 auto;
  box-shadow: 3px 3px 15px 1px #ccc;
  box-sizing: border-box;
  .header{
    width: 100%;
    .left{
      color: #333;
      font-family: @allfamily;
      img{
        display: block;
        width: 90px;
        margin: 0 0 5px 10px;
      }
    }
    .top{
      position: relative;
      text-align: center;
      h5{
        position: relative;
        display: inline-block;
        font-size: 1.875em;
        font-weight: bold;
        letter-spacing:2px;
        text-align: center;
        padding-bottom: 1.3em;
        margin-bottom: 1.4em;
        &:before,&:after{
          content: '';
          position: absolute;
          left: 0;
          bottom: 2px;
          width: 100%;
          height: 2px;
          background-color: @brown;
        }
        &:after{
          bottom: -3px;
        }
      }
      img{
        position: absolute;
        top: 15px;
        left: 50%;
        margin-left: -80px;
        width: 160px;
        z-index: 1;
      }
    }
    .right{
      dt{
        position: relative;
        font-size: 1em;
        width: 80px;
        margin-bottom: 5px;
        text-align: justify;
        height:16px;
        &>span{
          display: inline-block /* Opera */;
          padding-left: 100%;
        }
        &:before{
          content: ':';
          position: absolute;
          right: -10px;
          line-height: 14px;
        }
      }

    }
  }
  .body{
    .top,.bottom{
      border: 2px solid @brown;
      height: 120px;
      .title{
        width: 4%;
        max-width: 40px;
        padding: 22px 5px;
        text-align: center;
        line-height:26px;
        box-sizing: border-box;
        border-right: 2px solid @brown;
        float: left;
      }
      .area{
        position: relative;
        float: left;
        width:46%;
        height: 100%;
        box-sizing: border-box;
        border-right: 2px solid @brown;
        padding: 10px;
        display: flex;
        flex-direction: column;
        &.noright{
          border-right: 0;
        }
        textarea{
          width: 100%;
          height:100%;
          outline: 0;
          border: 0;
          resize:none;
          line-height: 24px;
          font-size: 1em;
          font-family: @allfamily;
        }
        li{
          flex:1;
          &>p{
            position: absolute;
            line-height: 25px;
            height: 25px;
            width: 140px;
            padding-right:10px;
            font-size: 1em;
            text-align: justify;
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            &>span{
              display: inline-block /* Opera */;
              padding-left: 100%;
            }
            &:before{
              content: ':';
              float: right;
            }
          }
          .inputBox{
            display: flex;
            overflow: hidden;
            width: 100%;
            padding-left:140px;
            box-sizing: border-box;
            height: 100%;
            align-items:center;
            /deep/ .payerInput{
              width: 100%;
              padding: 0 5px;
              input{
                width: 100%;
                border-radius: 0;
                outline: 0;
                border: 0;
                border-bottom: 1px dashed #999;
                margin: 0 5px;
                color: #333;
                height: 21px;
                padding:0;
                margin: 0;
                font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
                font-size: 15.75px;
              }
            }
            span,input{
              flex: 1;
              width:100%;
              outline: 0;
              border: 0;
              border-bottom: 1px dashed #999;
              vertical-align: middle;
              margin: 0 5px;
              padding:0;
              color: #333;
              font-family: @allfamily;
              font-size:0.875em;
            }
            span{
              width:100%;
              display: inline-block;
              border-bottom: 0;
              .overpoint;
            }
          }
        }
      }
    }
    .top{
      border-bottom: 0;
    }
    .bottom{
      border-top: 0;
    }
    .table{
      border: 2px solid @brown;
      /deep/ #invoiceApplyTable{
        border-top: 0;
        &:before{
          height: 0;
        }
        &.el-table td,
        .el-table th.is-leaf{
          border-bottom: 0;
        }
        &.el-table td:last-of-type{
          border-right: 0;
        }
        &.el-table--border td,
        .el-table--border th,
        .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
          border-right: 2px solid @brown;
        }
        td{
          &:first-of-type .cell{
            text-align: left;
          }
          &:first-of-type:not(.td) .cell{
            text-align: center;
            font-family: @songti;
            color:@brown;
          }
          .cell{
            white-space: nowrap;
            font-family: @allfamily;
            font-size: 1.125em;
          }
        }
        .el-table__footer td .cell{
          text-align: right;
        }
        .el-table__body tr.current-row>td{
          background-color: #dbe8f7;
        }
      }
      .icon-round{
        display: inline-block;
        vertical-align: middle;
        width:16px;
        height:16px;
        line-height:16px;
        text-align:center;
        font-size:24px;
        border:1px solid #000;
        border-radius:50%;
      }
    }
  }
  .footer{
    padding: 10px 20px;
    display: flex;
    .part{
      flex: 1;
      display: flex;
      justify-content: center;
      input{
        outline: 0;
        border: 0;
        border-bottom: 1px dashed #999;
        vertical-align: middle;
        color: #333;
        font-family: @allfamily;
        width: 100px;
      }
    }
  }
}
</style>
