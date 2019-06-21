<template>
  <div class="page-content">
    <div class="borderBt hide" style="padding:11px;">
      <div id="createBtn" class="btn btn-fileR" @click="$refs['PumpGroupForm'].show()">
        <i class="icon icon-createR"></i>创建泵组
      </div>
    </div>
    <div class="mesbox" v-for="li in pumpsGroupList" :key="li.id">
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
            @click="$refs['PumpGroupForm'].show('editPumpGroup',li)"
          >编辑</div>
          <div
            :class="[li.status!=2?'btn-blueL':'btn-greyL' ,'btn','btn-td']"
            @click="clickDelete(li)"
          >删除</div>
        </div>
      </div>
      <div class="pumpgroup borderBt pd-15">
        <div class="pumpbox" v-for="item in li.groupItems" :key="item.id">
          <div class="borderBt pd-15">
            <div class="imgbox">
              <img
                style="height:112px"
                :src="require('@/images/'+(item.pumpId?'pump':38)+'.png')"
                alt
              >
              <img
                v-if="item.pumpId&&item.workStatus===1"
                class="leaf"
                :src="require('@/images/pumpLeaf.png')"
                alt
              >
            </div>
          </div>
          <div class="pumptext">
            <span>{{item.pumpNo}}</span>
            <span
              v-if="item.pumpId"
              class="pumptext-a"
              @click="$refs['PumpDetail'].show(li, item)"
            >{{item.pumpClass.no}}</span>
            <span v-if="!item.pumpId" class="pl-17">---</span>
            <label
              :class="[{'disabled':!item.pumpId||li.status===2 },{'checked':item.workStatus===1 },'ios-switch','pumps']"
              @click="changeItemRadio(item,li.status)"
            >
              <div class="checkbox"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
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
    <div v-if="pumpsGroupList.length===0" class="blankBox">泵组列表为空</div>

    <PumpDetail ref="PumpDetail" width="1000px"/>
    <PumpGroupForm ref="PumpGroupForm" width="1080px" @saveGroup="saveGroup"/>
    <ConfirmModal ref="ConfirmModal"/>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
import PumpDetail from '@/components/pumps/pumpDetail'
import PumpGroupForm from '@/components/pumps/pumpGroupForm'
import ConfirmModal from '@/components/pumps/confirmModal'
export default {
  name: 'management',
  data () {
    return {
      pageParams: { pageNum: 1, pageSize: 5, total: 0 },
      pumpsGroupList: [],
      statusMap: ['配置', '备用', '激活']
    }
  },
  mounted () {
    this.queryPumpsGroup()
  },
  methods: {
    /**
     * 事件： 分页查询
    */
    onPageChange (v) {
      this.pageParams.pageNum = v
      this.queryPumpsGroup()
    },
    /**
    * 事件： 创建泵组按钮
    */
    saveGroup (data, crFlag) {
      if (crFlag) {
        this.$store.dispatch('pumpGroup/create', data).then((res) => {
          if (res.status === '0') {
            this.$message.success('创建成功')
            this.queryPumpsGroup()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$store.dispatch('pumpGroup/update', data).then((res) => {
          if (res.status === '0') {
            this.queryPumpsGroup()
          } else {
            this.$message.error(res.message)
          }
        })
      }
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
          promise = this.$store.dispatch('pumpGroup/offline', { id, version })
        } else if (status === 1) {
          promise = this.$store.dispatch('pumpGroup/active', { id, version })
        }
        promise.then((res) => {
          if (res.status === '0') {
            _this.queryPumpsGroup()
          } else {
            this.$message.error(res.message)
          }
        })
      }
      var title = status === 2 ? '下线' : '激活'
      this.$refs['ConfirmModal'].show(title, '确认' + title + '？', fn)
    },

    /**
     * 事件： 切换 水泵 激活/备用 单选按钮
     */
    changeItemRadio (item, status) {
      if (!item.pumpId || status === 2) return
      var { groupId, id, version, workStatus } = item
      var promise
      var _this = this
      if (workStatus === 1) {
        promise = this.$store.dispatch('pumpGroup/offlineItems', { groupId, id, version })
      } else {
        promise = this.$store.dispatch('pumpGroup/activeItems', { groupId, id, version })
      }
      promise.then(function (res) {
        if (res.status === '0') {
          _this.queryPumpsGroup()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 事件： 点击删除按钮
     */
    clickDelete (li) {
      var { id, version, status } = li
      var _this = this
      if (status === 2) return
      var fn = function () {
        this.$store.dispatch('pumpGroup/delete', { id, version }).then((res) => {
          if (res.status === '0') {
            this.$message.success('删除成功')
            _this.queryPumpsGroup()
          } else {
            this.$message.error(res.message)
          }
        })
      }
      this.$refs['ConfirmModal'].show('删除', '确认删除？', fn)
    },
    /**
    * 查询泵组列表
    */
    queryPumpsGroup () {
      this.$store.dispatch('pumpGroup/find', this.pageParams).then((res) => {
        if (res.status === '0') {
          this.pumpsGroupList = res.data.data
          console.log('list', res.data.data)
          this.pageParams.total = res.data.total
          this.pageParams.pages = Math.ceil(res.data.total / this.pageParams.pageSize)
        }
      })
    }
  },
  components: {
    PumpDetail,
    PumpGroupForm,
    ConfirmModal
  }
}
</script>

<style scoped lang="less">
.pumpgroup {
  margin-right: -10px;
  font-size: 0;
}
.pumptext {
  padding: 0 10px;
  background: #e9f6fd;
  line-height: 34px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.pumptext-a {
  padding-left: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #007bff;
  cursor: pointer;
}
.pumpbox {
  margin: 0 1% 1% 0;
  width: 19%;
  font-size: 14px;
  display: inline-block;
  text-align: center;
  box-shadow: 1px 1px 10px #999;
  border-radius: 5px;
}
.imgbox {
  display: inline-block;
  position: relative;
}
.leaf {
  position: absolute;
  width: 72px;
  top: 15px;
  left: 24px;
  animation: fudong 6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.leaf.leafp {
  width: 90px;
  top: 21px;
  left: 30px;
}
@keyframes fudong {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rowTitle {
  background: #f2f2f2;
  padding: 7px;
}

.select-pump {
  max-width: 150px;
}
</style>
