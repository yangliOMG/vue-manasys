<template>
<div class="content">
  <Apply
    ref="apply"
    :invoiceItem="invoiceItem"/>
  <AddItem
    @addItem="addItem"
    ref="AddItem"/>
  <div class="btnBox">
    <el-button size="small" type="primary" @click="$refs['AddItem'].show()">添加发票行</el-button>
    <el-button size="small" type="warning" @click="editBtn">编辑发票行</el-button>
    <el-button size="small" type="danger" @click="delBtn">删除发票行</el-button>
    <el-button size="small" type="success" @click="open">开 票</el-button>
  </div>
</div>
</template>
<script>
// import demo from '@/store/modules/demo.js'
import Apply from '@/components/invoice/apply'
import AddItem from '@/components/invoice/AddItem'
export default {
  name: 'apply',
  data () {
    return {
      invoiceItem: [],
      select: -1
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
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
        } else {
          this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    }
  },
  components: {
    Apply,
    AddItem
  }
}
</script>
<style lang="less" scoped>
.content{
  .btnBox{
    max-width: 1300px;
    min-width: 900px;
    margin:0 auto;
    padding: 20px 0;
  }
}
</style>
