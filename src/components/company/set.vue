<template>
  <el-dialog
    title="设置"
    :visible.sync="dialogTableVisible"
    :width="width"
    append-to-body
    :modal-append-to-body='false'
    @closed="closed">
    <el-form ref="form" :model="form" :label-width="formLabelWidth" label-position="left" style="margin:0 50px;">
      <el-form-item label="启用延时开票：" >
        <el-switch
          v-model="form.disabled"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66">
        </el-switch>
      </el-form-item>
      <el-form-item label="延迟开票天数:" >
        <el-input-number
          :disabled="form.disabled === 0"
          v-model="form.day"
          size="small"
          controls-position="right"
          :precision="0"
          :min="0"
          :max="15">
        </el-input-number>
      </el-form-item>
      <el-form-item label="开票时间：" >
        <el-time-picker
          :disabled="form.disabled === 0"
          v-model="form.time"
          value-format='HH:mm'
          :picker-options="{
            format: 'HH:mm'
          }"
          placeholder="任意时间点">
        </el-time-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="handler">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'companySet',
  props: {
    width: {
      type: String,
      default: '500px'
    },
    formLabelWidth: {
      type: String,
      default: '120px'
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
        disabled: '',
        day: '',
        time: ''
      },
      successed: false
    }
  },
  computed: {
    ...mapState({
      businessKinds: state => state.company.businessKinds
    })
  },
  methods: {
    show (data = {}) {
      Object.assign(this.form, data)
      this.dialogTableVisible = true
    },
    handler () {
      this.$store.dispatch('company/set', this.form).then((res) => {
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
      for (let i in this.form) {
        this.form[i] = ''
      }
      this.$refs['form'].clearValidate()
      if (this.successed) {
        this.successed = false
        this.success()
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
