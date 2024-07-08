<script setup>
    import Navbar from "@/components/templates/Navbar.vue";
</script>
<template>
    <div>
        <div id="background" class="w-full h-fit bg-white">
            <Navbar></Navbar>
                <div class="w-[100%] text-center text-black text-[20px] font-bold py-4 flex justify-center animate-fade-up animate-once">
                        <div id="datetime-server">
                            Time Attendance On {{ formatDate(server_date)  }} at {{ format_time(server_time) }}
                        </div>
                </div>
                <div class="grid grid-cols-1 h-lvh animate-fade-up animate-once">
                    <div class="flex flex-col items-center w-full">
                        <h1 class="text-black text-[30px] py-[32px] font-bold">Profile</h1>
                        <p class="text-black text-[24px] font-bold ">
                            User, {{ user.username }}
                        </p>
                    </div>
                <div class="w-full flex justify-center flex-col items-center bg-white animate-fade-up animate-once">
                    <div id="information" class=" w-[1024px] my-16 rounded-[28px] overflow-hidden justify-self-center drop-shadow-2xl">
                        <div class="bg-[#3C3C3C] drop-shadow-lg p-4">
                            <h2 class="text-white ml-8">Info Account</h2>
                        </div>
                        <div class="bg-[#303346] h-fit z-40 p-12 drop-shadow-2xl">
                            <div>
                                <div class="grid grid-cols-2 place-items-center h-full gap-12">
                                    <label class="flex h-[56px] relative">
                                        <div class="py-4 w-[123px] bg-[#3C3C3C] text-white rounded-l-[20px] grid place-items-center">
                                            <p>FirstName</p>
                                        </div>
                                        <!-- Invisible overlay -->
                                        <div class="absolute inset-0 cursor-not-allowed"></div>
                                        <input type="text" :value="user.first_name" class="input rounded-l-none h-full rounded-r-[20px] pointer-events-none" readonly>
                                    </label>
                                    <label class="flex h-[56px] relative">
                                        <div class="py-4 w-[123px] bg-[#3C3C3C] text-white rounded-l-[20px] grid place-items-center">
                                            <p>LastName</p>
                                        </div>
                                        <!-- Invisible overlay -->
                                        <div class="absolute inset-0 cursor-not-allowed"></div>
                                        <input type="text" :value="user.last_name" class="input rounded-l-none h-full rounded-r-[20px] pointer-events-none" readonly>
                                    </label>
                                    <label class="flex h-[56px] relative">
                                        <div class="py-4 w-[123px] bg-[#3C3C3C] text-white rounded-l-[20px] grid place-items-center">
                                            <p>Email</p>
                                        </div>
                                        <!-- Invisible overlay -->
                                        <div class="absolute inset-0 cursor-not-allowed"></div>
                                        <input type="text" :value="user.email" class="input rounded-l-none h-full rounded-r-[20px] pointer-events-none" readonly>
                                    </label>
                                    <label class="flex h-[56px] relative">
                                        <div class="py-4 w-[123px] bg-[#3C3C3C] text-white rounded-l-[20px] grid place-items-center">
                                            <p>Role</p>
                                        </div>
                                        <!-- Invisible overlay -->
                                        <div class="absolute inset-0 cursor-not-allowed"></div>
                                        <input type="text" :value="user.role" class="input rounded-l-none h-full rounded-r-[20px] pointer-events-none" readonly>
                                    </label>
                                    <label class="flex h-[56px] relative items-center">
                                        <div class="py-4 w-[123px] bg-[#3C3C3C] text-white rounded-l-[20px] grid place-items-center">
                                            <p>Supervisor</p>
                                        </div>
                                        <!-- Invisible overlay -->
                                        <div class="absolute inset-0 cursor-not-allowed"></div>
                                        <input type="text" :value="supervisor_flname" class="input rounded-l-none h-full rounded-r-[20px] pointer-events-none" readonly>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="information" class=" w-[1024px] rounded-[28px] overflow-hidden justify-self-center drop-shadow-2xl mb-10">
                        <div class="bg-[#3C3C3C] drop-shadow-lg z-50 p-4">
                            <h2 class="text-white ml-8">Setting Account</h2>
                        </div>
                        <div class="bg-[#303346] h-fit p-12 drop-shadow-2xl">
                            <div>
                                <div class="flex flex-wrap justify-evenly place-items-center h-full gap-12">
                                    <button class="btn w-[212px] h-[48px] btn-warning border-none" @click="sendEmail">Reset Password</button>
                                    <button class="btn w-[212px] h-[48px] mx-4 btn-info border-none" onclick="my_modal_1.showModal()">Change Supervisor</button>
                                    <dialog id="my_modal_1" class="modal">
                                      <div class="modal-box">
                                        <h3 class="font-bold text-lg">Change Supervisor</h3>
                                        <p class="py-4">Now your supervisor is : <strong>{{ supervisor_flname }}</strong></p>
                                            <div id="change-supervisor">
                                                <label for="supervisor">Select Supervisor</label>
                                                <select name="supervisor" id="supervisor" v-model="select_supervisor" class="select select-bordered w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                                                    <option value="" disabled selected>Select Supervisor</option>
                                                    <option class="text-black" v-for="user in superusersList" :key="user.id" :value="user.id">
                                                                {{user.first_name}} {{user.last_name}}
                                                    </option>
                                                </select>
                                            </div>
                                        <div class="modal-action">
                                          <form method="dialog" class="w-full flex justify-between">
                                            <button class="btn btn-success" @click="changeSupervisor">Chnage</button>
                                            <button class="btn btn-warning">Close</button>
                                          </form>
                                        </div>
                                      </div>
                                    </dialog>
                                    <button class="btn w-[212px] h-[48px] mx-4 btn-error border-none" @click="buttonInFuture">In Processing</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import moment from 'moment'
