<template>
  <el-dialog
    title="详情"
    :visible.sync="dialogTableVisible"
    :width="width"
    style="min-width:950px;"
    append-to-body
    :modal-append-to-body="false"
    @closed="closed"
  >
    <div class="c-black6">
      <div class="pb-25">
        <span>名称：</span>
        <span class="c-blacka">{{li.name}}</span>
        <span class="pl-20">泵位：</span>
        <span class="c-blacka">{{li.no}}</span>
        <span class="pl-20">水泵型号：</span>
        <span class="c-blacka">{{item.no}}</span>
        <span class="pl-20">拓扑：</span>
        <img :src="require('@/images/37.png')" alt>
      </div>
      <table class="table table-bordered table-blue text-center mb-20">
        <thead>
          <tr class="deblue">
            <td>品牌</td>
            <td>类型</td>
            <td>叶轮直径</td>
            <td v-if="item.frequencyType==0">变频单位</td>
            <td v-if="item.frequencyType==0">转速：最大-最小</td>
            <td v-if="item.frequencyType==1">转速</td>
            <td>工作点：转速-扬程-流量-轴功率</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{item.no||"-"}}</td>
            <td>{{item.typeName||"-"}}</td>
            <td>{{item.impellerDiameter||"-"}}mm</td>
            <td v-if="item.frequencyType==0">{{item.frequencyUnit||"-"}}Hz</td>
            <td v-if="item.frequencyType==0">{{item.maxSpeed||"?"}}-{{item.minSpeed||"?"}}rpm</td>
            <td v-if="item.frequencyType==1">{{item.pointSpeed||"-"}}rpm</td>
            <td>{{item.pointSpeed||"?"}}rpm-{{item.pointHead||"?"}}m-{{item.pointFlowRate||"?"}}m³/h-{{item.pointShaftPower||"?"}}kW</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center mt-20">
        <div class="btn btn-blue btn-stsize" @click="dialogTableVisible = false">关闭</div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'PumpDetail',
  props: {
    width: {
      type: String,
      default: function () {
        if (window.innerWidth <= 1200) {
          return '75%'
        } else {
          return '60%'
        }
      }
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      li: {},
      item: {}
    }
  },
  methods: {
    show (li, item) {
      this.li = li
      this.item = item.pumpClass
      this.dialogTableVisible = true
    },
    closed () {
    }
  }
}
</script>
<style lang="less" scoped>
</style>
