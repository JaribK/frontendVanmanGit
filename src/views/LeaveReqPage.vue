<script setup>
    import Navbar from "@/components/templates/Navbar.vue";
</script>
<template>
    <div>
        <div id="background" class="w-full h-fit bg-white">
            <Navbar></Navbar>
            <div id="content" class="w-full h-lvh flex justify-center animate-fade-up animate-once">
            <div id="box" class="bg-white w-[100%] h-fit flex justify-start flex-col" >
                <div class="w-[100%] text-center text-black text-[20px] font-bold py-4 flex justify-center">
                        <div id="datetime-server">
                            Time Attendance On {{ formatDate(server_date)  }} at {{ format_time(server_time) }}
                        </div>
                    </div>
                <div id="title" class="text-black font-bold w-full text-center my-[64px] text-[30px]">Leave Request <br> 
                    <span class="text-[20px] font-normal">Resignation notice must be given at least 15 days in advance</span>
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
                                <span class="label-text text-black">Type of leave</span>
                            </div>
                            <select class="select select-bordered" v-model="type_of_leave" required>
                                <option disabled selected>Please Pick one</option>
                                <option value="sick leave">Sick Leave</option>
                                <option value="personal leave">Personal Leave</option>
                                <option value="annual leave">Annual Leave</option>
                                <option value="other" >Other</option>
                            </select>
                        </label>
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text text-black">Description (Reason for leave request)</span>
                            </div>
                            <input maxlength="255" id="description" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-10" v-model="description" required/>
                        </label>
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text text-black">Tel</span>
                            </div>
                            <input maxlength="10" id="tel" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-10" v-model="tel" required/>
                        </label>
                        <div class="w-full flex justify-center flex-wrap">
                                <input type="submit"  value="Send Request" class="btn w-[300px] h-[50px] bg-[#3668A7] text-white rounded-[10px] my-[64px] cursor-pointer">
                                <button type="button" @click="clearForm" class="btn bg-warning w-[200px] h-[50px] text-black rounded-[10px] mx-4 my-[64px] cursor-pointer">Clear Input</button>
                        </div>
                    </form>
                </div>
                <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center mb-10">
                        <table class="table py-[100px] w-[80%] text-center">
                            <thead class="text-black bg-emerald-400 drop-shadow-md">
                                <tr class="rounded-t-lg text-[15px]">
                                    <th class="w-[5%]">No.</th>
                                    <th class="w-[30%]">Leave DateTime that request</th>
                                    <th class="w-[15%]">Type of Leave</th>
                                    <th class="w-[35%]">Description</th>
                                    <th class="w-[15%]">Status</th>
                                    <th class="w-[10%]">Manage</th>
                                </tr>
                            </thead>
                            <tbody class="text-black text-center" v-if="displayedAttendance.length > 0">
                                    <tr v-for="lr,index in displayedAttendance" :key="lr.id" class="border-b-black">
                                        <td class="border-b-blue-900">{{ index + 1 }}</td>
                                        <td class="border-b-blue-900">{{ formatDateTime(lr.datetime_start) }} - {{ formatDateTime(lr.datetime_end) }}</td>
                                        <td class="border-b-blue-900">{{ lr.type_of_leave  }}</td>
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
                                            <button type="button" @click="openModal(lr.id)" class="btn btn-warning">Manage</button>                     
                                            <dialog id="my_modal_1" class="modal">
                                              <div class="modal-box">
                                                <h3 class="font-bold text-lg">Manage this data</h3>
                                                <div class="w-full flex flex-col items-center">
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Leave DateTime Start</span>
                                                        </div>
                                                        <input id="datetimein" type="datetime-local" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="datetime_start" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Leave DateTime End</span>
                                                        </div>
                                                        <input id="datetimeout" type="datetime-local" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="datetime_end" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Type of leave</span>
                                                        </div>
                                                        <select class="select select-bordered" v-model="type_of_leave" required>
                                                            <option disabled selected>Please Pick one</option>
                                                            <option value="sick leave">Sick Leave</option>
                                                            <option value="personal leave">Personal Leave</option>
                                                            <option value="annual leave">Annual Leave</option>
                                                            <option value="other" >Other</option>
                                                        </select>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Description</span>
                                                        </div>
                                                        <input maxlength="255" id="description" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="description" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Tel</span>
                                                        </div>
                                                        <input maxlength="10" id="tel" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="tel" required/>
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
                                    <td colspan="6" class="border-b-blue-900 font-bold">No data available.</td>
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
    let host = ''
    import moment from 'moment'
    export default {
        name: 'LeaveReqPage',
        data(){
            return{
                user: '',
                user_id: '',
                datetime_start: '',
                datetime_end: '',
                type_of_leave: '',
                description:'',
                tel:'',
                list_leaverequest: [],
                today: '',
                diff_day: '',
                currentPage: 1,
                itemsPerPage: 10,
                server_datetime: '',
                server_date: '',
                server_time: '',
                userList: [],
            }
        },
        created() {
          host = this.$store.state.host
        },
        mounted(){
            this.getUser()
            this.getlist_leaverequest()
            this.gettoday()
            this.updateDateTime()
            setInterval(() => {
                this.updateDateTime()
                this.getlist_leaverequest()
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
              return this.showmy_leaverequest.slice(startIndex, endIndex);
            }
        },
        methods: {
            getUsers(){
                axios.get(`${host}users/`)
                .then((res) => {
                    this.userList = res.data
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
            prevPage() {
              if (this.currentPage > 1) {
                this.currentPage--;
              }
            },
            openModal(id) {
                const modalId = 'my_modal_1';
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.showModal();
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
            getUser() {
                const userjson = localStorage.getItem('user')
                const user_data = JSON.parse(userjson)
                this.user = user_data
                this.user_id = user_data.id
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
                  this.type_of_leave = '';
            },
            formatDateTime(datetime){
                return moment(datetime).format('D MMM YYYY | hh:mm A')
            },
            patch_leaverequest(id){
                if (this.datetime_start == '' || this.datetime_end == '' || this.description == '' || this.tel == '' || this.type_of_leave == '') {
                    swal.fire({
                        title: 'Error',
                        text: 'All field must be filled',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                } else {
                if (this.datetime_start < this.datetime_end){
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
                                    axios.put(`${host}leave_requests/${id}/`, {
                                        datetime_start: this.datetime_start,
                                        datetime_end: this.datetime_end,
                                        description: this.description,
                                        tel: this.tel,
                                        type_of_leave: this.type_of_leave,
                                        who_signed: this.user.first_name + ' ' + this.user.last_name,
                                        status: 1,
                                        user: this.user.id
                                    })
                                    .then((res) => {
                                        swal.fire({
                                            title: 'Success',
                                            text: 'Leave Request Updated',
                                            icon: 'success',
                                            confirmButtonText: 'OK'
                                        })
                                    })
                            }
                        }
                    })
                } else {
                    swal.fire({
                        title: 'Error',
                        text: 'DateTime Start must be less than DateTime End',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }
            },
            post_leaverequest(){
                try {
                    if (this.datetime_start < this.datetime_end){
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
                                        type_of_leave: this.type_of_leave,
                                        user: this.user.id
                                    })
                                    .then((res) => {
                                        swal.fire({
                                            title: 'Success',
                                            text: 'Leave Request Sent',
                                            icon: 'success',
                                            confirmButtonText: 'OK'
                                        })
                                    })
                                }
                            }
                        })
                    } else {
                        swal.fire({
                            title: 'Error',
                            text: 'DateTime Start must be less than DateTime End',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }
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
                            })
                        })
                    }
                })
            },

            updateDateTime() {
              const now = new Date();
              const date = this.formatDate(now);
              const time = this.format_time(now);

              this.server_datetime = `${date} ${time}`;

              this.server_date = now.toISOString().split('T')[0];

              this.server_time = now.toTimeString().split(' ')[0];
            },
        }
    }
</script>
