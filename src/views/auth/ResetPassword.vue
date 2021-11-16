<template>
  <main>
    <form @submit="resetPassword">
      <h1>Reset password</h1>
      <div class="form-floating">
        <input class="form-control" type="password" id="password" name="password" placeholder="Password" v-model="resetPasswordForm.password" required>
        <label for="password">New Password</label>
      </div>
      <button class="login100-form-btn">
        Reset
      </button>
    </form>
  </main>
</template>

<script>
import {authApi} from "../../infrastructure/apiServices";

export default {
  name: "ResetPassword",
  data() {
      return {
        resetPasswordForm: {
          'password': null,
          'token': null
        }
      }
  },
  created() {
        this.resetPasswordForm.token = this.$route.params['token'];
  },
  methods: {
    resetPassword(event) {
      event.preventDefault();
      authApi.resetPassword(this.resetPasswordForm)
        .then(({data}) => {
            this.$router.push('/login');
            alert(data.message)
        })
        .catch(() => alert('Reset password failed'));
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/sass/style";
@import "src/assets/sass/auth-form";

form {
  max-width: 60rem;
}
</style>
