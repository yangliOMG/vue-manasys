<template>
  <el-dialog
    :title="type === 'add'?'添加发票行':'编辑发票行'"
    :visible.sync="dialogTableVisible"
    :width="width"
    style="min-width:800px;"
    append-to-body
    :modal-append-to-body='false'
    @closed="closed">
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
      <el-row :gutter="20">
        <el-col :xl="{span: 8, offset: 4}" :sm="12" :xs="24">
          <el-form-item label="开票商品：" prop="name">
            <el-select
              v-model="form.name"
              filterable
              remote
              popper-class="goodsort"
              reserve-keyword
              :remote-method="remoteMethod"
              placeholder="请选择开票商品"
              style="width:100%;"
              @focus="selectFocus"
              :loading="select.loading">
              <el-option
                v-for="item in select.list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格型号：">
            <el-input v-model="form.spec" autocomplete="off" placeholder="请输入规格型号"></el-input>
          </el-form-item>
          <el-form-item label="单位：">
            <el-input v-model="form.unit" autocomplete="off" placeholder="请输入单位"></el-input>
          </el-form-item>
          <el-form-item label="数量：" prop="qty">
            <el-input v-model="form.qty" autocomplete="off" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="总价：" prop="totalWithTax">
            <el-input v-model="form.totalWithTax" autocomplete="off" placeholder="请输入总价">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="税率：" prop="taxRate">
            <el-input v-model="form.taxRate" autocomplete="off" placeholder="请输入税率">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="{span: 8}" :sm="12" :xs="24">
          <el-form-item label="折扣率：" prop="discountType0">
            <el-input v-model="form.discountType0" autocomplete="off" placeholder="请输入折扣率">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="减免额：" prop="discountType1">
            <el-input v-model="form.discountType1" autocomplete="off" placeholder="请输入减免额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="开票金额为：">
            <div class="summation">
              <p>{{summation.totalWithoutTax}}</p>
            </div>
          </el-form-item>
          <el-form-item label="价税合计为：">
            <div class="summation">
              <p>{{summation.totalWithTax}}</p>
            </div>
          </el-form-item>
          <el-form-item label="最终为：">
            <div class="summation">
              <p>{{summation.totalWithAll}}</p>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="handler">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { reg } from '@/js/validateMap.js'
