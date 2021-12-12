<template>
  <main>
    <form @submit="resetPasswordRequest">
      <h1>Forgot password?</h1>
      <div class="form-floating">
        <input class="form-control" type="email" id="email" name="email" placeholder="name@example.com" v-model="email" required>
        <label for="email">Email</label>
      </div>
      <button class="login100-form-btn">
        Send email
      </button>
    </form>
  </main>
</template>

<script>
import {authApi} from "../../infrastructure/apiServices";

export default {
  name: "ResetPasswordRequest",
  data() {
    return {
      email: null,
    }
  },
  methods: {
    resetPasswordRequest(event) {
      event.preventDefault();
      authApi.resetPasswordRequest({'email' : this.email})
          .then(({data}) => alert(data.message))
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
