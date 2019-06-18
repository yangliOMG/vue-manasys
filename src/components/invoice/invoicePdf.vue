<template>
<div class="pop">
  <el-dialog
    title="pdf浏览"
    :visible.sync="dialogTableVisible"
    :width="width"
    top='10vh'
    custom-class="invoiceView"
    :modal-append-to-body='false'
    @closed="closed">
    <div class="box" element-loading-text="加载中" v-loading="loading">
      <iframe
        v-show="!loading"
        @load="loaded"
        :src="src"
        width="100%"
        height="100%"
        frameborder="0">
      </iframe>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'invoicepdf',
  props: {
    width: {
      type: String,
      default: '75%'
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
      src: 'http://einv.app.zhenshang.com/invms/invoice/print/a8a716f75ee74c80.pdf',
      loading: true
    }
  },
  methods: {
    show (data = {}) {
      this.src = 'http://einv.app.zhenshang.com/invms/invoice/print/a8a716f75ee74c80.pdf?id=' + data.id
      this.dialogTableVisible = true
    },
    closed () {
      this.loading = true
    },
    loaded () {
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.pop{
  /deep/ .invoiceView .el-dialog__body{
    height: 70vh;
    .box{
      height: 100%;
    }
  }
}
</style>
