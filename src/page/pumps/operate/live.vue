<template>
  <div class="page-content">
    <div class="pd-10">
      <div class="body">
        <div class="canvas">
          <div class="title borderBt">
            <img class="titlePlate" :src="require('@/images/06.png')" alt>电费
            <div class="f-r">
              <span>时间粒度：</span>
              <select class>
                <option value="1">每月</option>
                <option value="2">每天</option>
                <option value="3">每时</option>
                <option value="4">30分</option>
              </select>
            </div>
          </div>
          <div class="chart" id="chart1"></div>
          <div class="countBox">
            <img class="titlePlate" :src="require('@/images/24.png')" alt>总计节省：xxxx
          </div>
        </div>
        <div class="canvas">
          <div class="title borderBt">
            <img class="titlePlate" :src="require('@/images/06.png')" alt>能耗
            <div class="f-r">
              <span>时间粒度：</span>
              <select class>
                <option value="1">每月</option>
                <option value="2">每天</option>
                <option value="3">每时</option>
                <option value="4">30分</option>
              </select>
            </div>
          </div>
          <div class="chart" id="chart2"></div>
          <div class="countBox">
            <img class="titlePlate" :src="require('@/images/24.png')" alt>总计节省：xxxx
          </div>
        </div>
        <div class="canvas">
          <div class="title borderBt">
            <img class="titlePlate" :src="require('@/images/06.png')" alt>碳排放
            <div class="f-r">
              <span>时间粒度：</span>
              <select class>
                <option value="1">每月</option>
                <option value="2">每天</option>
                <option value="3">每时</option>
                <option value="4">30分</option>
              </select>
            </div>
          </div>
          <div class="chart" id="chart3"></div>
          <div class="countBox">
            <img class="titlePlate" :src="require('@/images/24.png')" alt>总计节省：xxxx
          </div>
        </div>
      </div>
      <div class="contentBox">
        <div :class="{'pt-100': pumpsList.length==1 }">
          <div class="pumpRow" v-for="(li, index) in pumpsList" :key="li.id">
            <div style="flex:3">
              <div class="d-flex">
                <div class="pumpArea1">
                  <div class="number">{{index+1}}#</div>
                  <img :src="require('@/images/pipeH.png')">
                  <i class="arrowr arrow"></i>
                </div>
                <div class="pumpArea2">
                  <div class="pumpimg">
                    <img :src="require('@/images/pump2-1.png')" alt>
                  </div>
                  <img class="leaf leafp" :src="require('@/images/pumpLeaf.png')" alt>
                  <div class="pumpNo">SFWP100-300</div>
                </div>
                <div class="pumpArea3">
                  <table class="table table-bordered table-pump">
                    <thead>
                      <tr>
                        <td>
                          <i class="diy-icon diy-danger" ng-click="clickWaring(li.id)"></i>工作实况
                        </td>
                        <td>智能调度</td>
                      </tr>
                    </thead>
                    <tbody>
                      <td>
                        <div>转速：xxx rpm</div>
                        <div>功率：xxx rpm</div>
                        <div>扬程：xxx rpm</div>
                        <div>流量：xxx rpm</div>
                      </td>
                      <td>
                        <div>转速：xxx rpm</div>
                        <div>功率：xxx rpm</div>
                        <div>扬程：xxx rpm</div>
                        <div>流量：xxx rpm</div>
                      </td>
                    </tbody>
                  </table>
                  <img :src="require('@/images/pipeH.png')">
                  <i class="arrowr arrow"></i>
                  <div class="text">
                    运转时长：
                    <span class="DS-DIGII c-black9">23:23:12</span>
                  </div>
                </div>
                <div class="pumpArea4">
                  <img :src="require('@/images/'+li._src0+'.png')" :class="li._class0">
                  <img
                    v-if="li._src1"
                    :src="require('@/images/'+li._src1+'.png')"
                    :class="li._class1"
                  >
                  <i
                    :class="[index>0?'arrowup':'arrowdown','arrow']"
                    v-if="index!=pumpsList.length-1"
                  ></i>
                </div>
              </div>
            </div>
            <div style="flex:2">
              <div v-if="pumpsList.length==1||index==1" class="pumpArea5">
                <img :src="require('@/images/pipeH.png')" class="pipeH">
                <i class="arrowr arrow"></i>
                <img :src="require('@/images/dashboard.png')" class="dashboard">
                <div class="textArea">
                  <div class="block">
                    <div>
                      <span>水压：</span>
                      <span class="DS-DIGII line" style="color: #f84e37">40.2</span>
                      <span>m</span>
                    </div>
                    <div>
                      <span>流量：</span>
                      <span class="DS-DIGII line" style="color: white">2140</span>
                      <span>m/h</span>
                    </div>
                  </div>
                  <div class="text c-black6">供水总管计量仪</div>
                </div>
                <table class="table table-bordered table-pump">
                  <thead>
                    <td>供水计划</td>
                    <td>智能调度</td>
                  </thead>
                  <tbody>
                    <td>
                      <div>水压：xxx m</div>
                      <div>流量：xxx rpm</div>
                    </td>
                    <td>
                      <div>水压：xxx m</div>
                      <div>流量：xxx rpm</div>
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="pumpsList.length===0" class="blankBox">暂无实况数据</div>
        </div>
        <div class="schedule">
          <div class="timerow">
            <img class="titlePlate" :src="require('@/images/35.png')" alt>2018-04-15 星期日
            <img class="titlePlate ml-10" :src="require('@/images/36.png')" alt>17:20:20
          </div>
          <div ng-click="clickSchedule()">
            <a>智能泵组调度计划</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
