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
import {register} from "@/infrastructure/apiServices";

export default {
  name: "RegisterPage",
  data() {
    return {
      registerForm: {
        email: '',
        name_in_forum: '',
        password: '',
        password_confirmation: ''
        // email: 'trungcspntl@gmail.com',
        // name_in_forum: 'Straw',
        // password: 'Trung123',
        // password_confirmation: 'Trung123'
      }
    }
  },
  methods: {
    register(event) {
      event.preventDefault();
      register(this.registerForm)
          .then(() => {
            // localStorage.setItem('jwt', response.data['jwt']);
            location.assign('/login');
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

@font-face {
  font-family: Poppins-Regular;
  src: url("../../assets/fonts/poppins/Poppins-Regular.ttf")
}

@font-face {
  font-family: Poppins-Bold;
  src: url('../../assets/fonts/poppins/Poppins-Bold.ttf');
}

@font-face {
  font-family: Poppins-Medium;
  src: url('../../assets/fonts/poppins/Poppins-Medium.ttf');
}

@font-face {
  font-family: Montserrat-Bold;
  src: url('../../assets/fonts/montserrat/Montserrat-Bold.ttf');
}

main {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(65deg, rgba(255, 204, 204,0.2), rgba(223, 249, 251,0.2)), url("../../assets/images/login_background.jpg");
  background-size: cover;
  @include flex-center-center;
}

form {
  width: 50%;
  border-radius: 5rem;
  font-size: 1.5rem;
  font-family: Poppins-Medium;
  background: white;
  padding: 5rem;
  h1 {
    margin-bottom: 3rem;
    font-family: Poppins-Bold;
  }

  div {
    width: 80%;
    margin: 0 auto 2rem;
    label {
      padding-left: 3.5rem;
      //padding: 1.75rem 3rem;
    }
    input {
      border-radius: 5rem;
      font-size: 1.2rem;
      height: 5rem !important;
      padding-left: 3rem !important;
    }
  }

  .login100-form-btn {
    font-family: Montserrat-Bold;
    font-size: 15px;
    line-height: 1.5;
    color: #fff;
    text-transform: uppercase;
    margin: auto;

    width: 40%;
    height: 50px;
    border-radius: 25px;
    background: #57b846;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .login100-form-btn:hover {
    background: #333333;
  }
}
</style>
