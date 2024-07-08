<template>
  <div>
      <div class="flex flex-col items-center justify-center h-dvh w-full bg-blue-950 text-white">
        <h1 class="text-3xl font-bold">Reset Password</h1>
        <br>
        <div class="w-full flex justify-center flex-col items-center">
        <form class="form-container flex flex-col w-[300px] h-[200px]" @submit.prevent="resetPassword">
          <div class="mb-4 w-[300px] flex flex-col">
            <label for="newPassword" class="mb-2">New Password:</label>
            <input maxlength="50" type="password" id="newPassword" v-model="newPassword" class=" text-black bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <div class="mb-4 w-[300px]">
            <label for="confirmPassword" class="mb-2">Confirm Password:</label>
            <input maxlength="50" type="password" id="confirmPassword" v-model="confirmPassword" class="text-black bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <input type="submit" value="Reset Password" class="btn btn-primary mb-4 w-[300px] py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"></input>
        </form>
      </div>
      </div>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import swal from 'sweetalert2';
  let host = ''
  export default {
    name: 'ResetPasswordPage',
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        token: '',
      };
    },
    created() {
          host = this.$store.state.host
    },
    mounted() {
      this.gettokenfromurlparams();
    },
    methods: {
      gettokenfromurlparams() {
        this.token = this.$route.params.token;
      },
      async resetPassword() {
        if (this.newPassword === this.confirmPassword) {
          if (this.newPassword.length < 8) {
            swal.fire({
                title: 'warning',
                text: 'The length of password must be more than 8 digits',
                icon: 'error',
                confirmButtonText: 'OK'
            });
          } else {
            if (!this.newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/)) {
              swal.fire({
                  title: 'warning',
                  text: 'Password must contain at least 1 capital letter, 1 small letter, 1 number, and 1 special character',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  footer: 'Special letter : @ $ ! % * ? & _ -'
              });
            } else {
               await axios.post(host + 'reset_password/confirm/', {
                 password: this.newPassword,
                 token: this.token,
               })
               .then((res) => {
                 console.log(res);
                 swal.fire({
                   icon: 'success',
                   title: 'Success',
                   text: 'Password has been reset!',
                 });
                 this.$router.push('/');
               })
               .catch((err) => {
                 console.log(err);
               });
              }
            }
        } else if (this.newPassword !== this.confirmPassword){
            swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Passwords do not match!',
            });
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred!',
          });
        }
      },
    }
  };
  </script>