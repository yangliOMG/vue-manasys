<template>
  <div class="error">
    <div class="imgBlock">
      <div class=""></div>
    </div>
    <div>
      <h5>404</h5>
      <p>抱歉，你访问的页面不存在</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error404',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.error{
  width: 100vw;
  height: 70vh;
  padding: 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .imgBlock{
    flex: 0 0 62.5%;
    height: 360px;
    width: 62.5%;
    padding-right: 152px;
    div{
      width: 100%;
      height: 100%;
      background: url('../images/404.svg')right center no-repeat;
      background-size: contain;
    }
  }
  h5{
    color: #434e59;
    font-size: 72px;
    font-weight: 600;
    line-height: 72px;
    margin-bottom: 24px;
  }
  p{
    color: rgba(0,0,0,.45);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
  }
}
@media screen and ( max-width: 576px ) {
  .error{
    display: block;
    text-align: center;
    .imgBlock{
      padding-right: 0;
      margin: 0 auto 24px;
    }
  }
}
</style>
