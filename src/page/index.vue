<template>
  <div class="content">
    <div class="in">
      <!-- part1 -->
      <el-row :gutter="10">
        <el-col :lg="6" :sm="12">
          <div class="cart p1">
            <h5>
              总销售额
              <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
                <i class="icon el-icon-warning"></i>
              </el-tooltip>
            </h5>
            <p><countTo :endVal='215845' :duration='3000' autoplay prefix="¥ " separator=','></countTo></p>
            <div class="info">
              <p class="p1-1">周同比12%</p>
              <p class="p1-1">日同比11%</p>
            </div>
            <div class="foot">
              日销售额1,234
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="12">
          <div class="cart p1">
            <h5>
              开票量
              <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
                <i class="icon el-icon-warning"></i>
              </el-tooltip>
            </h5>
            <p><countTo :endVal='856' :duration='3000' autoplay separator=','></countTo></p>
            <div class="info">
              <div id="p1c2" :style="{width: '100%', height: '40px'}"></div>
            </div>
            <div class="foot">
              日开票量1,234
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="12">
          <div class="cart p1">
            <h5>
              红冲笔数
              <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
                <i class="icon el-icon-warning"></i>
              </el-tooltip>
            </h5>
            <p><countTo :endVal='703' :duration='3000' autoplay separator=','></countTo></p>
            <div class="info">
              <div id="p1c3" :style="{width: '100%', height: '40px'}"></div>
            </div>
            <div class="foot">
              日红冲￥12,423
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="12">
          <div class="cart p1">
            <h5>
              转换率
              <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
                <i class="icon el-icon-warning"></i>
              </el-tooltip>
            </h5>
            <p><countTo :endVal='80' :duration='3000' suffix=' %' autoplay></countTo></p>
            <div class="info">
              <div id="p1c4" :style="{width: '100%', height: '40px'}"></div>
            </div>
            <div class="foot">
              日转化率60%
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- part2 -->
      <el-row>
        <el-col :span="24">
          <div class="cart p2">
            <el-menu :default-active="p2TitleActive" class="el-menu-demo" mode="horizontal" @select="p2TitleSelect">
              <el-menu-item index="0">销售额</el-menu-item>
              <el-menu-item index="1">开票额</el-menu-item>
            </el-menu>
            <div class="widthOne">
              <div class="widthTwo" :style="{ left: p2left + '%' }" >
                <el-row>
                  <el-col :span="12">
                    <el-row :gutter="10">
                      <el-col :lg="16" :sm="12">
                        <div id="p2c1" :style="{width: '100%', height: '300px'}"></div>
                      </el-col>
                      <el-col :lg="8" :sm="12">
                        <h5>门店销售额排名</h5>
                        <ul class="sort">
                          <li><i>1</i><span class="name">工专路 0 号店</span><span>323,234</span></li>
                          <li><i>2</i><span class="name">工专路 1 号店</span><span>323,234</span></li>
                          <li><i>3</i><span class="name">工专路 2 号店</span><span>323,234</span></li>
                          <li><i>4</i><span class="name">工专路 3 号店</span><span>323,234</span></li>
                          <li><i>5</i><span class="name">工专路 4 号店</span><span>323,234</span></li>
                          <li><i>6</i><span class="name">工专路 5 号店</span><span>323,234</span></li>
                          <li><i>7</i><span class="name">工专路 6 号店</span><span>323,234</span></li>
                        </ul>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row :gutter="10">
                      <el-col :lg="16" :sm="12">
                        <div id="p2c2" :style="{width: '100%', height: '300px'}"></div>
                      </el-col>
                      <el-col :lg="8" :sm="12">
                        <h5>门店开票额排名</h5>
                        <ul class="sort">
                          <li><i>1</i><span class="name">工专路 0 号店</span><span>323,234</span></li>
                          <li><i>2</i><span class="name">工专路 1 号店</span><span>323,234</span></li>
                          <li><i>3</i><span class="name">工专路 2 号店</span><span>323,234</span></li>
                          <li><i>4</i><span class="name">工专路 3 号店</span><span>323,234</span></li>
                          <li><i>5</i><span class="name">工专路 4 号店</span><span>323,234</span></li>
                          <li><i>6</i><span class="name">工专路 5 号店</span><span>323,234</span></li>
                          <li><i>7</i><span class="name">工专路 6 号店</span><span>323,234</span></li>
                        </ul>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- part3 -->
      <el-row :gutter="10">
        <el-col :lg="12" :sm="24">
          <div class="cart p3">
            <div class="title">
              红冲笔数
            </div>
            <div id="p3c1" :style="{width: '100%', height: '100px'}"></div>
            <div style="padding:15px;">
              <el-table
                :data="p3Data"
                border
                size="mini"
                style="width: 100%;">
                <el-table-column
                  label="序号"
                  type="index"
                  align="center"
                  width="45">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="营业点"
                  show-overflow-tooltip
                  min-width="150">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="红冲数"
                  show-overflow-tooltip
                  min-width="80">
                </el-table-column>
                <el-table-column
                  prop="increase"
                  label="周涨幅"
                  align="right"
                  show-overflow-tooltip
                  width="80">
                </el-table-column>
              </el-table>
              <el-pagination
                style="text-align: right;padding-top:10px;"
                layout="prev, pager, next"
                small
                :total="1000">
              </el-pagination>
            </div>
          </div>
        </el-col>
        <el-col :lg="12" :sm="24">
          <div class="cart p3">
            <div class="title">
              销售额类别占比
              <el-radio-group v-model="p3Radio" size="small" style="float:right;">
                <el-radio-button label="全部渠道"></el-radio-button>
                <el-radio-button label="线上"></el-radio-button>
                <el-radio-button label="门店"></el-radio-button>
              </el-radio-group>
            </div>
            <div id="p3c2" :style="{width: '100%', height: '380px'}"></div>
          </div>
        </el-col>
      </el-row>
      <!-- part4 -->
      <el-row>
        <el-col :span="24">
          <div class="cart">
            <el-carousel arrow="always" type="card" :autoplay="false" height="145px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
            <div id="p4c1" :style="{width: '100%', height: '300px'}"></div>
          </div>
        </el-col>
      </el-row>
      <div class="foot"></div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import countTo from 'vue-count-to'