// import debounce from 'lodash.debounce'
// 引入基本模板
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import { integrateClass } from '@/js/util.js'

export default {
  name: 'live',
  data () {
    return {
      pumpsList: [],
      chart1: null,
      chart2: null,
      chart3: null
    }
  },
  computed: {},
  mounted () {
    this.initEchart()
    this.pumpGroupInit()
    // window.onresize = debounce(this.resize, 500)
  },
  beforeDestroy () {
    this.chart1.dispose()
    this.chart2.dispose()
    this.chart3.dispose()
  },
  methods: {
    initEchart () {
      this.chart1 = echarts.init(document.getElementById('chart1'))
      this.chart2 = echarts.init(document.getElementById('chart2'))
      this.chart3 = echarts.init(document.getElementById('chart3'))
      var shijidianfei = [
        { time: '00:00', price: '1200' },
        { time: '00:30', price: '1100' },
        { time: '01:00', price: '1300' },
        { time: '01:30', price: '1300' },
        { time: '02:00', price: '132' },
        { time: '02:30', price: '411' },
        { time: '03:00', price: '200' },
        { time: '03:30', price: '2100' },
        { time: '04:00', price: '1100' },
        { time: '04:30', price: '600' },
        { time: '05:00', price: '800' }
      ]
      var diaodudianfei = [
        { time: '00:00', price: '600' },
        { time: '00:30', price: '900' },
        { time: '01:00', price: '1400' },
        { time: '01:30', price: '200' },
        { time: '02:00', price: '1400' },
        { time: '02:30', price: '900' },
        { time: '03:00', price: '880' },
        { time: '03:30', price: '600' },
        { time: '04:00', price: '1400' },
        { time: '04:30', price: '200' },
        { time: '05:00', price: '600' }
      ]
      var range = {}
      var options = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['实际电费', '调度电费', '节省电费']
        },
        dataZoom: {
          backgroundColor: '#dbdbdb',
          fillerColor: '#34a5ee',
          height: 15
        },
        grid: { left: '13%', right: '13%' },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: { show: false },
          // axisLabel: {color: '#999'},
          data: diaodudianfei.map(v => v.time)
        },
        yAxis: [{
          name: '运营金额(元)',
          max: (value) => { range = value; return value.max },
          min: (value) => value.min,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
          // nameTextStyle: { color: '#999' },
          // axisLabel: { color: 'red', },
        }, {
          name: '节省金额(元)',
          max: () => range.max,
          min: () => range.min,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
          // nameTextStyle: { color: '#999' },
          // axisLabel: { color: '#999', },
        }],
        series: [{
          name: '调度电费',
          type: 'line',
          showSymbol: false,
          itemStyle: {
            color: '#ff9100'
          },
          lineStyle: {
            color: '#ff9100',
            type: 'dotted'
          },
          data: diaodudianfei.map(v => v.price)
        }, {
          name: '实际电费',
          type: 'line',
          showSymbol: false,
          itemStyle: {
            color: '#0ebea4'
          },
          lineStyle: {
            color: '#0ebea4'
          },
          data: shijidianfei.map(v => v.price)
        }, {
          name: '节省电费',
          type: 'bar',
          itemStyle: {
            color: '#5bc2fd'
          },
          data: shijidianfei.map(
            v => v.price -
              diaodudianfei.find(i => i.time === v.time).price)
        }]
      }
      this.chart1.setOption(options)
      this.chart2.setOption(options)
      this.chart3.setOption(options)
    },
    resize () {
      this.chart1.resize()
      this.chart2.resize()
      this.chart3.resize()
    },
    pumpGroupInit () {
      // PumpGroupService.queryPumpGroup({ pageNum: 1, pageSize: 5 }).then(function (res) {
      //   if (res.status == 0) {
      this.pumpsList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
      this.pumpsList = integrateClass(this.pumpsList)
      console.log('list', this.pumpsList)
      // } else {
      //   layer.msg(res.message, { icon: 2 });
      // }
      // })
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.body {
  display: flex;
}
.body .canvas {
  flex: 1;
  padding-right: 20px;
}
.body .canvas:last-child {
  padding-right: 0px;
}
.titlePlate {
  margin-top: -3px;
  margin-right: 10px;
}
.countBox {
  padding-left: 50px;
  padding-bottom: 20px;
  font-size: 18px;
}
.chart {
  width: 100%;
  height: 325px;
}

/*泵组实况*/
.contentBox{
    border:1px solid #9bb3ca;
    background: #e1ecf0;
    position: relative;
    min-height: 500px;
}
.contentBox:after{
    clear: both;
}
.schedule {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
  text-align: right;
}
.timerow {
  font-size: 16px;
  color: #666;
}
.pumpRow {
  display: flex;
}
.pumpRow:first-child {
  margin-top: 80px;
}
.pumpArea1{flex:4;position: relative;}
.pumpArea1 .number{font-size:42px;color:#4c4c4c;text-align: center;margin-top: 25px;}
.pumpArea1 img{position: absolute;top: 88px;width: 100%;height: fit-content;}

.pumpArea2{flex: 1;position: relative;text-align: center;font-size: 18px}
.pumpArea2 .pumpimg{width:151px;}
.pumpArea2 .pumpimg img{position: relative;left: -31px;}
.pumpNo{margin-bottom: 55px;margin-top: -20px;}

.pumpArea3{flex: 1 0 300px;position: relative;}
.pumpArea3 .table-pump{width: 280px;position: absolute;top: -47px;left: 26px;text-align: center;box-shadow: 5px 4px 20px #aaa;}
.table-pump thead{background: #f0f0f0;}
.table-pump tbody{font-size:13px;background: #fff;}
.table.table-pump td {padding: 6px 8px;}
.pumpArea3 img{position: absolute;top: 88px;width: 100%;height: fit-content;}
.pumpArea3 .text{position: absolute;top: 122px;left: 26px;}

.pumpArea4{flex:0 0 58px;position: relative;}
.pumpArea4 .pipeL2{position: absolute;top: 84px;z-index: 2;}
.pumpArea4 .pipeS{position: absolute;top: 132px;height: 177px;width: fit-content;left: 9px;}
.pumpArea4 .pipeW{position: absolute;top: 75px;z-index: 2;}
.pumpArea4 .pipeL{position: absolute;top: 75px;z-index: 2;}
.pumpArea4 .pipeH{position: absolute;top: 88px;z-index: 2;width: 100%;height: fit-content;}
.pumpArea4 .pipeT{position: absolute;top: 75px;z-index: 2;left: -1px;}
.pumpArea4 .pipeT2{position: absolute;top: 71px;z-index: 2;}

.pumpArea5{position: relative;}
.pumpArea5 .pipeH{position: absolute;top: 88px;width: 100%;height: fit-content;}
.pumpArea5 .dashboard{position: absolute;top: 43px;left: 50%;transform: translate(-50%);}
.pumpArea5 .table-pump{width: 280px;position: absolute;top: -57px;left: 50%;transform: translate(-50%);text-align: center;box-shadow: 5px 4px 20px #aaa;}
.pumpArea5 .textArea{position: absolute;top: 73px;left: 50%;transform: translate(-50%);}
.pumpArea5 .textArea .block{font-size: 13px;line-height: 24px;color: white;margin-bottom: 30px;}
.pumpArea5 .textArea .block .line{width: 77px;display: inline-block;}
.pumpArea5 .textArea .text{font-size: 18px;}

.arrow{position:absolute;height:12px;background: url('../../../images/05-1.png') repeat-x;background-position-y: 0px;
    animation:flow 2s;animation-timing-function: linear;animation-iteration-count:infinite;}
@keyframes flow{from {background-position-x: 0px}to {background-position-x: 140px}}
.arrowr{top: 98px;width: 100%;}
.arrowup{transform: rotate(-90deg);top: 214px;width: 177px;left: -58px;}
.arrowdown{transform: rotate(90deg);top: 214px;width: 177px;left: -58px;}

.leaf{position: absolute;width: 72px;top: 15px;left: 24px;
    animation:fudong 6s;animation-timing-function: linear;animation-iteration-count:infinite;}
.leaf.leafp{width: 90px;top: 21px;left: 30px;}
@keyframes fudong{from {transform: rotate(0deg)}to {transform: rotate(360deg)}}

</style>
