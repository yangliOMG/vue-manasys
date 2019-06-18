<template>
<div class="contain">
  <el-container style="height: 100vh;">
    <el-header>
      <div class="header">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <span class="compnayName">九鼎瑞信</span>
            <div class="toggleMenu" @click="toggleMenu">
              <i class="el-icon-menu"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <HeaderMenu />
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-container style="">
      <div class="left">
        <el-aside :width="sideWidth">
          <SideMenu :collapseMenu="collapseMenu" />
        </el-aside>
      </div>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import SideMenu from './sideMenu.vue'
import HeaderMenu from './HeaderMenu.vue'
export default {
  name: 'BaseLayout',
  data () {
    return {
      collapseMenu: false
    }
  },
  computed: {
    sideWidth () {
      if (this.collapseMenu) {
        return '65px'
      } else {
        return '162px'
      }
    }
  },
  methods: {
    toggleMenu () {
      this.collapseMenu = !this.collapseMenu
    }
  },
  components: {
    SideMenu,
    HeaderMenu
  }
}
</script>
<style scoped lang="less">
.contain{
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
  /deep/ .el-header{
    background: linear-gradient(to right,#3a72fe,#30c7e2);
    border-bottom: 1px solid #e6e6e6;
    color: #fff;
    line-height: @headerHeight;
    height: @headerHeight;
    font-size: 1.125em;
    background-color: @headerColor;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 99;
    .compnayName{
      margin-right:5px;
    }
    .toggleMenu{
      display: inline-block;
      width: @headerHeight;
      height:@headerHeight;
      line-height:@headerHeight;
      text-align:center;
      font-size: 1.25em;
      cursor: pointer;
      &:hover{
        background:@hoverBackground;
      }
    }
  }
  .left{
    height: 100vh;
    margin-top: -@headerHeight;
    padding-top: @headerHeight;
    box-sizing: border-box;
    /deep/ .el-aside{
      height:100%;
      .asideMenu{
        height: 100%;
      }
    }
  }
  /deep/ .el-main{
    position: relative;
    height: 100vh;
    margin-top: -@headerHeight;
    padding-top: @headerHeight + 20;
      font-size: 14px;
  }
}
</style>
