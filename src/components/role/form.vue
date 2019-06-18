<template>
  <el-dialog
    :title="type === 'add'?'添加用户':'编辑用户'"
    :visible.sync="dialogTableVisible"
    :width="width"
    append-to-body
    :modal-append-to-body='false'
    @closed="closed">
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注：" >
        <el-input v-model="form.info" autocomplete="off" placeholder="请输入备注信息"></el-input>
      </el-form-item>
      <el-form-item label="所属公司：">
        <el-select
          v-model="form.cname"
          :loading="companyLoading"
          placeholder="请选择"
          style="width:100%;"
          clearable
          @change="changeCompany">
          <el-option
            v-for="item in company.selector"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属营业点：">
        <el-transfer
          v-loading="transferLoading"
          v-model="form.oid"
          filterable
          :data="outlet"
          :titles="['未分配', '已分配']"
          ></el-transfer>
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
import { mapState } from 'vuex'
export default {
  name: 'managerForm',
  props: {
    width: {
      type: String,
      default: '700px'
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
      transferLoading: false,
      companyLoading: false,
      outlet: [],
      form: {
        name: '',
        info: '',
        cid: '',
        cname: '',
        oid: []
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { pattern: new RegExp(reg.name), message: '用户名称不合法', trigger: 'blur' }
        ]
      },
      type: '',
      successed: false
    }
  },
  watch: {
    'form.cid': function (val) {
      this.company.selector.forEach((el) => {
        if (el.value === val) {
          this.form.cname = el.label
          this.changeCompany(val, false)
          return false
        }
      })
    }
  },
  computed: {
    ...mapState({
      company: state => state.common.company
    })
  },
  mounted () {
    if (!this.company.done) {
      this.companyLoading = true
      this.$store.dispatch('common/companySelector').then(() => {
        this.companyLoading = false
      })
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
    changeCompany (opt, emptytransfer = true) {
      this.transferLoading = true
      if (emptytransfer) {
        this.form.oid = []
      }
      this.$store.dispatch('common/outletSelector').then((res) => {
        this.transferLoading = false
        if (res.data.status === 1) {
          this.outlet = res.data.data
        }
      })
    },
    handler () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        let uri = (this.type === 'add') ? 'role/add' : 'role/edit'
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
      this.form = {
        name: '',
        info: '',
        cid: '',
        oid: []
      }
      this.outlet = []
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
