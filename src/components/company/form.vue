<template>
  <el-dialog
    :title="type === 'add'?'添加企业':'编辑企业'"
    :visible.sync="dialogTableVisible"
    :width="width"
    append-to-body
    :modal-append-to-body='false'
    @closed="closed">
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth" label-position="left" style="margin:0 50px;">
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="企业名称：" prop="name">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号:" prop="taxno">
            <el-input v-model="form.taxno" autocomplete="off" placeholder="请输入纳税人识别号"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="form.address" autocomplete="off" placeholder="请输入企业地址"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="phone">
            <el-input v-model="form.phone" autocomplete="off" placeholder="请输入企业电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.email" autocomplete="off" placeholder="请输入企业邮箱"></el-input>
          </el-form-item>
          <el-form-item label="行业分类：">
            <el-autocomplete
              v-model="form.kind"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业代码：">
            <el-input v-model="form.code" autocomplete="off" placeholder="请输入企业代码"></el-input>
          </el-form-item>
          <el-form-item label="appid：">
            <el-input v-model="form.appid" autocomplete="off" placeholder="请确认企业appid"></el-input>
          </el-form-item>
           <el-form-item label="开户行：">
            <el-input v-model="form.bank" autocomplete="off" placeholder="请输入开户行"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：" prop="bankId">
            <el-input v-model="form.bankId" autocomplete="off" placeholder="请输入银行账号"></el-input>
          </el-form-item>
          <el-form-item label="企业logo：">
            <el-upload
              class="companyLogo"
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
  name: 'companyForm',
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
        taxno: '',
        address: '',
        phone: '',
        email: '',
        kind: '',
        code: '',
        appid: '',
        bank: '',
        bankId: '',
        logoUrl: '',
        logoId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { pattern: new RegExp(reg.name), message: '企业名称不合法', trigger: 'blur' }
        ],
        taxno: [
          { pattern: new RegExp(reg.titlTaxNo), message: '税号不合法', trigger: 'blur' }
        ],
        phone: [
          { pattern: new RegExp(reg.telphone), message: '电话格式不合法', trigger: 'blur' }
        ],
        email: [
          { pattern: new RegExp(reg.email), message: '邮箱格式不合法', trigger: 'blur' }
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
      businessKinds: state => state.company.businessKinds
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
    querySearch (queryString, cb) {
      let businessKinds = this.businessKinds
      let results = queryString ? businessKinds.filter((el) => {
        return el.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }) : businessKinds
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleAvatarSuccess (res, file) {
      this.form.logoId = res.data
      this.form.logoUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handler () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        let uri = (this.type === 'add') ? 'company/add' : 'company/edit'
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
.companyLogo{
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
    width: 80px;
    height: 80px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
}
</style>
