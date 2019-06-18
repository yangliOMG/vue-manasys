<template>
  <el-dialog
    :title="params.type === 'createPumpGroup'?'创建泵组':'编辑泵组'"
    :visible.sync="dialogTableVisible"
    :width="width"
    style="min-width:800px;"
    append-to-body
    :modal-append-to-body="false"
    @closed="closed"
  >
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
      <div class="c-black6 logsTable">
        <div class="pb-10">
          <span>名称：</span>
          <el-form-item
            class="inputBox"
            prop="groupname"
            label-width="auto"
            v-if="params.type==='createPumpGroup'"
          >
            <input class="h-18" type="text" v-model="form.groupname">
          </el-form-item>
          <span v-if="params.type==='editPumpGroup'">{{form.groupname}}</span>
          <span class="pl-20">数量：</span>
          <select
            v-if="params.type==='createPumpGroup'"
            @change="changeQuantity"
            v-model="params.pumpsNum"
          >
            <option v-for="n in params.pumpQuantity" :key="n" :value="n">{{n}}</option>
          </select>
          <span v-if="params.type==='editPumpGroup'">{{params.pumpsNum}}</span>
          <span>台</span>
          <span class="pl-20">拓扑：</span>
          <img :src="require('@/images/37.png')" alt>
        </div>
        <div class="borderBox mb-40">
          <div class="rowTitle">第一组</div>
          <table class="table table-bordered table-row text-center">
            <tbody v-for="(li, index) in pumpsList" :key="index">
              <tr>
                <td>
                  <span class="c-black9">{{index+1}}#泵位</span>
                </td>
                <td>
                  <span class="c-black9">物联网ID：</span>
                  <input class="h-18" type="text" v-model="li.equipmentSn">
                </td>
                <td>
                  <span class="c-black9">水泵型号：</span>
                  <el-select
                    @change="changePumpsType(li)"
                    v-model="li.pumpId"
                    value-key="no"
                    popper-class="goodsort"
                    placeholder="请选择"
                    size="mini"
                    style="width:150px;margin-top: -10px;"
                  >
                    <el-option
                      v-for="item in params.pumpNo"
                      :key="item.id"
                      :label="item.no"
                      :value="item"
                    ></el-option>
                  </el-select>
                  <div
                    :class="[li.pumpId?'btn-blueL':'btn-greyL','pl-10','btn','btn-td']"
                    @click="clickDetail(index)"
                  >详细</div>
                </td>
                <td>
                  <span class="c-black9">模式：</span>
                  <label class="radio-inline mb-1">
                    <input
                      type="radio"
                      :name="'type_'+li.id"
                      :id="'type1_'+li.id"
                      value="1"
                      :disabled="li.disableFlag1"
                      v-model="li.workType"
                    >
                    <label class="radio-label" :for="'type1_'+li.id"></label>
                    <span>工频</span>
                  </label>
                  <label class="radio-inline mb-1">
                    <input
                      type="radio"
                      :name="'type_'+li.id"
                      :id="'type0_'+li.id"
                      value="0"
                      :disabled="li.disableFlag0"
                      v-model="li.workType"
                    >
                    <label class="radio-label" :for="'type0_'+li.id"></label>
                    <span>变频</span>
                  </label>
                </td>
                <td>
                  <span class="c-black9">状态：</span>
                  <label class="radio-inline mb-1">
                    <input
                      type="radio"
                      :name="'status_'+li.id"
                      :id="'status1_'+li.id"
                      value="1"
                      v-model="li.workStatus"
                    >
                    <label class="radio-label" :for="'status1_'+li.id"></label>可用
                  </label>
                  <label class="radio-inline mb-1">
                    <input
                      type="radio"
                      :name="'status_'+li.id"
                      :id="'status0_'+li.id"
                      value="0"
                      v-model="li.workStatus"
                    >
                    <label class="radio-label" :for="'status0_'+li.id"></label>不可用
                  </label>
                </td>
                <td>
                  <div
                    :class="[li.delFlag?'btn-blueL':'btn-greyL','btn','btn-td']"
                    @click="clickRowDelete(li.id,li.delFlag)"
                  >删除</div>
                </td>
              </tr>
              <tr style="background: #fbfbfb;" v-show="li.detailFlag">
                <td colspan="1"></td>
                <td colspan="5">
                  <table class="table table-bordered table-blue text-center">
                    <thead>
                      <tr class="deblue">
                        <td>品牌</td>
                        <td>类型</td>
                        <td>叶轮直径</td>
                        <td v-if="li.frequencyType==0">变频单位</td>
                        <td v-if="li.frequencyType==0">转速：最大-最小</td>
                        <td v-if="li.frequencyType==1">转速</td>
                        <td>工作点：转速-扬程-流量-轴功率</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{li.no||"-"}}</td>
                        <td>{{li.typeName||"-"}}</td>
                        <td>{{li.impellerDiameter||"-"}}mm</td>
                        <td v-if="li.frequencyType==0">{{li.frequencyUnit||"-"}}Hz</td>
                        <td v-if="li.frequencyType==0">{{li.maxSpeed||"?"}}-{{li.minSpeed||"?"}}rpm</td>
                        <td v-if="li.frequencyType==1">{{li.pointSpeed||"-"}}rpm</td>
                        <td>{{li.pointSpeed||"?"}}rpm-{{li.pointHead||"?"}}m-{{li.pointFlowRate||"?"}}m³/h-{{li.pointShaftPower||"?"}}kW</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center mt-50 mb-30">
          <div class="btn btn-blue btn-stsize mr-20" @click="creFinish">完成</div>
          <div class="btn btn-default btn-stsize" @click="dialogTableVisible = false">取消</div>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import { nToS, sToN } from '@/js/util.js'
