<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'pumps',
  data () {
    return {}
  },
  mounted () {}
}
</script>
<style lang="less">
.ios-switch {
  margin-bottom: 1px;
  display: inline-block;
  vertical-align: middle;
  width: 50px;
  border-radius: 18px;
  height: 25px;
  position: relative;
  cursor: pointer;
}
.ios-switch .checkbox {
  width: 50px;
  border-radius: 18px;
  height: 25px;
  background: #fff;
  z-index: 0;
  margin: 0;
  padding: 0;
  border: 1px solid #00a65a;
  cursor: pointer;
  position: relative;
  -webkit-transition-duration: 300ms;
  -ms-transition-duration: 300ms;
  transition-duration: 300ms;
}
.ios-switch .checkbox:after {
  content: "";
  height: 20px;
  width: 20px;
  border-radius: 16px;
  background: #00a65a;
  position: absolute;
  z-index: 2;
  top: 2px;
  left: 4px;
  transform: translateX(0px);
  -webkit-transform: translateX(0px);
  -ms-transform: translateX(0px);
  transition-duration: 300ms;
  -webkit-transition-duration: 300ms;
  -ms-transition-duration: 300ms;
}
.ios-switch.checked .checkbox {
  background: #00a65a;
}
.ios-switch.checked .checkbox:after {
  left: -15px;
  top: 2px;
  height: 20px;
  width: 20px;
  background: #fff;
}
.ios-switch.checked .checkbox:after {
  transform: translateX(42px);
  -webkit-transform: translateX(42px);
  -ms-transform: translateX(42px);
}
.ios-switch.disabled .checkbox {
  background: #999;
  border: 1px solid #999;
  cursor: not-allowed;
}
.ios-switch.disabled .checkbox:after {
  background: #fff;
}

.ios-switch.pumps {
  transform: scale(0.7);
}
.ios-switch.pumps .checkbox {
  border: 1px solid #12cea6;
}
.ios-switch.pumps .checkbox:after {
  background: #12cea6;
}
.ios-switch.pumps.checked .checkbox {
  background: #12cea6;
}
.ios-switch.pumps.checked .checkbox:after {
  background: #fff;
}
.ios-switch.pumps.disabled .checkbox {
  border: 1px solid #999;
  background: #fff;
}
.ios-switch.pumps.disabled .checkbox:after {
  background: #999;
}
.ios-switch.pumps.disabled.checked .checkbox {
  background: #999;
}
.ios-switch.pumps.disabled.checked .checkbox:after {
  background: #fff;
}
</style>
