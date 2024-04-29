<template>
    <div>
      <h1>Change Password</h1>
      <form @submit.prevent="changePassword">
        <label for="currentPassword">Current Password:</label>
        <input type="password" id="currentPassword" v-model="currentPassword">
  
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
        currentPassword: '',
        newPassword: '',
        message: ''
      };
    },
    methods: {
      async changePassword() {
        try {
          // Send a request to your Django backend API to change the password
          // Use Axios or another HTTP client library
          const response = await axios.post('/api/change-password', {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
          });
          this.message = response.data.message; // Display success message
        } catch (error) {
          this.message = error.response.data.error; // Display error message
        }
      }
    }
  };
  </script>