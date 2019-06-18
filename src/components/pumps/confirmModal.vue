<template>
  <el-dialog
    :title="title || '确认框'"
    :visible.sync="dialogTableVisible"
    width="350px"
    style="min-width:350px;"
    append-to-body
    :modal-append-to-body="false"
    @closed="closed"
  >
    <div class="pt-10 pb-20 text-center">{{info}}</div>
    <div class="text-center">
      <div class="btn btn-default btn-stsize mr-20" @click="dialogTableVisible = false">取消</div>
      <div class="btn btn-blue btn-stsize" @click="clickSure">确认</div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ConfirmModal',
  data () {
    return {
      dialogTableVisible: false,
      title: '',
      info: ''
    }
  },
  methods: {
    show (title, info, callback) {
      this.dialogTableVisible = true
      this.title = title
      this.info = info
      this.callback = callback
    },
    clickSure () {
      this.callback()
      this.dialogTableVisible = false
    },
    closed () {
    }
  }
}
</script>
<style lang="less" scoped>
</style>
