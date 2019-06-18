<template>
  <el-dialog
    :title="type === 'add'?'添加商品':'编辑商品'"
    :visible.sync="dialogTableVisible"
    :width="width"
    append-to-body
    :modal-append-to-body='false'
    @closed="closed">
    <div class="goodsPop">
      <el-row type="flex">
        <el-col :span="12">
          <el-input
            style="margin-bottom:15px;"
            size="small"
            placeholder="输入关键字进行过滤"
            clearable
            v-model="filterText">
            <el-button slot="append" @click="searchGoods">搜索</el-button>
          </el-input>
          <el-tree
            v-show="!searchModel"
            style="padding-left:20px;"
            :data="goodsData"
            :props="defaultProps"
            :load="loadNode"
            :indent="5"
            lazy
            @node-click="handleNodeClick">
          </el-tree>
          <el-tree
            v-loading="loadTree"
            v-show="searchModel"
            style="padding-left:20px;"
            :data="goodsSearchData"
            :props="defaultProps"
            :indent="5"
            :default-expand-all="true"
            @node-click="handleNodeClick">
          </el-tree>
        </el-col>
        <el-col :span="12">
          <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth" size="small">
            <el-form-item label="商品名称：" prop="name">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品编码：" prop="goodsNo">
              <el-input v-model="form.goodsNo" autocomplete="off" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="税控商品名称：">
              <span>{{form.classifyName}}</span>
            </el-form-item>
            <el-form-item label="税控编码：">
              <span>{{form.taxNo}}</span>
            </el-form-item>
            <el-form-item label="简介：">
              <el-tooltip :disabled="form.info.length <= 15" :content="form.info" placement="top">
                <span class="overhide">{{form.info}}</span>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="税率：" prop="taxRate">
              <el-input v-model="taxRate2" autocomplete="off" placeholder="请输入商品税率">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="所属企业：" prop="cid">
              <el-select v-model="form.cid" @change="changeCompany" placeholder="请选择企业" style="width:100%;">
                <el-option
                  v-for="item in companyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属营业点：" prop="oid">
              <el-select v-model="form.oid" :loading="outletLoading" placeholder="请先选择公司" style="width:100%;">
                <el-option
                  v-for="item in outletList"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优惠政策：">
              <el-radio v-model="form.preferential" :label="0">不使用</el-radio>
              <el-radio v-model="form.preferential" :label="1">使用</el-radio>
            </el-form-item>
            <el-form-item label="优惠政策类型：">
              <el-select :disabled="form.preferential === 0" v-model="form.special" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in specialKinds"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="免税类型：">
              <el-select v-model="form.zeroTaxFlag" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in zeroTaxFlagKinds"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
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
      default: '900px'
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
      filterText: '',
      searchModel: false,
      loadTree: false,
      goodsData: [],
      goodsSearchData: [],
      defaultProps: {
        // isLeaf: 'leaf',
        label: 'goodsname',
        children: 'children'
      },
      outletList: [],
      outletLoading: false,
      form: {
        name: '',
        goodsNo: '',
        classifyName: '',
        taxNo: '',
        info: '',
        taxRate: '',
        preferential: 0,
        special: '',
        zeroTaxFlag: '',
        cid: '',
        oid: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { pattern: new RegExp(reg.name), message: '商品名称不合法', trigger: 'blur' }
        ],
        goodsNo: [
          { required: true, message: '请输入分类编码', trigger: 'blur' },
          { pattern: new RegExp('^[0-9]{0,20}$'), message: '请输入数字,小于10位', trigger: 'blur' }
        ],
        taxRate: [
          { required: true, message: '请输入商品税率', trigger: 'blur' }
        ],
        cid: [
          { required: true, message: '请选择所属公司', trigger: 'change' }
        ],
        oid: [
          { required: true, message: '请选择所属营业点', trigger: 'change' }
        ]
      },
      type: '',
      successed: false
    }
  },
  watch: {
    'form.preferential' (val) {
      if (val === 0) {
        this.form.special = ''
      }
    },
    filterText (val) {
      if (val === '') {
        this.searchModel = false
      }
    }
  },
  computed: {
    ...mapState({
      companyList: state => state.common.company.selector,
      specialKinds: state => state.goods.specialKinds,
      zeroTaxFlagKinds: state => state.goods.zeroTaxFlagKinds
    }),
    taxRate2: {
      get: function () {
        if (this.form.taxRate === '') {
          return ''
        } else {
          return Number(this.form.taxRate).mul(100)
        }
      },
      set: function (v) {
        this.form.taxRate = v / 100
      }
    }
  },
  mounted () {
    this.$store.dispatch('common/companySelector')
    // /server/goodsort/treeList?
  },
  methods: {
    show (type = 'add', data = {}) {
      this.type = type
      if (type !== 'add') {
        Object.assign(this.form, data)
        this.filterText = data.classifyName
        this.searchGoods()
        this.changeCompany(false)
      }
      this.dialogTableVisible = true
    },
    loadNode (node, resolve) {
      let taxcode = null
      if (node instanceof Object) {
        taxcode = node.data.taxcode
      }
      this.$store.dispatch('goods/treeList', {
        taxcode
      }).then((res) => {
        if (res.data.status === 1) {
          res.data.data.forEach((v) => {
            if (v.item === '') {
              v.leaf = false
            } else {
              v.leaf = true
            }
          })
          resolve(res.data.data)
        }
      }).catch((err) => {
        resolve([])
        this.$notify({
          title: '错误',
          dangerouslyUseHTMLString: true,
          message: err.response.data,
          type: 'error'
        })
      })
    },
    searchGoods () {
      if (this.filterText !== '') {
        this.searchModel = true
        this.loadTree = true
        this.$store.dispatch('goods/treeSearch', {
          name: this.filterText
        }).then((res) => {
          this.loadTree = false
          if (res.data.status === 1) {
            this.goodsSearchData = res.data.data
          }
        }).catch((err) => {
          this.loadTree = false
          this.$notify({
            title: '错误',
            dangerouslyUseHTMLString: true,
            message: err.response.data,
            type: 'error'
          })
        })
      }
    },
    handleNodeClick (data) {
      if (!data.children) {
        this.form.classifyName = data.goodsname
        this.form.taxNo = data.taxcode
        this.form.info = data.item
      } else {
        this.form.classifyName = ''
        this.form.goodsNo = ''
        this.form.info = ''
      }
    },
    changeCompany (empty = true) {
      this.outletLoading = true
      if (empty) {
        this.form.oid = ''
      }
      this.$store.dispatch('common/outletSelector').then((res) => {
        this.outletLoading = false
        if (res.data.status === 1) {
          this.outletList = res.data.data
        }
      })
    },
    querySearch (queryString, cb) {
      let taxRateKinds = this.taxRateKinds
      let results = queryString ? taxRateKinds.filter((el) => {
        return el.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }) : taxRateKinds
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handler () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.form.classifyName === '') {
          this.$message.warning('请选择商品税控编码')
          return false
        }
        let uri = (this.type === 'add') ? 'goods/add' : 'goods/edit'
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
.goodsPop{
  .overhide{
    width: 100%;
    display: inline-block;
    .overpoint;
  }
  /deep/ .el-tree-node__label{
    font-size: 12px;
  }
  /deep/ .el-tree{
    height: 460px;
    overflow: auto;
  }
}
</style>
