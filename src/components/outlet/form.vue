<template>
  <el-dialog
    :title="type === 'add'?'添加营业点':'编辑营业点'"
    :visible.sync="dialogTableVisible"
    :width="width"
    append-to-body
    :modal-append-to-body='false'
    @closed="closed">
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth" label-position="left" style="margin:0 50px;">
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="营业点名称：" prop="name">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入营业点名称"></el-input>
          </el-form-item>
          <el-form-item label="所属企业：">
            <el-select
              v-model="form.cid"
              :loading="!company.done"
              placeholder="请选择"
              style="width:100%;"
              clearable>
              <el-option
                v-for="item in company.selector"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="form.addr" autocomplete="off" placeholder="请输入营业点地址"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="phone">
            <el-input v-model="form.phone" autocomplete="off" placeholder="请输入营业点电话"></el-input>
          </el-form-item>
          <el-form-item label="开户行：">
            <el-input v-model="form.bank" autocomplete="off" placeholder="请输入开户行"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：" prop="bankId">
            <el-input v-model="form.bankId" autocomplete="off" placeholder="请输入银行账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业点识别号:" prop="num">
            <el-input v-model="form.num" autocomplete="off" placeholder="请输入纳税人识别号"></el-input>
          </el-form-item>
          <el-form-item label="默认收款人：">
            <el-input v-model="form.payee" autocomplete="off" placeholder="请输入开户行"></el-input>
          </el-form-item>
          <el-form-item label="默认复核人：">
            <el-input v-model="form.checker" autocomplete="off" placeholder="请输入银行账号"></el-input>
          </el-form-item>
          <el-form-item label="上传发票章：">
            <el-upload
              class="outletStamp"
              action="/api/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.logoUrl !== ''" :src="form.logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
import { mapState } from 'vuex'
import { reg } from '@/js/validateMap.js'
export default {
  name: 'outletForm',
  props: {
    width: {
      type: String,
      default: '800px'
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
        name: '',
        num: '',
        addr: '',
        phone: '',
        bank: '',
        bankId: '',
        payee: '',
        checker: '',
        cid: '',
        logoUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入营业点名称', trigger: 'blur' },
          { pattern: new RegExp(reg.name), message: '营业点名称不合法', trigger: 'blur' }
        ],
        num: [
          { pattern: new RegExp('^[0-9]{0,10}$'), message: '税号不合法', trigger: 'blur' }
        ],
        phone: [
          { pattern: new RegExp(reg.telphone), message: '电话格式不合法', trigger: 'blur' }
        ],
        bankId: [
          { pattern: new RegExp(reg.titlAccount), message: '银行账号不合法', trigger: 'blur' }
        ]
      },
      type: '',
      successed: false
    }
  },
  computed: {
    ...mapState({
      company: state => state.common.company
    })
  },
  methods: {
    show (type = 'add', data = {}) {
      this.type = type
      if (type !== 'add') {
        Object.assign(this.form, data)
      }
      this.dialogTableVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.form.logoId = res.data
      this.form.logoUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handler () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        let uri = (this.type === 'add') ? 'outlet/add' : 'outlet/edit'
        this.$store.dispatch(uri, this.form).then((res) => {
          if (res.data.status === 1) {
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            })
            this.dialogTableVisible = false
            this.successed = true
          } else {
            this.$notify({
              title: '错误',
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      })
    },
    closed () {
      for (let i in this.form) {
        this.form[i] = ''
      }
      this.type = ''
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
.outletStamp{
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 80px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 80px;
    display: block;
  }
}
</style>
