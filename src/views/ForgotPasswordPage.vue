<template>
    <div>
        <div class="w-full h-dvh flex flex-col justify-center items-center bg-blue-950 text-white">
        <h1 class="text-3xl font-semibold ">Forgot Password</h1>
        <br>
        <p class="text-center">Enter your email address that you registered with your account <br> and we'll send you a link to reset your password.</p>
        <br><br>
            <form class="form-container" @submit.prevent="sendEmail">
                <div v-if="IsSend == false" class="form-container flex flex-col w-[300px] h-[200px]">
                    <label for="email" class="">Email:</label>
                    <input type="email" id="email" name="email" required class="border text-black bg-white border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" v-model="email">
                    <br>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Send Email
                    </button>
                </div>
                <div v-else>
                    <p class="text-center text-white font-bold">Email has been sent. Please check your email. <br> <a @click="ChangeIsSend" href="#">Send Again?</a></p>
                </div>
            </form>
            <div class="py-10 flex justify-center">
                <router-link to="/">
                    <button class="btn btn-circle btn-outline bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
let host = ''
    export default {
        name: 'ForgotPasswordPage',
        data() {
            return {
                email: '',
                IsSend: false,
                usersList: [],
                listUsersEmail: []
            }
        },
        created() {
          host = this.$store.state.host
        },
        mounted(){
            this.getUsers()
            this.getOnlyEmail()
        },

        methods: {
            ChangeIsSend(){
                this.IsSend = false
            },
            getUsers(){
                axios.get(`${host}users/`)
                .then((response) => {
                    this.usersList = response.data
                })
            },
            getOnlyEmail(){
                axios.get(`${host}users/`)
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        const lE = response.data[i].email
                        this.listUsersEmail.push(lE)
                    }
                })
            },

            async sendEmail() {
                swal.fire({
                    title: 'Warning',
                    text: 'Are you sure you want to reset your password?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        if (this.listUsersEmail.includes(this.email)) {
                            await axios.post(`${host}reset_password/`, {
                                email: this.email
                            }).then((response) => {
                                const Toast = swal.mixin({
                                  toast: true,
                                  position: "top-end",
                                  showConfirmButton: false,
                                  timer: 3000,
                                  timerProgressBar: true,
                                  didOpen: (toast) => {
                                    toast.onmouseenter = swal.stopTimer;
                                    toast.onmouseleave = swal.resumeTimer;
                                  }
                                });
                                Toast.fire({
                                  icon: "success",
                                  title: "Email has been sent!"
                                });
                                this.IsSend = true
                            })
                        } else {
                            swal.fire({
                                title: 'Error',
                                text: 'Email not found',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    } else if (result.dismiss === swal.DismissReason.cancel) {
                        swal.fire({
                            title: 'Cancelled',
                            text: 'Reset password has been cancelled',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                })
            }
        }
    }
</script>