import { round2, round6 } from '@/js/util.js'
export default {
  name: 'AddItem',
  props: {
    width: {
      type: String,
      default: function () {
        if (window.innerWidth <= 1200) {
          return '75%'
        } else {
          return '50%'
        }
      }
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
      dialogTableVisible: false,
      select: {
        list: [],
        value: '',
        limit: 20,
        page: 1,
        loading: false,
        ajaxing: false,
        first: true
      },
      form: {
        name: '',
        spec: '',
        unit: '',
        qty: '',
        totalWithTax: '',
        taxRate: '',
        discountType0: '',
        discountType1: ''
      },
      rules: {
        name: [
          { required: true, message: '请选择开票商品', trigger: 'change' }
        ],
        qty: [
          { required: true, message: '请选择商品数量', trigger: 'blur' },
          { pattern: new RegExp(reg.price), message: '最多两位小数', trigger: 'blur' }
        ],
        totalWithTax: [
          { required: true, message: '请输入总价', trigger: 'blur' },
          { pattern: new RegExp(reg.price), message: '最多两位小数', trigger: 'blur' }
        ],
        taxRate: [
          { required: true, message: '请输入税率', trigger: 'blur' },
          { pattern: new RegExp(reg.price), message: '最多两位小数', trigger: 'blur' }
        ],
        discountType0: [
          { pattern: new RegExp(reg.price), message: '最多两位小数', trigger: 'blur' }
        ],
        discountType1: [
          { pattern: new RegExp(reg.price), message: '最多两位小数', trigger: 'blur' }
        ]
      },
      type: ''
    }
  },
  computed: {
    summation () {
      let { qty, totalWithTax, taxRate, discountType0, discountType1 } = this.form
      // 税率
      taxRate = isNaN(taxRate) ? 0 : taxRate
      let sl = Number(taxRate).add(100)
      // 不含折扣、含税 总价
      totalWithTax = isNaN(totalWithTax) ? 0 : totalWithTax
      // 不含折扣、不含税 总价
      let totalWithoutTax = Number(totalWithTax).div(sl).mul(100)
      // 税额
      let tax = Number(totalWithTax).sub(totalWithoutTax)
      // 单价
      qty = isNaN(qty) ? 1 : qty
      let price = Number(totalWithoutTax).div(qty)
      // 折扣率
      discountType0 = isNaN(discountType0) ? 0 : discountType0
      let zkl = Number(1).sub(Number(discountType0).div(100))
      // 含折扣、含税 总价
      discountType1 = isNaN(discountType1) ? 0 : discountType1
      let totalWithAll = Number(totalWithTax).mul(zkl).sub(discountType1)
      // 折扣额
      let discount = Number(totalWithAll).sub(totalWithTax)

      return {
        price: isNaN(price) ? '' : round6(price),
        tax: isNaN(tax) ? '' : round2(tax),
        totalWithoutTax: isNaN(totalWithoutTax) ? '' : round2(totalWithoutTax),
        totalWithTax: round2(totalWithTax),
        discount: discount,
        totalWithAll: isNaN(totalWithAll) ? '' : round2(totalWithAll)
      }
    }
  },
  methods: {
    show (type = 'add', data = []) {
      this.type = type
      if (type !== 'add') {
        let { name, spec, unit, qty, totalWithTax, taxRate } = data[0]
        let { discountType0 = '', discountType1 = '' } = data[1]
        this.form = {
          name,
          spec,
          unit,
          qty,
          totalWithTax,
          taxRate,
          discountType0,
          discountType1
        }
      }
      this.dialogTableVisible = true
    },
    remoteMethod (query, ischange = true) {
      if (query !== '') {
        if (ischange) {
          this.select.value = query
          this.select.page = 1
          this.select.loading = true
        }
        this.$store.dispatch('common/goodsSelector', {limit: 20, page: this.select.page, value: query}).then((res) => {
          this.select.loading = false
          this.select.ajaxing = false
          if (res.data.status === 1 && ischange) {
            this.select.list = res.data.data.list
            this.select.page++
          } else if (res.data.status === 1 && !ischange) {
            this.select.list = this.select.list.concat(res.data.data.list)
            this.select.page++
          } else {
            this.message.error(res.data.msg)
          }
        })
      } else {
        this.select.list = []
      }
    },
    selectFocus (event) {
      const select = document.querySelector('.goodsort .el-scrollbar__wrap')
      let that = this
      if (this.select.first) {
        this.select.first = false
        select.addEventListener('scroll', function scrollSelect () {
          let sign = 100
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign && !that.select.ajaxing) {
            that.select.ajaxing = true
            that.remoteMethod(that.select.value, false)
          }
        })
      }
    },
    handler () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        let { name, spec, unit, qty, taxRate, discountType0, discountType1 } = this.form
        let { price, tax, discount, totalWithTax, totalWithoutTax } = this.summation
        let data = [{
          name,
          spec,
          unit,
          qty,
          price,
          total: totalWithoutTax,
          totalWithTax: totalWithTax,
          taxRate: taxRate,
          tax,
          hasDiscount: false
        }]
        if (discountType0 !== '' || discountType1 !== '') {
          data[0].hasDiscount = true
          discount = isNaN(discount) ? 0 : discount
          taxRate = isNaN(taxRate) ? 0 : taxRate
          let discountTotal = Number(discount).mul(100).div(Number(taxRate).add(100))
          let discountTax = Number(discount).sub(discountTotal)
          let zk = Number(discount).div(totalWithTax).mul(-100)
          data.push({
            name: '折扣(' + round2(zk) + '%)',
            spec: '',
            unit: '',
            qty: '',
            price: '',
            total: round2(discountTotal),
            taxRate: taxRate,
            tax: round2(discountTax),
            discountType0: discountType0,
            discountType1: discountType1,
            isDiscount: true
          })
        }
        if (this.type === 'add') {
          this.$emit('addItem', data)
        } else {
          this.$emit('addItem', data, false)
        }
        this.dialogTableVisible = false
      })
    },
    closed () {
      for (let i in this.form) {
        this.form[i] = ''
      }
      this.type = ''
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      if (this.successed) {
        this.successed = false
        this.success()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.summation p{
  text-align: center;
  font-size: 38px;
  color: @green;
  .overpoint;
  &:after{
    content: ' 元';
    font-size: 24px;
    color: @gray;
  }
}
</style>