let host = ''
    export default {
        name: 'ProfilePage',
        data(){
            return{
                user:'',
                user_id: '',
                server_datetime: '',
                server_date: '',
                server_time: '',
                email: '',
                usersList: [],
                listUsersEamil: [],
                supervisor_flname: '',
                superusersList: [],
                select_supervisor: ''
            }
        },
        created() {
          host = this.$store.state.host
        },
        mounted(){
            this.getUser()
            this.getUsers()
            this.getsuperUsers()
            this.getOnlyEmail()
            this.updateDateTime()
            this.email = this.user.email
            setInterval(() => {
                this.updateDateTime()
                this.getUser()
                this.getUsers()
            }, 1000)
        },
        methods: {
            getsuperUsers(){
                axios.get(host + 'users/')
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].is_superuser == true) {
                            this.superusersList.push(response.data[i])
                        }
                    }
                })
            },
            changeSupervisor(){
                swal.fire({
                    title: 'Warning',
                    text: 'Are you sure you want to change your supervisor?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.patch(`${host}users/${this.user_id}/`, {
                            supervisor: this.select_supervisor
                        }).then((response) => {
                            swal.fire({
                                title: 'Success',
                                text: 'Supervisor has been changed',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        })
                    } else {

                    }
                })
            },
            getUsers(){
                axios.get(`${host}users/`)
                .then((response) => {
                    this.usersList = response.data
                    this.filterSupervisorUsername(this.user_id)
                })
            },
            getOnlyEmail(){
                axios.get(`${host}users/`)
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        const lE = response.data[i].email
                        this.listUsersEamil.push(lE)
                    }
                })
            },
            formatDate(datetime){
                return moment(datetime).format('D MMM YYYY')
            },

            format_datetime(datetime){
                return moment(datetime).format('D MMM YYYY hh:mm:ss A')
            },

            format_time(time){
                return moment(time, 'HH:mm:ss').format('hh:mm:ss A')
            },
            updateDateTime() {
              const now = new Date();
              const date = this.formatDate(now);
              const time = this.format_time(now);

              this.server_datetime = `${date} ${time}`;

              this.server_date = now.toISOString().split('T')[0];

              this.server_time = now.toTimeString().split(' ')[0];
            },
            buttonInFuture(){
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
                      icon: "warning",
                      title: "Can't use this feature yet, please wait for the next update."
                    });
            },
            getUser() {
                const userjson = localStorage.getItem('user')
                const user_data = JSON.parse(userjson)
                this.user = user_data
                this.user_id = user_data.id
            },
            async logout(){
                await axios.post(host + 'api/logout/',{},
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`
                        }
                    }
                ).then(() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
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
                      title: "Logged out successfully"
                    });
                    this.$router.push('/');
                }).catch((err) => {
                    console.log(err)
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
                        if (this.listUsersEamil.includes(this.email)) {
                            await axios.post(`${host}reset_password/`, {
                                email: this.email
                            }).then(async(response) => {
                                swal.fire({
                                    title: 'Success',
                                    text: 'Email has been sent',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                });
                                await axios.post(host + 'api/logout/',{},
                                    {
                                        headers: {
                                            'Authorization': `Token ${localStorage.getItem('token')}`
                                        }
                                    }
                                ).then(() => {
                                    localStorage.removeItem('user');
                                    localStorage.removeItem('token');
                                    this.$router.push('/');
                                }).catch((err) => {
                                    console.log(err)
                                })
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
                            text: 'Reset Password Cancelled',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                })
            },
            filterSupervisorUsername(user_id) {
                const user1 = this.usersList.find(user => user.id === user_id);
                if (user1) {
                    const supervisor = this.usersList.find(user => user.id === user1.supervisor);
                    if (supervisor) {
                        this.supervisor_flname = supervisor.first_name + ' ' + supervisor.last_name;
                    } else {
                        console.error(`Supervisor with ID ${user1.supervisor} not found`);
                    }
                } else {
                    console.error(`User with ID ${user_id} not found`);
                }
            }
                       
        }
    }
</script>
