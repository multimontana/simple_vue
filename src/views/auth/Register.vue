<template>
  <div class="login-box">
    <input type="text" name="username" placeholder="Username" class="form-control" autofocus="true"
           required="true" v-model="name">
    <input type="email" name="username" placeholder="Username" class="form-control" autofocus="true"
           required="true" v-model="email">

    <input type="password" name="password" placeholder="password" class="form-control" required="true"
           v-model="password">

    <button type="button" class="btn btn-primary btn-block btn-flat" @click.prevent="registerUserPost"><i
        class="fa fa-sign-in"></i> Login
    </button>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    }
  },
  methods: {
    ...mapActions(['registerUserAction']),
    ...mapMutations(['UPDATE_LOGIN']),
    registerUserPost() {
      this.registerUserAction({
        name: this.name,
        email: this.email,
        password: this.password
      }).then((res) => {
        console.log(res)
        this.$router.push('/');
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>