<template>
  <div class="login">
    <form class="form">
      <h5>登录</h5>
      <div class="formControls">
        <el-input placeholder="请输入用户名" v-model="form.userName" autocomplete="off">
          <span slot="prepend">
            <i class="el-icon-date"></i>
          </span>
        </el-input>
      </div>
      <div class="formControls">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          autocomplete="new-password"
          type="password"
          @keyup.13.native="onSubmit"
        >
          <span slot="prepend">
            <i class="el-icon-date"></i>
          </span>
        </el-input>
      </div>
      <div class="formControls">
        <el-checkbox v-model="form.remember">记住密码</el-checkbox>
        <div class="connection">
          <el-tooltip effect="dark" content="电话：86645648" placement="top-end">
            <el-button style="padding:0;" type="text">联系我们</el-button>
          </el-tooltip>
        </div>
      </div>
      <div>
        <el-button
          type="primary"
          plain
          style="width:100%;"
          :loading="submitStatus"
          @click="onSubmit"
        >登 录</el-button>
      </div>
    </form>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'login',
  data () {
    return {
      form: {
        userName: 'yf',
        password: 'yf1@',
        remember: false
      },
      submitStatus: false
    }
  },
  methods: {
    onSubmit () {
      this.submitStatus = true
      this.form.password = md5(this.form.password)
      this.$store.dispatch('user/login', this.form).then((res) => {
        this.submitStatus = false
        this.$store.commit('user/setuserinfo', this.form)
        if (res.status === '0') {
          this.$router.push('/pumps/operate/live')
        } else {
          this.$notify({
            title: '错误',
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$notify({
          title: '错误',
          message: err.message,
          type: 'warning'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background: url("../images/background.jpg") center 50% no-repeat;
  background-size: cover;
}
form {
  position: absolute;
  right: 10%;
  top: 50%;
  font-size: 1em;
  width: 20em;
  height: 23.75em;
  margin-top: -11.875em;
  background-color: #fff;
  padding: 50px 20px 0;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  vertical-align: middle;
  h5 {
    text-align: center;
    line-height: 1em;
    margin-bottom: 0.83em;
    font-size: 1.5em;
  }
  .formControls {
    margin-bottom: 15px;
  }
  .connection {
    float: right;
  }
}
@media screen and (max-width: 980px) {
  form {
    right: 50%;
    margin-right: -10em;
  }
}
</style>
