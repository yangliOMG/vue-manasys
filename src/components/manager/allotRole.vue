<template>
  <el-dialog
    title="分配角色"
    :visible.sync="dialogTableVisible"
    :width="width"
    append-to-body
    :modal-append-to-body='false'
    @closed="closed">
    <h5 style="margin-left:32px;">用户名称： {{info.name}}</h5>
    <div style="text-align:center;">
      <el-transfer
        style="display:inline-block;text-align:left;"
        v-model="info.roleList"
        :data="allAllot"
        filterable
        :titles="['未分配', '已分配']"
        ></el-transfer>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="handler">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'allotRole',
  props: {
    width: {
      type: String,
      default: '600px'
    },
    success: {
      type: Function,
      default: function () {
        return false
      }
    },
    allAllot: {
      type: Array,
      default: function (data) {
        return []
      }
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      info: {
        name: '',
        roleList: []
      },
      successed: false
    }
  },
  methods: {
    show (data = {name: '用户', roleList: []}) {
      this.info = data
      this.dialogTableVisible = true
    },
    handler () {
      this.$store.dispatch('manager/allotRole', this.info.roleList).then((res) => {
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
    },
    closed () {
      if (this.successed) {
        this.successed = false
        this.success()
      }
    }
  }
}
</script>
<style lang="less" scoped>
h5{
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
