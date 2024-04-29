<template>
    <div>
      <h1>Change Password</h1>
      <form @submit.prevent="changePassword">
  
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" v-model="newPassword">

        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword">
  
        <button type="submit">Reset Password</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        token: this.$route.query.token,
      };
    },
    mounted() {
      console.log(this.token);
    },
    methods: {
    }
  };
  </script>