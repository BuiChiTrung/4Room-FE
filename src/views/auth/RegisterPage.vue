<template>
  <main>
    <form @submit="register">
      <h1>Register an account</h1>
      <div class="form-floating">
        <input class="form-control" type="email" id="email" name="email" placeholder="name@example.com" v-model="registerForm.email" required>
        <label for="email">Email</label>
      </div>
      <div class="form-floating">
        <input class="form-control" type="text" id="name_in_forum" name="name_in_forum" placeholder="Name in forum" v-model="registerForm.name_in_forum" required>
        <label for="name_in_forum">Name in forum</label>
      </div>
      <div class="form-floating">
        <input class="form-control" type="password" id="password" name="password" placeholder="Password" v-model="registerForm.password" required>
        <label for="password">Password</label>
      </div>
      <div class="form-floating">
        <input class="form-control" type="password" id="password_confirmation" name="password_confirmation" placeholder="Password Confirmation" v-model="registerForm.password_confirmation" required>
        <label for="password_confirmation">Password Confirmation</label>
      </div>
      <button class="login100-form-btn">
         Register
      </button>
    </form>
  </main>
</template>

<script>
import {authApi} from "@/infrastructure/apiServices";

export default {
  name: "RegisterPage",
  data() {
    return {
      registerForm: {
        email: '',
        name_in_forum: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    register(event) {
      event.preventDefault();
      authApi.register(this.registerForm)
          .then(() => {
            location.assign('/login');
            alert('Successfully register an account');
          })
          .catch(err => {
            alert(err.response.data.message);
          })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/sass/style";
@import "src/assets/sass/auth-form";
</style>
