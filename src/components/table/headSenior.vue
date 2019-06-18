<template>
<div class="tableHeader">
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="14">
      <span @click="changeModel(0)" class="tag" :class="model === 0?'actice':''">常用
      </span><span @click="changeModel(1)" class="tag" :class="model === 1?'actice':''">高级
      </span>
      <div class="searchBox" v-show="model === 0">
        <span>{{title}}：</span>
        <el-input
          v-model="search.name"
          @keyup.13="handleSearch"
          @change="handleSearch"
          style="width:200px;"
          size="small"
          placeholder="输入关键字搜索"/>
      </div>
    </el-col>
    <el-col :span="8">
      <slot></slot>
    </el-col>
    <el-col :span="2" style="text-align:right;position:relative;">
      <div class="showbox">
        <i class="columShow el-icon-setting"></i>
        <ul class="showlist">
          <li
            v-for="option in data"
            :key="option.name"
            :class="option.visible?'live':''"
            @click="toggle(option)">
            <span class="name">{{option.name}}</span>
            <i :class="option.visible?'active':''" class="el-icon-check"></i>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'headSenior',
  props: {
    title: {
      type: String,
      default: '用户名称'
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      search: {
        name: ''
      },
      model: 0
    }
  },
  mounted () {
    // this.$route.name
  },
  methods: {
    handleSearch () {
      this.$emit('getSearch', this.search)
    },
    changeModel (i) {
      this.model = i
      if (i === 1) {
        this.$emit('showSearch', true)
      } else {
        this.$emit('showSearch', false)
      }
    },
    toggle (option) {
      option.visible = !option.visible
    }
  }
}
</script>
<style lang="less" scoped>
.tableHeader{
  padding: 10px 15px;
  border: 1px solid #ebeef5;
  border-bottom: 0;
  .tag{
    display: inline-block;
    background-color: #ebeef5;
    padding: 8px 10px;
    color: #ccc;
    cursor: pointer;
    transition: all .3s;
    &:hover, &.actice{
      color: #fff;
      background-color: #ff943e;
    }
  }
  .searchBox{
    display: inline-block;
    span{
      color: #666;
      font-size: 0.875em;
      margin-left: 10px;
    }
  }
  .showbox{
    display: inline-block;
    .columShow{
      line-height: 33px;
      font-size: 1.25em;
      color: #666;
      cursor: pointer;
    }
    &:hover .showlist{
      visibility: visible;
      transform: scaleY(1);
    }
    .showlist{
      position: absolute;
      top: 32px;
      right: -10px;
      width: 180px;
      max-height: 200px;
      padding: 10px 0;
      border: @border;
      overflow: auto;
      background-color: #fff;
      z-index: 99;
      visibility: hidden;
      transform: scaleY(0);
      transform-origin: 50% 0;
      transition: all .3s;
      li{
        line-height: 30px;
        cursor: pointer;
        padding: 0 15px;
        margin-bottom: 5px;
        color: @gray;
        &.live{
          color: @blue;
        }
        &:hover{
          background-color: @hoverBackground
        }
        .name{
          display: inline-block;
          text-align: left;
          vertical-align: middle;
          width: 120px;
          .overpoint;
        }
        &>i.active{
          visibility: visible;
        }
        &>i{
          visibility: hidden;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
