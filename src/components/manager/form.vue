<template>
  <el-dialog
    :title="type === 'add'?'添加用户':'编辑用户'"
    :visible.sync="dialogTableVisible"
    :width="width"
    append-to-body
    :modal-append-to-body='false'
    @closed="closed">
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth" style="max-width:500px;margin:0 auto;">
      <el-form-item label="用户名称：" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户名称"></el-input>
      </el-form-item>
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="form.account" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="登录密码：" prop="password">
        <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="repassword">
        <el-input v-model="form.repassword" autocomplete="off" placeholder="请确认密码" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="handler">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { reg } from '@/js/validateMap.js'
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogTableVisible: false,
      form: {
        name: '',
        account: '',
        password: '',
        repassword: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { pattern: new RegExp(reg.name), message: '用户名称不合法', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { pattern: new RegExp(reg.account), message: '登录账号不合法', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { pattern: new RegExp(reg.password), message: '密码包含非法字符', trigger: 'blur' }
        ],
        repassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      type: '',
      successed: false
    }
  },
  methods: {
    show (type = 'add', data = {}) {
      this.type = type
      if (type !== 'add') {
        Object.assign(this.form, data)
      }
      this.dialogTableVisible = true
    },
    handler () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        let uri = (this.type === 'add') ? 'manager/add' : 'manager/edit'
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