// 引入基本模板
import echarts from 'echarts/lib/echarts'
// 引入柱状图组件
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
// 引入提示框和title组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

export default {
  name: 'index',
  data () {
    return {
      p2TitleActive: '0',
      p2left: 0,
      p3Radio: '全部渠道',
      p3Data: [{
        name: '工专路 0 号店',
        num: '523',
        increase: '5%'
      }, {
        name: '工专路 1 号店',
        num: '484',
        increase: '9%'
      }, {
        name: '工专路 2 号店',
        num: '636',
        increase: '7%'
      }, {
        name: '工专路 3 号店',
        num: '523',
        increase: '4%'
      }, {
        name: '工专路 4 号店',
        num: '757',
        increase: '6%'
      }],
      p1c2: null,
      p1c3: null,
      p1c4: null,
      p2c1: null,
      p2c2: null,
      p3c2: null,
      p3c1: null,
      p4c1: null
    }
  },
  destroyed () {
  },
  beforeDestroy () {
    window.onresize = null
    this.p1c2.dispose()
    this.p1c3.dispose()
    this.p1c4.dispose()
    this.p2c1.dispose()
    this.p2c2.dispose()
    this.p3c1.dispose()
    this.p3c2.dispose()
    this.p4c1.dispose()
  },
  mounted () {
    this.init()
    window.onresize = debounce(this.resize, 500)
  },
  methods: {
    init () {
      this.p1c2 = echarts.init(document.getElementById('p1c2'))
      this.p1c2.setOption({
        grid: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c0}'
        },
        xAxis: {
          show: false,
          boundaryGap: false,
          data: [
            '2018-12-08',
            '2018-12-09',
            '2018-12-10',
            '2018-12-11',
            '2018-12-12',
            '2018-12-13',
            '2018-12-14',
            '2018-12-15',
            '2018-12-16',
            '2018-12-17',
            '2018-12-18',
            '2018-12-19',
            '2018-12-20',
            '2018-12-21',
            '2018-12-22',
            '2018-12-23',
            '2018-12-24'
          ]
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          type: 'line',
          symbol: 'none',
          smooth: true,
          areaStyle: {},
          data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
        }]
      })
      this.p1c3 = echarts.init(document.getElementById('p1c3'))
      this.p1c3.setOption({
        grid: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c0}'
        },
        xAxis: {
          show: false,
          data: [
            '2018-12-08',
            '2018-12-09',
            '2018-12-10',
            '2018-12-11',
            '2018-12-12',
            '2018-12-13',
            '2018-12-14',
            '2018-12-15',
            '2018-12-16',
            '2018-12-17',
            '2018-12-18',
            '2018-12-19',
            '2018-12-20',
            '2018-12-21',
            '2018-12-22',
            '2018-12-23',
            '2018-12-24'
          ]
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          type: 'bar',
          symbol: 'none',
          smooth: true,
          areaStyle: {},
          data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
        }]
      })
      this.p1c4 = echarts.init(document.getElementById('p1c4'))
      this.p1c4.setOption({
        grid: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        },
        yAxis: {
          data: ['百分比'],
          show: false
        },
        xAxis: {
          show: false
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: [100],
            animation: false
          },
          {
            type: 'bar',
            data: [80]
          }
        ]
      })
      this.p2c1 = echarts.init(document.getElementById('p2c1'))
      this.p2c1.setOption({
        title: {
          text: '销售趋势',
          padding: 15,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        grid: {
          right: 20,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c0}'
        },
        xAxis: {
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: '#ddd',
              type: 'dotted'
            }
          },
          type: 'value'
        },
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5
        },
        series: [{
          type: 'bar',
          symbol: 'none',
          barCategoryGap: '40%',
          areaStyle: {},
          data: [1011, 292, 1145, 591, 786, 1043, 991, 262, 487, 740, 747, 1019],
          animationDelay: function (idx) {
            return idx * 50
          }
        }]
      })
      this.p2c2 = echarts.init(document.getElementById('p2c2'))
      this.p2c2.setOption({
        title: {
          text: '开票趋势',
          padding: 15,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        grid: {
          right: 20,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c0}'
        },
        xAxis: {
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: '#ddd',
              type: 'dotted'
            }
          },
          type: 'value'
        },
        series: [{
          type: 'bar',
          symbol: 'none',
          barCategoryGap: '40%',
          areaStyle: {},
          data: [1011, 292, 1145, 591, 786, 1043, 991, 262, 487, 740, 747, 1019]
        }]
      })
      this.p3c1 = echarts.init(document.getElementById('p3c1'))
      this.p3c1.setOption({
        title: {
          text: '红冲数',
          padding: 15,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c0}'
        },
        grid: {
          top: 40,
          right: 15,
          left: 15,
          bottom: 0
        },
        xAxis: {
          show: false,
          type: 'category',
          boundaryGap: false,
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          data: [1820, 1932, 901, 934, 1290, 1330, 1320],
          smooth: true,
          type: 'line',
          areaStyle: {}
        }]
      })
      let p3c2Data = {
        '家用电器': {
          data: ['28.79%', '¥ 4,544']
        },
        '食用酒水': {
          data: ['21.04%', '¥ 3,321']
        },
        '个护健康': {
          data: ['19.73%', '¥ 3,113']
        },
        '服饰箱包': {
          data: ['14.83%', '¥ 2,341']
        },
        '母婴产品': {
          data: ['7.80%', '¥ 1,231']
        },
        '其他': {
          data: ['7.80%', '¥ 1,231']
        }
      }
      this.p3c2 = echarts.init(document.getElementById('p3c2'))
      this.p3c2.setOption({
        title: {
          top: 'middle',
          left: '30%',
          text: [
            '{a|销售额}',
            '{b|¥ 215,845}'
          ].join('\n'),
          padding: [0, -75],
          textStyle: {
            width: 150,
            lineHeight: 28,
            rich: {
              a: {
                color: '#999',
                align: 'center',
                fontSize: 14
              },
              b: {
                color: '#333',
                align: 'center',
                fontSize: 18
              }
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: 'center',
          left: '60%',
          data: [
            {
              name: '家用电器',
              icon: 'circle'
            }, {
              name: '食用酒水',
              icon: 'circle'
            }, {
              name: '个护健康',
              icon: 'circle'
            }, {
              name: '服饰箱包',
              icon: 'circle'
            }, {
              name: '母婴产品',
              icon: 'circle'
            }, {
              name: '其他',
              icon: 'circle'
            }
          ],
          formatter: function (name) {
            return name + ' | ' + p3c2Data[name].data[0] + ' ' + p3c2Data[name].data[1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['30%', '50%'],
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              lineHeight: 24,
              fontFamily: 'Arial',
              formatter: [
                '{a|销售额}',
                '{b|¥ 215,845}'
              ].join('\n'),
              rich: {
                a: {
                  color: '#999',
                  fontSize: 14
                },
                b: {
                  color: '#333',
                  fontSize: 18
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 4544, name: '家用电器'},
              {value: 3321, name: '食用酒水'},
              {value: 3113, name: '个护健康'},
              {value: 2341, name: '服饰箱包'},
              {value: 1231, name: '母婴产品'},
              {value: 1231, name: '其他'}
            ]
          }
        ]
      })
      let p4c1Data1 = []
      let p4c1Data2 = []
      for (let i = 1; i <= 30; i++) {
        let date = new Date('2018-12-' + i)
        p4c1Data1.push({
          name: '订单数',
          value: [[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/'), Math.round(Math.random() * 1000)]
        })
        p4c1Data2.push({
          name: '发票数',
          value: [[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/'), Math.round(Math.random() * 1000)]
        })
      }
      this.p4c1 = echarts.init(document.getElementById('p4c1'))
      this.p4c1.setOption({
        grid: {
          right: 50,
          left: 50
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c0}'
        },
        legend: {
          data: [{
            name: '订单数'
          }, {
            name: '发票数'
          }]
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '40%'],
          splitLine: {
            lineStyle: {
              color: '#ddd',
              type: 'dotted'
            }
          }
        },
        series: [{
          name: '订单数',
          type: 'line',
          symbol: 'none',
          data: p4c1Data1
        }, {
          name: '发票数',
          type: 'line',
          symbol: 'none',
          data: p4c1Data2
        }]
      })
    },
    resize () {
      console.log('resize')
      this.p1c2.resize()
      this.p1c3.resize()
      this.p1c4.resize()
      this.p2c1.resize()
      this.p2c2.resize()
      this.p3c1.resize()
      this.p3c2.resize()
      this.p4c1.resize()
      this.p3c2.dispatchAction({
        type: 'legendToggleSelect',
        name: '家用电器'
      })
    },
    p2TitleSelect (key, keyPath) {
      this.p2left = key * -100
    }
  },
  components: {
    countTo
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #f0f2f5;
  .in{
    padding: 15px;
    .cart{
      background: #fff;
      margin-bottom: 10px;
      &.p1{
        padding: 10px 15px 0;
        &>h5{
          color: rgba(0,0,0,.45);
          font-size: 14px;
          line-height: 22px;
          .icon{
            float: right;
          }
        }
        &>p{
          word-break: break-all;
          white-space: nowrap;
          color: rgba(0,0,0,.85);
          font-size: 30px;
          line-height: 38px;
        }
        .info{
          .p1-1{
            line-height: 20px;
            color: rgba(0,0,0,.65);
            font-size: 14px;
          }
          padding: 5px 0 10px;
        }
        .foot{
          font-size: 14px;
          line-height: 34px;
          border-top: 1px solid #ddd;
        }
      }
      &.p2{
        .widthOne{
          width: 100%;
          overflow: hidden;
          .widthTwo{
            position: relative;
            width: 200%;
            transition: all 0.3s;
          }
        }
        h5{
          line-height: 40px;
          color: #666;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .sort{
          padding-right: 15px;
          li{
            display: flex;
            font-size: 14px;
            line-height: 22px;
            color: rgba(0,0,0,.65);
            margin-right: 8px;
            margin-bottom: 15px;
            &>i{
              display: inline-block;
              width: 20px;
              height: 20px;
              line-height: 20px;
              margin: 1px;
              text-align: center;
              border-radius: 50%;
              background-color: #ccc;
              margin-right: 10px;
            }
            .name{
              flex: 1;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin-right: 5px;
            }
          }
          li:nth-of-type(1)>i,
          li:nth-of-type(2)>i,
          li:nth-of-type(3)>i{
            background-color: #314659;
            color: #fff;
          }
        }
      }
      &.p3{
        .title{
          line-height: 32px;
          padding: 10px 15px;
          border-bottom: 1px solid #ddd;
        }
      }
    }
    &>.foot{
      margin-bottom: 100px;
    }
  }
}
</style>
