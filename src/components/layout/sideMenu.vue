<template>
<el-menu
  class="asideMenu"
  :default-active="$route.path"
  :collapse="collapseMenu"
  :collapse-transition="false"
  :router="true">
  <div v-for="option in menuList" :key="option.name">
    <el-menu-item v-if="!option.children && option.meta && 'baseLayout' == option.meta.layout" :index="option.path">
      <i :class="option.icon?option.icon:'el-icon-menu'"></i>
      <span slot="title">{{option.name}}</span>
    </el-menu-item>
    <el-submenu v-if="option.children" :index="option.path" >
      <div slot="title">
        <i :class="option.icon?option.icon:'el-icon-location'"></i>
        <span slot="title">{{option.name}}</span>
      </div>
      <el-menu-item
        v-for="item in option.children"
        :key="item.name"
        :index="(option.path + '/' + item.path)">
        {{item.name}}
      </el-menu-item>
    </el-submenu>
  </div>
</el-menu>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'sideMenu',
  props: {
    collapseMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.user.permission.menuList
    })
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style >
.el-submenu .el-menu-item {min-width: initial;}
.el-menu--collapse>div>.el-menu-item [class^=el-icon-],
.el-menu--collapse>div>.el-submenu>.el-submenu__title [class^=el-icon-] {
  margin: 0;
  vertical-align: middle;
  width: 24px;
  text-align: center
}

.el-menu--collapse>div>.el-menu-item .el-submenu__icon-arrow,
.el-menu--collapse>div>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
  display: none
}

.el-menu--collapse>div>.el-menu-item span,
.el-menu--collapse>div>.el-submenu>.el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block
}
</style>
