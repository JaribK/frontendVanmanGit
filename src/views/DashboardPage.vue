<script setup>
    import Navbar from "@/components/templates/Navbar.vue";
</script>
<template>
    <div>
        <div id="background" class="w-full h-lvh bg-white">
            <Navbar></Navbar>
            <div id="content" class="w-full h-fit bg-white pt-10">
                <div class="flex justify-center h-full w-full">
                    <div class="flex justify-end flex-wrap w-[50%]">
                        <div id="box" class="text-black animate-fade-up w-[500px] h-[540px] mx-10 bg-blue-200 drop-shadow-2xl rounded-lg p-10">
                            <div id="subtitle" class="w-full text-center font-bold mb-4">List Users (Click to view attendance details.)</div>
                            <div class="flex flex-col h-[450px] overflow-hidden">
                                <div v-for="user in paginatedUsers" :key="user.id" class="animate-fade-left flex justify-between items-center w-full h-[50px] border-b border-blue-500">
                                    <router-link :to="{ path: `/graph-attendance-views/${user.id}` }" class="transition hover: translate-x-[0.4px] hover:scale-110 hover: duration-300">
                                        <div class="flex items-center w-full" v-if="user.is_logged_in == true" :title="'can click to view a graph showing attendance details of this user.'">
                                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <div class="ml-2">{{ user.first_name }} {{ user.last_name }} <span class="font-bold">#</span> <span class="font-bold text-blue-700">{{ user.role }}</span></div>
                                            <div class="text-black text-[12px]"></div>
                                        </div>
                                    <div class="flex items-center w-full" v-if="user.is_logged_in == false" :title="'can click to view a graph showing attendance details of this user.'">
                                        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <div class="ml-2">{{ user.first_name }} {{ user.last_name }} <span class="font-bold">#</span> <span class="font-bold text-blue-700">{{ user.role }}</span></div>
                                        <div class="text-black text-[12px]"></div>
                                    </div>
                                </router-link>
                                </div>
                                <div class="w-full flex justify-center mt-10">
                                    <div class="join">
                                      <button class="join-item btn" @click="prevPage" :disabled="currentPage === 1">«</button>
                                      <button class="join-item btn btn-primary">Page {{ currentPage }}</button>
                                      <button class="join-item btn"@click="nextPage" :disabled="currentPage === totalPages">»</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-start flex-col w-[50%]">
                        <div id="box" class="animate-fade-up w-[500px] h-[250px] bg-green-200 drop-shadow-2xl rounded-md">
                            <div class="flex justify-center items-center w-full h-full">
                                <div class="text-black text-[30px] font-bold text-center">Date & Time <br><br> <span class="text-4xl">{{ format_datetime(server_datetime) }}</span></div>
                                </div>
                        </div>
                        <div id="box" class="animate-fade-up mt-10 w-[500px] h-[250px] bg-yellow-200 drop-shadow-2xl rounded-lg flex flex-row">
                            <div class="flex justify-center items-center w-[50%] h-full">
                                <div class="text-black text-[20px] font-bold text-center">Current online users<br><br> <span class="text-6xl text-success">{{ users_online }}</span></div>
                            </div>
                            <div class="flex justify-center items-center w-[50%] h-full">
                                <div class="text-black text-[20px] font-bold text-center">Total users in the system<br><br> <span class="text-6xl">{{ all_users }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="content2" class="w-full flex">
                    <div id="sw" class="w-[50%] flex justify-end px-10">
                        <router-link to="/approve-sw">
                            <div id="box" class="transition ease-in-out delay-150  hover:translate-y-16 hover:scale-110 hover:bg-indigo-500 duration-300 animate-fade-up mt-10 w-[500px] h-[250px] bg-red-200 drop-shadow-2xl rounded-lg flex flex-row">
                                <div id="subtitle" class="w-full text-center text-black font-bold mb-4 py-4 flex flex-col justify-center"><span class="text-[20px]">Number of work signatures pending approval</span> <br> <br>
                                    <span class="text-6xl text-warning">{{ amountleft_timesheets }}</span>
                                </div>
                            </div>
                        </router-link>
                        </div>
                    <div id="lreq" class="w-[50%] flex justify-start ">
                        <router-link to="/approve-lr">
                            <div id="box" class="transition ease-in-out delay-150  hover:translate-y-16 hover:scale-110 hover:bg-indigo-500 duration-300 animate-fade-up mt-10 w-[500px] h-[250px] bg-violet-200 drop-shadow-2xl rounded-lg flex flex-row">
                                <div id="subtitle" class="w-full text-center text-black font-bold mb-4 py-4 flex flex-col justify-center"><span class="text-[20px]">Number of leave requests pending approval</span> <br> <br>
                                    <span class="text-6xl text-warning">{{ amountleft_leavereq }}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div id="content2" class="w-full flex pb-10">
                    <div id="sw" class="w-[50%] flex justify-end px-10">
                        <router-link to="/feedback-admin">
                            <div id="box" class="transition ease-in-out delay-150  hover:translate-y-16 hover:scale-110 hover:bg-indigo-500 duration-300 animate-fade-up mt-10 w-[500px] h-[250px] bg-emerald-200 drop-shadow-2xl rounded-lg flex flex-row">
                                <div id="subtitle" class="w-full text-center text-black font-bold mb-4 pb-4 flex flex-col justify-center"><span class="text-[20px]">Number of unchecked feedback</span> <br> <br>
                                    <span class="text-6xl text-warning">{{ amountleft_feedbacks }}</span>
                                </div>
                            </div>
                        </router-link>
                        </div>
                    <div id="lreq" class="w-[50%] flex justify-start ">
                            <div id="box" class="transition ease-in-out delay-150  hover:translate-y-16 hover:scale-110 hover:bg-indigo-500 duration-300 animate-fade-up mt-10 w-[500px] h-[250px] bg-orange-200 drop-shadow-2xl rounded-lg flex flex-row">
                                <div id="subtitle" class="w-full h-full text-center text-black font-bold mb-4 pb-4 flex flex-col  justify-center">
                                    <span class="text-4xl text-black">Coming Soon...</span>
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
        name: "DashboardPage",
        data() {
            return {
                server_datetime: '',
                server_date: '',
                server_time: '',
                list_users: [],
                users_online: '',
                all_users: '',
                currentPage: 1,
                itemsPerPage: 7,
                list_timesheets: [],
                list_leavereq: [],
                list_feedbacks: [],
                amountleft_timesheets: '',
                amountleft_leavereq: '',
                amountleft_feedbacks: ''
            }
        },
        computed: {
            loggedInUsers() {
                const sortedUsers = this.list_users.sort((a, b) => {
                    if (a.is_logged_in && !b.is_logged_in) {
                        return -1; // a comes before b
                    } else if (!a.is_logged_in && b.is_logged_in) {
                        return 1; // b comes before a
                    } else {
                        return 0; // no change in order
                    }
                });
                return sortedUsers;
            },
            totalPages() {
              return Math.ceil(this.loggedInUsers.length / this.itemsPerPage);
            },
            paginatedUsers() {
              const startIndex = (this.currentPage - 1) * this.itemsPerPage;
              return this.loggedInUsers.slice(startIndex, startIndex + this.itemsPerPage);
            },
        },
        created() {
          host = this.$store.state.host
        },
        mounted() {
            this.updateDateTime()
            this.getTimesheets()
            this.getFeedbacks()
            this.getLeaveReq()
            this.getUsers()
            this.getamountUsers()
            setInterval(() => {
                this.updateDateTime()
                this.getTimesheets()
                this.getLeaveReq()
            }, 1000)
        },
        methods: {
            prevPage() {
              if (this.currentPage > 1) {
                this.currentPage--;
              }
            },
            nextPage() {
              if (this.currentPage < this.totalPages) {
                this.currentPage++;
              }
            },

            updateDateTime() {
              const now = new Date();
              const date = this.formatDate(now);
              const time = this.format_time(now);

              this.server_datetime = `${date} ${time}`;

              this.server_date = now.toISOString().split('T')[0];

              this.server_time = now.toTimeString().split(' ')[0];
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

            getUsers(){
                axios.get(host + 'users/',)
                .then(res => {
                    this.list_users = res.data
                    this.countloggedinUsers()
                })
            },

            countloggedinUsers(){
                let count = 0
                for (let i = 0; i < this.list_users.length; i++){
                    if (this.list_users[i].is_logged_in == true){
                        count++
                    }
                }
                this.users_online = count
            },

            getamountUsers(){
                axios.get(host + 'users/',)
                .then(res => {
                    this.all_users = res.data.length
                })
            },

            getTimesheets(){
                axios.get(host + 'timesheets/',)
                .then(res => {
                    this.list_timesheets = res.data
                    this.countstatusoftimesheets()
                })
            },

            countstatusoftimesheets(){
                let count = 0
                for (let i = 0; i < this.list_timesheets.length; i++){
                    if (this.list_timesheets[i].status == 1){
                        count++
                    }
                }
                this.amountleft_timesheets = count
            },

            getLeaveReq(){
                axios.get(host + 'leave_requests/',)
                .then(res => {
                    this.list_leavereq = res.data
                    this.countstatusofleavereq()
                })
            },

            countstatusofleavereq(){
                let count = 0
                for (let i = 0; i < this.list_leavereq.length; i++){
                    if (this.list_leavereq[i].status == 1){
                        count++
                    }
                }
                this.amountleft_leavereq = count
            },

            getFeedbacks(){
                axios.get(host + 'feedbacks/',)
                .then(res => {
                    this.list_feedbacks = res.data
                    this.countstatusoffeedbacks()
                })
            },

            countstatusoffeedbacks(){
                let count = 0
                for (let i = 0; i < this.list_feedbacks.length; i++){
                    if (this.list_feedbacks[i].status == 0){
                        count++
                    }
                }
                this.amountleft_feedbacks = count
            }
            
        }
    }
</script>