<template>
  <div id="app">
    <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中...">
      <BaseLayout v-if="$route.meta.layout === 'baseLayout'">
        <router-view/>
      </BaseLayout>
      <div v-else>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLayout from '@/components/layout/baseLayout.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      fullscreenLoading: state => state.fullscreenLoading
    })
  },
  components: {
    BaseLayout
  }
}
</script>

<style>
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*::-webkit-scrollbar {
  width: 5px;
  height: 0px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #34a5ee;
}
*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #e6e6e6;
}

@font-face {
  font-family: "DS-DIGII";
  src: url("./fontfamily/lcd/DS-DIGII.eot"); /* IE9 Compat Modes */
  src: url("./fontfamily/lcd/DS-DIGII.eot?#iefix") format("embedded-opentype"),
    /* IE6-IE8 */ url("./fontfamily/lcd/DS-DIGII.woff2") format("woff2"); /* Modern Browsers */
}
.DS-DIGII {
  font-family: "DS-DIGII";
  font-size: 33px;
}

/*单选框重置样式*/
.checkbox-line,
.radio-line {
  position: relative;
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: 400;
  vertical-align: middle;
  cursor: pointer;
}
.radio-inline input[type="radio"],
.radio-inline input[type="checkbox"] {
  position: absolute;
  margin-top: 4px\9;
  margin-left: -20px;
}
input[type="radio"],
input[type="checkbox"] {
  width: 14px;
  height: 14px;
  opacity: 0;
  margin-right: 10px;
}
.radio-label {
  position: absolute;
  cursor: pointer;
  left: 0;
  top: 1px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #666;
  box-sizing: border-box;
}
.radio-disabled {
  border: 1px solid #cbcbcb;
  background: #cbcbcb;
  cursor: default;
}
input:checked + .radio-label {
  background: url(./images/19.png) 100%/100%;
  border: none;
}
input:disabled + .radio-label {
  background: #cbcbcb;
  border: 1px solid #cbcbcb;
  cursor: not-allowed;
}
input:disabled + .radio-label + span {
  color: #999;
  cursor: not-allowed;
}

.diy-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.diy-pumpicon {
  background: url(./images/pumpIcon.png) no-repeat;
}
.diy-systemicon {
  background: url(./images/systemIcon.png) no-repeat;
}
.diy-danger {
  background: url(./images/danger.png) no-repeat;
  top: 3px;
  margin-right: 5px;
}
.diy-menudownicon {
  background: url(./images/03-1.png) no-repeat;
  top: 8px;
}
.diy-menuupicon {
  background: url(./images/03.png) no-repeat;
}

.icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: text-bottom;
  margin-right: 2px;
  background-size: contain;
  background-repeat: no-repeat;
}
.icon.icon-create {
  background-image: url(./images/11.png);
}
.btn:hover .icon.icon-create {
  background-image: url(./images/11-1.png);
}
.icon.icon-createR {
  background-image: url(./images/11-1.png);
}
.btn:hover .icon.icon-createR {
  background-image: url(./images/11.png);
}
.icon.icon-queryR {
  background-image: url(./images/13-1.png);
}
.btn:hover .icon.icon-queryR {
  background-image: url(./images/13.png);
}
.icon.icon-extractR {
  background-image: url(./images/14-1.png);
}
.btn:hover .icon.icon-extractR {
  background-image: url(./images/14.png);
}
.icon.icon-refreshR {
  background-image: url(./images/15-1.png);
}
.btn:hover .icon.icon-refreshR {
  background-image: url(./images/15.png);
}
.icon.icon-logR {
  background-image: url(./images/26-1.png);
}
.btn:hover .icon.icon-logR {
  background-image: url(./images/26.png);
}
.icon.icon-download {
  background-image: url(./images/12.png);
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.btn-stsize {
  width: 92px;
  line-height: 23px;
}
.btn-tisize {
  width: 44px;
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 2px;
}
.btn-td {
  font-size: 13px;
  padding: 0;
}
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-blue {
  color: white;
  background-color: #34a4ee;
  border-color: #34a4ee;
}
.btn-blue:hover {
  color: white;
  background-color: #6ec5ff;
}
.btn-blue:active {
  color: white;
  background-color: #6ec5ff;
}
.btn-blue:focus {
  color: white;
  background-color: #6ec5ff;
}

.btn-blueR {
  background-color: white;
  color: #34a4ee;
  border-color: #34a4ee;
}
.btn-blueR:hover {
  background-color: #34a4ee;
  color: white;
}
.btn-blueR:active {
  background-color: #34a4ee;
  color: white;
}
.btn-blueR:focus {
  background-color: white;
  color: #34a4ee;
  border-color: #34a4ee;
}

.btn-blueL {
  color: #34a4ee;
}
.btn-blueL:hover {
  background-color: #34a4ee;
  color: white;
}
.btn-blueL:active {
  background-color: #34a4ee;
  color: white;
}
.btn-blueL:focus {
  background-color: white;
  color: #34a4ee;
}

.btn-greyL {
  color: #999;
  cursor: not-allowed;
}
.btn-greyL:hover {
  background-color: white;
  color: #999;
}
.btn-greyL:active {
  background-color: white;
  color: #999;
}
.btn-greyL:focus {
  background-color: white;
  color: #999;
}

.btn-file {
  color: #34a4ee;
  background-color: white;
  cursor: pointer;
  font-size: 13px;
  padding: 7px;
}
.btn-file:hover {
  color: white;
  background-color: #34a4ee;
}

.btn-fileR {
  background-color: #34a4ee;
  color: white;
  cursor: pointer;
  font-size: 13px;
  padding: 7px;
}
.btn-fileR:hover {
  background-color: white;
  color: #34a4ee;
  border: 1px solid;
}

.el-dialog__header {
  padding: 8px 15px;
  color: #fff;
  margin-top: -2px;
  background-image: linear-gradient(to right, #1790d5, #4dc8d4);
}
.el-dialog__title {
  font-size: 14px;
  color: white;
}
.el-dialog__headerbtn {
  top: 10px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.el-dialog__body {
  position: relative;
  padding: 15px;
}

.table {
  margin-bottom: 0;
}
.table th,
.table td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
}
.table > tbody > tr.deblue > td,
.table > tbody > tr.deblue > th,
.table > tbody > tr > td.deblue,
.table > tbody > tr > th.deblue,
.table > thead > tr.deblue > td,
.table > thead > tr.deblue > th,
.table > thead > tr > td.deblue,
.table > thead > tr > th.deblue {
  background-color: #eaf6fd;
}
.table-blue,
.table-blue > tbody > tr > td,
.table-blue > thead > tr > td {
  border: 1px solid #93e3fd;
  font-size: 13px;
  color: #666;
}
.table-blue > tbody > tr > td {
  color: #9a9a9a;
  vertical-align: middle;
}
.table-row > tbody > tr > td,
.table-row > tr > td,
.table-row > thead > tr > td {
  border-right: 0;
  border-left: 0;
}
.table > tbody > tr.unread > td {
  color: black;
}

.logsTable {
  max-height: 450px;
  min-height: 200px;
  overflow-y: auto;
}
</style>
