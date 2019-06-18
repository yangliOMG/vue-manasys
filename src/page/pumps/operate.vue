<template>
  <div class="content">
    <div class="ofhd">
      <ul class="nav nav-tabs deblue f-l">
        <li v-bind:class="{active:tabNum.includes(tabs[0])}" @click="changeTab(tabs[0])">
          <a>泵组实况</a>
        </li>
        <li v-bind:class="{active:tabNum.includes(tabs[1])}" @click="changeTab(tabs[1])">
          <a>泵组管理</a>
        </li>
        <li v-bind:class="{active:tabNum.includes(tabs[2])}" @click="changeTab(tabs[2])">
          <a>供水计划</a>
        </li>
      </ul>
      <div class="f-r">
        <div class="btn btn-file" @click="clickCreateSchedule()">
          <i class="icon icon-create"></i>创建供水计划
        </div>
        <div class="btn btn-file" @click="clickCreatePump()">
          <i class="icon icon-create"></i>创建泵组
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'operate',
  data () {
    return {
      tabNum: this.$route.path,
      tabs: ['live', 'management', 'schedule']
    }
  },
  methods: {
    changeTab (val) {
      this.tabNum = '/pumps/operate/' + val
      this.$router.push({ path: '/pumps/operate/' + val })
    },
    clickCreateSchedule () {
      this.changeTab('schedule')
      setTimeout(() => {
        document.getElementById('createBtn').click()
      }, 10)
    },
    clickCreatePump () {
      this.changeTab('management')
      setTimeout(() => {
        document.getElementById('createBtn').click()
      }, 10)
    }
  },
  mounted () { }
}
</script>
<style scoped lang="less">
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #e7e7e7;
  padding: 10px;
}
.page-content {
  background-color: #fff;
}
.nav-tabs.deblue > li {
  background: #f5f5f5;
  color: #999;
  margin-right: 6px;
  cursor: pointer;
}
.nav-tabs > li {
  float: left;
  margin-bottom: -1px;
}
.deblue > li.active > a,
.deblue > li.active > a:focus,
.deblue > li.active > a:hover {
  color: #333;
  cursor: default;
  background: white;
  border: none;
}
.nav-tabs > li > a {
  border-radius: 0;
  margin: 0;
  border: none;
  cursor: pointer;
}
</style>
