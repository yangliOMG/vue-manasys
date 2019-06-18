<template>
<div class="pop">
  <el-dialog
    title="查看详情"
    :visible.sync="dialogTableVisible"
    :width="width"
    @closed="closed">
    <el-form ref="form" :model="form" :label-width="formLabelWidth" style="margin:0 auto;">
      <el-form-item label="操作日期：" >
      <span>{{form.logtime}}</span>
      </el-form-item>
      <el-form-item label="用户名称：" >
      <span>{{form.name}}</span>
      </el-form-item>
      <el-form-item label="日志类别：" >
      <span>{{form.logtype}}</span>
      </el-form-item>
      <el-form-item label="操作详情：" >
        <span>{{form.log}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'managerForm',
  props: {
    width: {
      type: String,
      default: '600px'
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
      form: {
      }
    }
  },
  methods: {
    show (data = {}) {
      Object.assign(this.form, data)
      this.dialogTableVisible = true
    },
    closed () {
      for (let i in this.form) {
        this.form[i] = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pop{
  /deep/ .el-form-item__content{
    word-break: break-all;
  }
}
</style>
