<template>
    <div>
        <div id="background" class="w-full h-fit bg-white">
            <div class="navbar bg-gray-800">
                <div class="flex-1 px-2 lg:flex-none">
                    <a class="text-lg font-bold text-white">LeaveRequest Form</a>
                </div> 
                <div class="flex justify-end flex-1 px-2">
                    <div class="flex items-stretch">
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost text-black bg-white rounded-btn">Welcome, {{ user.username }}</div>
                                <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                    <li><router-link to="/home">Back to Home</router-link></li>
                                    <li><router-link to="/leave-req">Leave Request</router-link></li>
                                    <li v-if="user.is_superuser == true"><router-link to="/home/admin">Manage Attendance</router-link></li>
                                    <li v-if="user.is_superuser == true"><router-link to="/approve-lr">Manage Leave Request</router-link></li>
                                    <li class="bg-error text-black rounded" @click="logout"><a>logout</a></li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content" class="w-full h-lvh flex justify-center">
            <div id="box" class="bg-white w-[100%] h-fit flex justify-start flex-col" >
                <div id="title" class="text-black font-bold w-full text-center my-[64px] text-[30px]">Leave Request</div>
                <div id="from" class="w-full">
                    <form @submit.prevent="post_leaverequest" class="px-[40px] flex justify-evenly flex-wrap" >
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text text-black">Leave DateTime Start</span>
                            </div>
                            <input id="datetimein" type="datetime-local" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-10" v-model="datetime_start" required/>
                        </label>
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text text-black">Leave DateTime End</span>
                            </div>
                            <input id="datetimeout" type="datetime-local" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-10" v-model="datetime_end" required/>
                        </label>
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text text-black">Description</span>
                            </div>
                            <input id="description" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-10" v-model="description" required/>
                        </label>
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text text-black">Tel</span>
                            </div>
                            <input id="tel" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-10" v-model="tel" required/>
                        </label>
                        <div class="w-full flex justify-center flex-wrap">
                                <input type="submit"  value="Send Request" class="btn w-[300px] h-[50px] bg-[#3668A7] text-white rounded-[10px] my-[64px] cursor-pointer">
                                <button type="button" @click="clearForm" class="btn btn-warning w-[200px] h-[50px] text-black rounded-[10px] mx-4 my-[64px] cursor-pointer">Clear Input</button>
                        </div>
                    </form>
                </div>
                <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center mb-10">
                        <table class="table py-[100px] w-[80%] text-center">
                            <thead class="text-black bg-emerald-400 rounded-t-lg">
                                <tr class="rounded-t-lg text-[15px]">
                                    <th class="w-[10%]">No.</th>
                                    <th class="w-[40%]">Leave DateTime that request</th>
                                    <th class="w-[40%]">Description</th>
                                    <th class="w-[10%]">Status</th>
                                </tr>
                            </thead>
                            <tbody class="text-black text-center">
                                    <tr v-for="lr,index in displayedAttendance" :key="lr.id" class="border-b-black">
                                        <td class="border-b-blue-900">{{ index + 1 }}</td>
                                        <td class="border-b-blue-900">{{ formatDateTime(lr.datetime_start) }} - {{ formatDateTime(lr.datetime_end) }}</td>
                                        <td class="border-b-blue-900">{{ lr.description }}</td>
                                        <td v-if="lr.status == 0" class="border-b-blue-900 text-red-600 font-bold">Rejected</td>
                                        <td v-if="lr.status == 1" class="border-b-blue-900 text-warning font-bold">Pending</td>
                                        <td v-if="lr.status == 2" class="border-b-blue-900 text-success font-bold">Approved</td>
                                    </tr>
                            </tbody>
                        </table>
                </div>
                <div class="flex justify-center mt-4 pb-[32px] flex-wrap items-center">
                      <button class="btn btn-warning mr-4" @click="goToFirstPage" :disabled="currentPage === 1">Go to First Page</button>
                      <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                      <span class=" text-black mx-4"> Page : {{ currentPage }}</span>
                      <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                      <button class="btn btn-warning ml-4" @click="goToLastPage" :disabled="currentPage === totalPages">Go to Last Page</button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import swal from 'sweetalert2'
    const host = 'http://localhost:8000/'
    import moment from 'moment'
    export default {
        name: 'LeaveReqPage',
        data(){
            return{
                user: '',
                datetime_start: '',
                datetime_end: '',
                description:'',
                tel:'',
                list_leaverequest: [],
                today: '',
                diff_day: '',
                currentPage: 1,
                itemsPerPage: 10,
            }
        },
        mounted(){
            this.getUser()
            this.getlist_leaverequest()
            this.gettoday()
        },
        computed: {
            showmy_leaverequest(){
                return this.list_leaverequest.filter((lr) => lr.user == this.user.id)
            },
            totalPages() {
              return Math.ceil(this.showmy_leaverequest.length / this.itemsPerPage);
            },
            displayedAttendance() {
              const startIndex = (this.currentPage - 1) * this.itemsPerPage;
              const endIndex = this.currentPage * this.itemsPerPage;
              return this.showmy_leaverequest.slice(startIndex, endIndex);
            }
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
            goToFirstPage() {
              this.currentPage = 1;
            },
            goToLastPage() {
              this.currentPage = this.totalPages;
            },
            gettoday(){
                this.today = moment().format('YYYY-MM-DD')
            },
            getUser(){
                const userjson = localStorage.getItem('user')
                const user_data = JSON.parse(userjson)
                this.user = user_data
            },
            getlist_leaverequest(){
                axios.get(`${host}leave_requests`)
                .then((res) => {
                    this.list_leaverequest = res.data
                })
            },
            clearForm() {
                  this.datetime_start = '';
                  this.datetime_end = '';
                  this.description = '';
                  this.tel = '';
            },
            formatDateTime(datetime){
                return moment(datetime).format('D MMM YYYY | hh:mm A')
            },
            post_leaverequest(){
                try {
                    swal.fire({
                        title: 'Are you sure?',
                        text: 'You will send this leave request',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const today = moment(this.today)
                            const start = moment(this.datetime_start)
                            const end = moment(this.datetime_end)
                            if (end.diff(today, 'days') < 15) {
                                swal.fire({
                                    title: 'Error',
                                    text: 'DateTime must be greater than 15 days from today',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                })
                            } else if (start.diff(today, 'days') < 15) {
                                swal.fire({
                                    title: 'Error',
                                    text: 'DateTime must be greater than 15 days from today',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                })
                            } else {
                                axios.post(`${host}leave_requests/`, {
                                    datetime_start: this.datetime_start,
                                    datetime_end: this.datetime_end,
                                    description: this.description,
                                    who_signed: this.user.first_name + ' ' + this.user.last_name,
                                    status: 1,
                                    tel: this.tel,
                                    user: this.user.id
                                })
                                .then((res) => {
                                    swal.fire({
                                        title: 'Success',
                                        text: 'Leave Request Sent',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    }).then(() => {
                                        if (confirm) {
                                            this.$router.go()
                                        }
                                    })
                                })
                            }
                        } else {
                            swal.fire('Cancelled', 'Your leave request is cancelled', 'error')
                        }
                    })
                
                    } catch (error) {
                        console.error(error);
                    }
            },
            logout(){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                swal.fire({
                    title: 'Success',
                    text: 'Logout Success',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                this.$router.push('/')
            },
        }
    }
</script>