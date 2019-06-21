<template>
  <el-dialog
    :title="params.type === 'createPumpGroup'?'创建供水计划':'编辑供水计划'"
    :visible.sync="dialogTableVisible"
    :width="width"
    style="min-width:800px;"
    append-to-body
    :modal-append-to-body="false"
    @closed="closed"
  >
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
      <div class="c-black6 logsTable">
        <div class="pb-10 borderBt">
          <span>周期：24小时</span>
          <span v-if="params.type==='createSchedule'">
            <span class="pl-20">起点：</span>
            <select v-model="params.hour">
              <option v-for="(n,index) in params.hourArr" :key="index" :value="n">{{n}}</option>
            </select>
            <span>时</span>
            <select v-model="params.minute">
              <option v-for="(n,index) in params.minuteArr" :key="index" :value="n">{{n}}</option>
            </select>
            <span>分</span>
            <span class="pl-20">时间粒度：</span>
            <select v-model="params.granularity">
              <option v-for="(n,index) in params.granularityArr" :key="index" :value="n">{{n}}</option>
            </select>
            <span>分钟</span>
            <div class="f-r">
              <div class="btn btn-td btn-fileR" style="padding: 1px 17px;" @click="clickCreate()">生成</div>
            </div>
          </span>
          <span v-if="params.type==='editSchedule'">
            <span class="pl-20">起点：{{params.hour}}时{{params.minute}}分</span>
            <span class="pl-20">时间粒度：{{params.granularity}}分钟</span>
          </span>
        </div>
        <div class="mb-10 pt-10 pb-10 borderBt">
          <span>计划名称：</span>
          <div class="inputBox">
            <input
              v-if="params.type==='createSchedule'"
              class="h-18"
              type="text"
              v-model="params.schedulename"
              required
              name="params_schedulename"
            >
            <span v-if="params.type==='editSchedule'">{{params.schedulename}}</span>
          </div>
        </div>
        <div class="borderBox mb-40">
          <table class="table table-bordered table-blue text-center">
            <thead>
              <tr class="deblue">
                <td>起始</td>
                <td>终止</td>
                <td>供水水压(mPa)</td>
                <td>供水流量(m³/h)</td>
                <td>每度电价(元)</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="li in itemsList" :key="li.id">
                <td>{{li.beginTime.show}}</td>
                <td>{{li.endTime.show}}</td>
                <td>
                  <input class="h-18" type="number" v-model="li.pressure">
                </td>
                <td>
                  <input class="h-18" type="number" v-model="li.flow">
                </td>
                <td>
                  <input class="h-18" type="number" v-model="li.electrovalence">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center">
          <div class="btn btn-blue btn-stsize mr-20" @click="creFinish">保存</div>
          <div class="btn btn-default btn-stsize" @click="dialogTableVisible = false">取消</div>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import { tTrans } from '@/js/util.js'
export default {
  name: 'WaterScheduleForm',
  props: {
    width: {
      type: String,
      default: function () {
        if (window.innerWidth <= 1200) {
          return '75%'
        } else {
          return '50%'
        }
      }
    },
    formLabelWidth: {
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      params: {
        type: '',
        id: '',
        version: '',
        hourArr: new Array(24).fill().map((v, i) => (i + '').padStart(2, '0')),
        hour: '00',
        minuteArr: new Array(60).fill().map((v, i) => (i + '').padStart(2, '0')),
        minute: '00',
        granularityArr: ['05', '10', '15', '20', '25', '30', '40', '45', '60'],
        granularity: '60'
      },
      form: {
        schedulename: '',
        hour: '',
        minute: '',
        granularity: ''
      },
      rules: {
      },
      itemsList: []
    }
  },
  mounted () {
  },
  methods: {
    show (type = 'createSchedule', data) {
      if (type === 'editSchedule') {
        if (data.status === 2) return
        var { planItems, name, timeStep, beginTime, id, version } = data
        this.params.id = id
        this.params.version = version
        this.form.schedulename = name
        this.form.hour = new Date(beginTime).format('hh')
        this.form.minute = new Date(beginTime).format('mm')
        this.form.granularity = timeStep
        this.itemsList = planItems.map(li => ({
          ...li,
          beginTime: { show: li.beginTime, value: new Date(new Date().format('yyyy-MM-dd ') + li.beginTime).getTime() },
          endTime: { show: li.endTime, value: new Date(new Date().format('yyyy-MM-dd ') + li.endTime).getTime() }
        }))
      }
      this.dialogTableVisible = true
      this.params.type = type
    },
    /**
    * 事件： 生成 表单 按钮
    */
    clickCreate () {
      var { hour, minute, granularity } = this.params
      this.itemsList = []
      for (let i = 0; i < 24 * 60 / granularity; i++) {
        this.itemsList.push({
          beginTime: tTrans(hour, minute, granularity * i),
          endTime: tTrans(hour, minute, granularity * (i + 1)),
          pressure: '',
          flow: '',
          electrovalence: ''
        })
      }
    },
    /**
    * 事件： 创建完成按钮
    */
    creFinish () {
      if (this.itemsList.length === 0) {
        return this.$message.error('请添加计划项')
      }
      var data
      if (this.params.type === 'editSchedule') {
        data = {
          id: this.params.id,
          version: this.params.version,
          items: this.itemsList.map(li => ({
            id: li.id,
            version: li.version,
            pressure: li.pressure,
            flow: li.flow,
            electrovalence: li.electrovalence
          }))
        }
      } else {
        data = {
          name: this.params.schedulename,
          timeStep: this.params.granularity,
          beginTime: this.itemsList[0].beginTime.value,
          items: this.itemsList.map(li => ({
            ...li,
            beginTime: li.beginTime.value,
            endTime: li.endTime.value
          }))
        }
      }
      this.$emit('saveSchedule', data, this.params.type === 'createSchedule')
      this.dialogTableVisible = false
    },
    closed () {
      for (let i in this.form) {
        this.form[i] = ''
      }
      this.params.type = ''
      this.params.hour = '00'
      this.params.minute = '00'
      this.params.granularity = '60'
      this.itemsList = []
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
