<template>
  <div class="page-content">
    <div class="borderBt" style="padding:11px;display:none">
      <div id="createBtn" class="btn btn-fileR" @click="$refs['WaterScheduleForm'].show()">
        <i class="icon icon-createR"></i>创建供水计划
      </div>
    </div>
    <div class="mesbox" v-for="li in scheduleList" :key="li.id">
      <div class="title2 borderBt">
        <img class="titlePlate" :src="require('@/images/06.png')" alt>
        {{li.name}}
        <div class="f-r">
          <span>{{statusMap[li.status]}}</span>
          <label
            :class="[{'disabled':li.status===0 },{'checked':li.status===2 },'ios-switch','scale9']"
            @click="changeGroupRadio(li)"
          >
            <div class="checkbox"></div>
          </label>
          <div
            :class="[li.status!=2?'btn-blueL':'btn-greyL' ,'btn','btn-td']"
            @click="$refs['WaterScheduleForm'].show('editSchedule',li)"
          >编辑</div>
          <div
            :class="[li.status!=2?'btn-blueL':'btn-greyL' ,'btn','btn-td']"
            @click="clickDelete(li)"
          >删除</div>
        </div>
      </div>
      <div class="borderBt pd-15">
        <TableColumn :items="li.planItems" :columns="[
          {key:'起始时间',value:'beginTime'},
          {key:'终止时间',value:'endTime'},
          {key:'供水水压(mPa)',value:'pressure'},
          {key:'供水流量(m³/h)',value:'flow'},
          {key:'每度电价(元)',value:'electrovalence'}
        ]"></TableColumn>
      </div>
    </div>
    <div v-if="scheduleList.length!==0" class="pagination-bar">
      <el-pagination
        class="f-r mg-5"
        layout="prev, pager, next"
        :page-size.sync="pageParams.pageSize"
        :current-page="pageParams.pageNum"
        :total.sync="pageParams.total"
        @current-change="onPageChange"
      ></el-pagination>
      <div
        class="totalPage"
      >当前 {{pageParams.pageNum}} / {{pageParams.pages}} 页,共 {{pageParams.total}} 条</div>
    </div>
    <div v-if="scheduleList.length===0" class="blankBox">供水计划列表为空</div>

    <WaterScheduleForm ref="WaterScheduleForm" width="1080px" @saveSchedule="saveSchedule"/>
    <ConfirmModal ref="ConfirmModal"/>
  </div>
</template>
<script>
import WaterScheduleForm from '@/components/pumps/WaterScheduleForm'
import ConfirmModal from '@/components/pumps/confirmModal'
import TableColumn from '@/components/pumps/TableColumn'
export default {
  name: 'schedule',
  data () {
    return {
      pageParams: { pageNum: 1, pageSize: 5, total: 0 },
      scheduleList: [],
      statusMap: ['配置', '备用', '激活']
    }
  },
  mounted () {
    this.querySchedule()
  },
  methods: {
    /**
     * 事件： 分页查询
    */
    onPageChange (v) {
      this.pageParams.pageNum = v
      this.querySchedule()
    },
    /**
     * 事件： 切换 泵组 激活/备用 单选按钮
     */
    changeGroupRadio (li) {
      var { id, version, status } = li
      var _this = this
      if (status === 0) return
      var fn = function () {
        var promise
        if (status === 2) {
          promise = this.$store.dispatch('plan/offline', { id, version })
        } else if (status === 1) {
          promise = this.$store.dispatch('plan/active', { id, version })
        }
        promise.then((res) => {
          if (res.status === '0') {
            _this.querySchedule()
          } else {
            this.$message.error(res.message)
          }
        })
      }
      var title = status === 2 ? '下线' : '激活'
      this.$refs['ConfirmModal'].show(title, '确认' + title + '？', fn)
    },
    /**
     * 事件： 点击删除按钮
     */
    clickDelete (li) {
      var { id, version, status } = li
      var _this = this
      if (status === 2) return
      var fn = function () {
        this.$store.dispatch('plan/delete', { id, version }).then((res) => {
          if (res.status === '0') {
            this.$message.success('删除成功')
            _this.querySchedule()
          } else {
            this.$message.error(res.message)
          }
        })
      }
      this.$refs['ConfirmModal'].show('删除', '确认删除？', fn)
    },
    /**
    * 事件： 创建计划表按钮
    */
    saveSchedule (data, crFlag) {
      if (crFlag) {
        this.$store.dispatch('plan/create', data).then((res) => {
          if (res.status === '0') {
            this.$message.success('创建成功')
            this.querySchedule()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$store.dispatch('plan/update', data).then((res) => {
          if (res.status === '0') {
            this.querySchedule()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    /**
   * 查询供水计划列表
   */
    querySchedule () {
      this.$store.dispatch('plan/find', this.pageParams).then((res) => {
        if (res.status === '0') {
          this.scheduleList = res.data.data.map(li => ({
            ...li,
            planItems: li.planItems.map(i => ({
              ...i,
              beginTime: new Date(i.beginTime).format('hh:mm'),
              endTime: new Date(i.endTime).format('hh:mm')
            }))
          }))
          this.pageParams.total = res.data.total
          this.pageParams.pages = Math.ceil(res.data.total / this.pageParams.pageSize)
        }
      })
    }
  },
  components: {
    ConfirmModal,
    WaterScheduleForm,
    TableColumn
  }
}
</script>

<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
