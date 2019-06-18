<template>
  <div class="headerMenu">
    <ul>
      <li class="showMenu">
        <img class="userpic" :src="require('@/images/userpic.png')" alt="">
        <span>{{userinfo.username}}</span>
        <div class="list">
          <dd><i class="el-icon-menu"></i>个人中心</dd>
          <dd><i class="el-icon-setting"></i>个人设置</dd>
          <p class="line"></p>
          <dd @click=logout><i class="el-icon-more"></i>退出登录</dd>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sideMenu',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.user.userinfo
    })
  },
  mounted () {},
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.headerMenu {
  color: #fff;
  display: flex;
  justify-content: flex-end;
  li{
    position: relative;
    display: inline-block;
    padding: 0 10px;
    box-sizing: border-box;
    min-width: @headerHeight;
    text-align: center;
    cursor: pointer;
    &:hover{
      background-color: rgba(0,0,0,0.1);
    }
    &.showMenu:hover .list{
      visibility: visible;
      transform: scaleY(1);
      cursor: pointer;
      dd:hover{
        background-color: rgba(0,0,0,0.1);
      }
    }
    span{
      vertical-align: middle;
    }
    .userpic {
      background-color: #fff;
      border-radius: 50%;
      line-height: 60px;
      width: 30px;
      height: 30px;
      margin: (@headerHeight - 30) / 2;
      vertical-align: middle;
    }
    .list{
      position: absolute;
      text-align: left;
      right: 0;
      font-size: 0.875em;
      top: @headerHeight;
      width: 150px;
      background: @headerColor;
      visibility: hidden;
      z-index: 999;
      transform: scaleY(0);
      transform-origin: 50% 0;
      transition: all 0.3s;
      dd{
        padding: 10px 15px;
        line-height: 26px;
        i{
          margin-right: 10px;
        }
      }
      .line{
        border-bottom: 1px solid shade(@headerColor,10%)
      }
    }
  }
}
</style>
