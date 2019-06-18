<template>
<div>
  <el-dialog
      :title="isInvoiced === 0 ? '编辑' : '查看'"
      :visible.sync="dialogTableVisible"
      :width="width"
      top="5vh"
      @closed="closed">
    <div class="pop" v-loading="loading">
      <el-form ref="form" :model="invoice" :label-width="formLabelWidth" style="margin:0 auto;">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="订单号：" >
              <span>{{invoice.orderNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单时间：" >
              <span>{{invoice.orderTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <Apply
        ref="apply"
        maxHeight='250'
        class="fromorder"
        :class="isInvoiced === 1 ? 'isInvoiced' : ''"
        :readonly="isInvoiced === 1"
        :invoiceItem="invoiceItem"
        :showHead="false"
        :payer="payer"
        :operating="operating"
        :seller="seller"/>
      <!-- <AddItem @addItem="addItem" ref="AddItem"/> -->
    </div>
    <div slot="footer" class="dialog-footer">
      <div v-if="isInvoiced === 1">
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
      <div v-else>
        <el-button size="small" type="primary" @click="$refs['AddItem'].show()">添加发票行</el-button>
        <el-button size="small" type="success" @click="editBtn">编辑发票行</el-button>
        <el-button size="small" type="danger" @click="delBtn">删除发票行</el-button>
        <el-tooltip class="item" effect="dark" content="保存编辑内容，稍后开票" placement="top-end">
          <el-button size="small" type="primary" @click="save">保存修改</el-button>
        </el-tooltip>
        <el-button size="small" type="primary" @click="open">开发票</el-button>
      </div>
    </div>
  </el-dialog>
  <AddItem
    @addItem="addItem"
    ref="AddItem"/>
</div>
</template>

<script>
import Apply from '@/components/invoice/apply'
import AddItem from '@/components/invoice/AddItem'
import { round2 } from '@/js/util.js'
export default {
  name: 'orderView',
  props: {
    width: {
      type: String,
      default: '1000px'
    },
    formLabelWidth: {
      type: String,
      default: '100px'
    },
    success: {
      type: Function,
      default: function () {
        return false
      }
    }
  },
  data () {
    return {
      loading: false,
      dialogTableVisible: false,
      isInvoiced: 0,
      invoiceItem: [],
      select: -1,
      payer: {},
      seller: {},
      operating: {},
      invoice: {
        orderNum: '',
        orderTime: ''
      }
    }
  },
  methods: {
    show (data) {
      this.isInvoiced = data.isInvoiced
      this.dialogTableVisible = true
      this.loading = true
      this.$store.dispatch('order/info', { id: data.id }).then((res) => {
        this.loading = false
        if (res.data.status === 1) {
          let { orderNum, orderTime } = res.data.data.invoice
          let { companyName, companyTaxno, companyPhone, companyAddr, companyBank, companyAccount } = res.data.data.invoice
          let { payerName, payerId } = res.data.data.invoice
          let { remark, checker, drawer, payee } = res.data.data.invoice
          this.invoice = {
            orderNum,
            orderTime
          }
          this.seller = {
            name: companyName,
            taxno: companyTaxno,
            address: companyPhone,
            phone: companyAddr,
            bank: companyBank,
            account: companyAccount
          }
          this.payer = {
            name: payerName,
            taxno: payerId
          }
          this.operating = {
            remark,
            checker,
            drawer,
            payee
          }
          res.data.data.itemList.forEach((el) => {
            el.taxRate = Number(el.taxRate).mul(100)
            el.totalWithTax = round2(Number(el.preTaxTotal).add(el.tax))
            el.tax = round2(el.tax)
            el.total = round2(el.preTaxTotal)
          })
          this.invoiceItem = res.data.data.itemList
        }
      })
    },
    addItem (data, add = true) {
      if (add) {
        this.invoiceItem = this.invoiceItem.concat(data)
      } else {
        this.invoiceItem.splice(this.select, 1, data[0])
        if (data[1]) {
          this.invoiceItem.splice(this.select + 1, 1, data[1])
        }
        this.select = -1
      }
    },
    editBtn () {
      let row = this.$refs['apply'].getSelect()
      let { hasDiscount, isDiscount } = row
      if (row !== -1) {
        this.$refs['apply'].setCurrentRow()
        this.$refs['apply'].clearSelection()
        let data = []
        for (let i = 0; i < this.invoiceItem.length; i++) {
          if (this.invoiceItem[i].name === row.name && this.invoiceItem[i].total === row.total) {
            data.push(this.invoiceItem[i])
            this.select = i
            if (hasDiscount) {
              data.push(this.invoiceItem[i + 1])
            } else if (isDiscount) {
              data.unshift(this.invoiceItem[i - 1])
              this.select--
            } else {
              data.push({})
            }
            this.$refs['AddItem'].show('edit', data)
            return
          }
        }
      } else {
        this.$message.warning('请选择发票行')
      }
    },
    delBtn () {
      let row = this.$refs['apply'].getSelect()
      if (row !== -1) {
        this.$refs['apply'].clearSelection()
        for (let i = 0; i < this.invoiceItem.length; i++) {
          if (this.invoiceItem[i].name === row.name && this.invoiceItem[i].total === row.total) {
            if (this.invoiceItem[i].hasDiscount) {
              this.invoiceItem.splice(i, 2)
            } else if (this.invoiceItem[i].isDiscount) {
              this.invoiceItem.splice(i, 1)
              this.invoiceItem[i - 1].hasDiscount = false
            } else {
              this.invoiceItem.splice(i, 1)
            }
            return false
          }
        }
      } else {
        this.$message.warning('请选择发票行')
      }
    },
    open () {
      if (!this.$refs['apply'].validate()) {
        this.$message.warning('请填写抬头')
        return false
      } else if (this.invoiceItem.length === 0) {
        this.$message.warning('请添加发票行')
        return false
      } else if (this.$refs['apply'].operating.drawer === '') {
        this.$message.warning('请填写开票人')
        return false
      }
      let data = {
        payer: this.$refs['apply'].payer,
        seller: this.$refs['apply'].seller,
        operating: this.$refs['apply'].operating,
        item: this.invoiceItem
      }
      this.$store.dispatch('invoice/open', data).then((res) => {
        if (res.data.status === 1) {
          this.$notify({
            title: '成功',
            message: res.data.msg,
            type: 'success'
          })
          this.successed = true
          this.dialogTableVisible = false
        } else {
          this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    save () {
      let data = {
        payer: this.$refs['apply'].payer,
        seller: this.$refs['apply'].seller,
        operating: this.$refs['apply'].operating,
        item: this.invoiceItem
      }
      this.$store.dispatch('order/edit', data).then((res) => {
        if (res.data.status === 1) {
          this.$notify({
            title: '成功',
            message: res.data.msg,
            type: 'success'
          })
          this.successed = true
          this.dialogTableVisible = false
        } else {
          this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    closed () {
      this.invoiceItem = []
      for (let i in this.invoice) {
        this.invoice[i] = ''
      }
      if (this.successed) {
        this.successed = false
        this.success()
      }
    }
  },
  components: {
    Apply,
    AddItem
  }
}
</script>
<style lang="less" scoped>
.pop{
  .fromorder{
    /deep/ .invoice{
      border: 0;
      box-shadow: none;
      padding: 0;
    }
  }
  /deep/ .el-form-item__content{
    word-break: break-all;
  }
  .isInvoiced{
    /deep/ .invoice .footer .part input{
      border-bottom: 0;
    }
    /deep/ .invoice .body .top .area li .inputBox{
      input{
        border-bottom: 0;
      }
      .payerInput input{
        border-bottom: 0;
      }
      .el-input.is-disabled .el-input__inner{
        background-color: #fff;
      }
    }
  }
}
</style>