export default {
  name: 'PumpGroupForm',
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
        pumpQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        pumpsNum: 1,
        pumpNo: [],
        loading: false
      },
      form: {
        groupname: ''
      },
      rules: {
        groupname: [
          { required: true, message: '泵组名称不能为空', trigger: 'blur' }
        ]
      },
      pumpsList: [],
      rowObj: { id: 0, equipmentSn: '', pumpId: null, workStatus: '1', workType: null, detailFlag: false, delFlag: false, disableFlag1: true, disableFlag0: true, text: '请选择' }
    }
  },
  mounted () {
    this.pumpsList.push(Object.assign({}, this.rowObj))
    this.$store.dispatch('pump/findSuccess').then((res) => {
      if (res.status === '0') {
        this.params.pumpNo = res.data
      }
    })
  },
  methods: {
    show (type = 'createPumpGroup', data) {
      if (type === 'editPumpGroup') {
        if (data.status === 2) return
        this.params.id = data.id
        this.params.version = data.version
        this.form.groupname = data.name
        this.params.pumpsNum = data.itemCount
        this.pumpsList = data.groupItems.map(li => ({
          id: li.id,
          equipmentSn: li.equipmentSn,
          pumpId: this.params.pumpNo.find(i => i.id === li.pumpId),
          version: li.version,
          workType: nToS(li.workType),
          workStatus: nToS(li.workStatus),
          detailFlag: false,
          delFlag: false,
          disableFlag1: li.pumpClass === null,
          disableFlag0: li.pumpClass === null || li.pumpClass.frequencyType !== 0,
          text: (li.pumpClass || '').no || '请选择',
          frequencyType: (li.pumpClass || '').frequencyType,
          name: (li.pumpClass || '').name,
          typeName: (li.pumpClass || '').typeName,
          impellerDiameter: (li.pumpClass || '').impellerDiameter,
          frequencyUnit: (li.pumpClass || '').frequencyUnit,
          maxSpeed: (li.pumpClass || '').maxSpeed,
          minSpeed: (li.pumpClass || '').minSpeed,
          pointSpeed: (li.pumpClass || '').pointSpeed,
          pointHead: (li.pumpClass || '').pointHead,
          pointFlowRate: (li.pumpClass || '').pointFlowRate,
          pointShaftPower: (li.pumpClass || '').pointShaftPower
        }))
      }
      this.dialogTableVisible = true
      this.params.type = type
    },
    /**
    * 事件： 切换 台数 按钮
    */
    changeQuantity () {
      this.pumpsList = []
      for (let i = 0; i < this.params.pumpsNum; i++) {
        this.pumpsList.push({
          ...this.rowObj,
          id: i,
          delFlag: i !== 0
        })
      }
    },
    /**
    * 事件： 切换 水泵型号 按钮
    */
    changePumpsType (li) {
      var { pumpId } = li
      if (pumpId) {
        var { frequencyType, no, typeName, impellerDiameter, frequencyUnit, maxSpeed, minSpeed, pointSpeed, pointHead, pointFlowRate, pointShaftPower } = pumpId
        if (frequencyType === 0) {
          li.disableFlag1 = false
          li.disableFlag0 = false
        } else {
          li.disableFlag1 = false
          li.disableFlag0 = true
          li.workType = '1'
        }
        var attr = { frequencyType, no, typeName, impellerDiameter, frequencyUnit, maxSpeed, minSpeed, pointSpeed, pointHead, pointFlowRate, pointShaftPower }
        for (const key in attr) {
          li[key] = attr[key]
        }
      } else {
        this.$message.error('水泵不存在')
      }
    },
    /**
    * 事件： 点击 详细 按钮
    */
    clickDetail (idx) {
      this.pumpsList[idx].detailFlag = !this.pumpsList[idx].detailFlag
    },
    /**
    * 事件： 行删除按钮
    */
    clickRowDelete (id, flag) {
      if (!flag) return
      this.pumpsList = this.pumpsList.filter(li => li.id !== id)
      this.params.pumpsNum = this.pumpsList.length
    },
    /**
    * 事件： 创建完成按钮
    */
    creFinish () {
      var _this = this
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        var data = {
          itemCount: _this.params.pumpsNum,
          name: _this.form.groupname,
          pumpGroupItems: _this.pumpsList.map(v => {
            var li = {
              equipmentSn: v.equipmentSn,
              pumpId: (v.pumpId || '').id,
              workStatus: sToN(v.workStatus),
              workType: sToN(v.workType)
            }
            if (_this.params.type === 'editPumpGroup') {
              li.id = v.id
              li.version = v.version
            }
            return li
          })
        }
        if (_this.params.type === 'editPumpGroup') {
          data.id = _this.params.id
          data.version = _this.params.version
        }
        _this.$emit('saveGroup', data, _this.params.type === 'createPumpGroup')
        _this.dialogTableVisible = false
      })
    },
    closed () {
      for (let i in this.form) {
        this.form[i] = ''
      }
      this.params.type = ''
      this.params.pumpsNum = 1
      this.pumpsList = [{ ...this.rowObj }]
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.rowTitle {
  background: #f2f2f2;
  padding: 7px;
}
</style>
