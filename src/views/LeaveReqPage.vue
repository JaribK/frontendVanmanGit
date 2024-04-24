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
                            <div class="btn btn-primary mr-2">{{ user.role }}</div>
                            <div tabindex="0" role="button" class="btn btn-ghost text-black bg-white rounded-btn">Welcome, {{ user.username }}</div>
                                <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-54 mt-4">
                                    <li><router-link to="/home">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                                        </svg>
                                        Back to Home
                                    </router-link></li>
                                    <li><router-link to="/leave-req">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
                                          <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                        </svg>
                                        Leave Request
                                    </router-link></li>
                                    <li v-if="user.is_superuser == true"><router-link to="/home/admin">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
                                          <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                                        </svg>
                                        Manage Attendance
                                    </router-link></li>
                                    <li v-if="user.is_superuser == true"><router-link to="/approve-lr">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-kanban" viewBox="0 0 16 16">
                                          <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                          <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z"/>
                                        </svg>
                                        Manage Leave Request
                                    </router-link></li>
                                    <li class="bg-warning text-black rounded"><router-link to="/help">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                        </svg>
                                        Need Help?
                                    </router-link></li>
                                    <li class="bg-error text-black rounded" @click="logout">
                                        <a>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                            </svg>
                                            logout
                                        </a>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content" class="w-full h-lvh flex justify-center">
            <div id="box" class="bg-white w-[100%] h-fit flex justify-start flex-col" >
                <div class="w-[100%] text-center text-black text-[20px] font-bold py-4 flex justify-center">
                        <div id="datetime-server">
                            Time Attendance On {{ formatDate(this.server_date)  }} at {{ format_time(this.server_time) }}
                        </div>
                    </div>
                <div id="title" class="text-black font-bold w-full text-center my-[64px] text-[30px]">Leave Request <br> 
                    <span class="text-[20px] font-normal text-error">Resignation notice must be given at least 15 days in advance</span>
                </div>
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
                                <span class="label-text text-black">Description (Reason for leave request)</span>
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
                                <button type="button" @click="clearForm" class="btn bg-warning w-[200px] h-[50px] text-black rounded-[10px] mx-4 my-[64px] cursor-pointer">Clear Input</button>
                        </div>
                    </form>
                </div>
                <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center mb-10">
                        <table class="table py-[100px] w-[80%] text-center">
                            <thead class="text-black bg-emerald-400 rounded-t-lg">
                                <tr class="rounded-t-lg text-[15px]">
                                    <th class="w-[5%]">No.</th>
                                    <th class="w-[35%]">Leave DateTime that request</th>
                                    <th class="w-[30%]">Description</th>
                                    <th class="w-[20%]">Status</th>
                                    <th class="w-[10%]">Manage</th>
                                </tr>
                            </thead>
                            <tbody class="text-black text-center" v-if="displayedAttendance.length > 0">
                                    <tr v-for="lr,index in displayedAttendance" :key="lr.id" class="border-b-black">
                                        <td class="border-b-blue-900">{{ index + 1 }}</td>
                                        <td class="border-b-blue-900">{{ formatDateTime(lr.datetime_start) }} - {{ formatDateTime(lr.datetime_end) }}</td>
                                        <td class="border-b-blue-900">{{ lr.description }}</td>
                                        <td v-if="lr.status == 0" class="border-b-blue-900 text-red-600 font-bold">Rejected</td>
                                        <td v-if="lr.status == 1" class="border-b-blue-900 text-warning font-bold">Pending</td>
                                        <td v-if="lr.status == 2" class="border-b-blue-900 text-success font-bold">Approved</td>
                                        <td v-if="lr.status == 0">
                                            <button type="button" class="btn btn-outline bg-error" @click="delete_leaverequest(lr.id)">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                        <td v-if="lr.status == 1">
                                            <button type="button" onclick="my_modal_1.showModal()" class="btn btn-warning">Manage</button>                     
                                            <dialog id="my_modal_1" class="modal">
                                              <div class="modal-box">
                                                <h3 class="font-bold text-lg">Manage this data</h3>
                                                <div class="w-full flex flex-col items-center">
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Leave DateTime Start</span>
                                                        </div>
                                                        <input id="datetimein" type="datetime-local" value="" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="datetime_start" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Leave DateTime End</span>
                                                        </div>
                                                        <input id="datetimeout" type="datetime-local" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="datetime_end" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Description</span>
                                                        </div>
                                                        <input id="description" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="description" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Tel</span>
                                                        </div>
                                                        <input id="tel" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="tel" required/>
                                                    </label>
                                                </div>
                                                <div class="modal-action">
                                                  <form method="dialog" class="flex justify-evenly flex-row w-full">
                                                      <button class="btn btn-error" @click="delete_leaverequest(lr.id)">Delete Request</button>
                                                      <button class="btn btn-success" @click="patch_leaverequest(lr.id)">Update Request</button>
                                                      <button class="btn btn-info">Close</button>
                                                  </form>
                                                </div>
                                              </div>
                                            </dialog>
                                        </td>
                                        <td v-if="lr.status == 2">
                                            <button type="button" class="btn btn-warning cursor-not-allowed" @click="delete_leaverequest(lr.id)" disabled >Manage</button>
                                        </td>
                                    </tr>
                            </tbody>
                            <tbody class="text-black text-center" v-else>
                                <tr>
                                    <td colspan="5" class="border-b-blue-900 font-bold">No data available.</td>
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
    const host = 'https://backendvanmangit-production.up.railway.app/'
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
                server_datetime: '',
                server_date: '',
                server_time: ''
            }
        },
        mounted(){
            this.getUser()
            this.getlist_leaverequest()
            this.gettoday()
            this.get_datetimefromserver()
            setInterval(() => {
                this.get_datetimefromserver();
            }, 1000)
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
                const sortedAttendance = this.showmy_leaverequest.sort((a, b) => {
                    return new Date(a.datetime_start) - new Date(b.datetime_start);
                });
                return sortedAttendance.slice(startIndex, endIndex);
            }
        },
        methods: {
            formatDate(datetime){
                return moment(datetime).format('D MMM YYYY')
            },

            format_datetime(datetime){
                return moment(datetime).format('D MMM YYYY hh:mm:ss A')
            },

            format_time(time){
                return moment(time, 'HH:mm:ss').format('hh:mm:ss A')
            },
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
            patch_leaverequest(id){
                if (this.datetime_start == '' || this.datetime_end == '' || this.description == '' || this.tel == '') {
                    swal.fire({
                        title: 'Error',
                        text: 'All field must be filled',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                } else {
                    swal.fire({
                        title: 'Are you sure?',
                        text: 'You will update this leave request',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const today = moment(this.server_date)
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
                                    axios.patch(`${host}leave_requests/${id}/`, {
                                        datetime_start: this.datetime_start,
                                        datetime_end: this.datetime_end,
                                        description: this.description,
                                        tel: this.tel,
                                    })
                                    .then((res) => {
                                        swal.fire({
                                            title: 'Success',
                                            text: 'Leave Request Updated',
                                            icon: 'success',
                                            confirmButtonText: 'OK'
                                        }).then(() => {
                                            if (confirm) {
                                                this.$router.go()
                                            }
                                        })
                                    })
                            }
                        }
                    })
                }
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
                            const today = moment(this.server_date)
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
                        }
                    })
                
                    } catch (error) {
                        console.error(error);
                    }
            },
            delete_leaverequest(id){
                swal.fire({
                    title: 'Are you sure?',
                    text: 'You will delete this leave request',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${host}leave_requests/${id}`)
                        .then((res) => {
                            swal.fire({
                                title: 'Success',
                                text: 'Leave Request Deleted',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                if (confirm) {
                                    this.$router.go()
                                }
                            })
                        })
                    }
                })
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
                    swal.fire({
                        title: 'Success',
                        text: 'Logout Success',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.$router.push('/login');
                }).catch((err) => {
                    console.log(err)
                })
            },
            get_datetimefromserver(){
                axios.get('https://worldtimeapi.org/api/ip')
                // https://worldtimeapi.org/api/ip
                .then(res => {
                    this.server_datetime = res.data.datetime
                    const datetime = new Date(this.server_datetime);
            
                    // Get date in "YYYY-MM-DD" format
                    this.server_date = datetime.toISOString().split('T')[0];

                    // Get time in "HH:MM:SS" format
                    this.server_time = datetime.toTimeString().split(' ')[0];

                })
            },
        }
    }
</script>
