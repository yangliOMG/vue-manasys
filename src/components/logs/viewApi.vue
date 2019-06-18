<template>
<div class="pop">
  <el-dialog
    title="查看详情"
    :visible.sync="dialogTableVisible"
    :width="width"
    @closed="closed">
    <el-form ref="form" :model="form" :label-width="formLabelWidth" style="margin:0 auto;">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="操作日期：" >
            <span>{{form.datetime}}</span>
          </el-form-item>
          <el-form-item label="接口名称：" >
            <span>{{form.interf}}</span>
          </el-form-item>
          <el-form-item label="错误信息：" >
            <span>{{form.error}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名：" >
            <span>{{form.username}}</span>
          </el-form-item>
          <el-form-item label="是否成功：" >
            <el-tag v-if="form.operate === 0">成功</el-tag>
            <el-tag v-if="form.operate === 1" type="danger">失败</el-tag>
          </el-form-item>
          <el-form-item label="申请单号：" >
            <span>{{form.applyid}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="数据详情：" >
        <span>{{form.info}}</span>
      </el-form-item>
      <el-form-item label="备注：" >
        <span>{{form.remark}}</span>
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
      default: '800px'
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
