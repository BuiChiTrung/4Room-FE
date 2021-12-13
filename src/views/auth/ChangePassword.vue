<template>
  <main>
    <form @submit="changePassword">
      <h1>Change password</h1>
      <div class="form-floating">
        <input class="form-control" type="password" id="old-password" placeholder="Old Password" v-model="changePasswordForm.old_password" required>
        <label for="old-password">Old Password</label>
      </div>
      <div class="form-floating">
        <input class="form-control" type="password" id="new-password" placeholder="New Password" v-model="changePasswordForm.new_password" required>
        <label for="new-password">New Password</label>
      </div>
      <div class="form-floating">
        <input class="form-control" type="password" id="new-password-confirmation"  placeholder="New Password Confirmation" v-model="changePasswordForm.new_password_confirmation" required>
        <label for="new-password-confirmation">Password Confirmation</label>
      </div>
      <button class="login100-form-btn">
        Change Password
      </button>
    </form>
  </main>
</template>

<script>
import {authApi} from "../../infrastructure/apiServices";

export default {
  name: "ChangePassword",
  data() {
    return {
      changePasswordForm: {
        'old_password': null,
        'new_password': null,
        'new_password_confirmation': null,
      }
    }
  },
  methods: {
    changePassword(event) {
      event.preventDefault();
      console.log(this.changePasswordForm)
      authApi.changePassword(this.changePasswordForm)
          .then(({data}) => {
            this.$router.push('/login');
            alert(data.message)
          })
          .catch(err => alert(err.response.data.message));
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
