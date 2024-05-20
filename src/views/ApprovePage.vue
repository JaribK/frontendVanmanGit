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
                <div id="title" class="text-black font-bold w-full text-center my-[48px] text-[30px]">List Request From Employee</div>
                <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center py-[32px]">
                    <label class="input input-bordered w-[30%] flex items-center gap-2">
                        <input v-model="search" type="text" class="grow" placeholder="Search by name." />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
                    </label>
                    <br>
                    <div id="search-by-time" class="w-full flex justify-center ">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text text-black">Date Start</span>
                            </div>
                            <input id="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs mb-10" v-model="datestart"/>
                        </label>
                        <label class="form-control w-full max-w-xs ml-[15px]">
                            <div class="label">
                                <span class="label-text text-black">Date End</span>
                            </div>
                            <input id="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs mb-10" v-model="dateend" />
                        </label>
                    </div>
                    <div class="w-full flex justify-center flex-wrap">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                              <span class="label-text text-black">filter by status</span>
                            </div>
                          <select class="select select-bordered " v-model="selectedStatus">
                            <option value="">All</option>
                            <option value="0">Rejected</option>
                            <option value="1">Pending</option>
                            <option value="2">Approved</option>
                          </select>
                        </label>
                        <label class="form-control w-full max-w-xs ml-4">
                            <div class="label">
                              <span class="label-text text-black">filter by types</span>
                            </div>
                          <select class="select select-bordered " v-model="selectedTypeofLeave">
                                <option value="">All</option>
                                <option value="sick leave">Sick Leave</option>
                                <option value="personal leave">Personal Leave</option>
                                <option value="annual leave">Annual Leave</option>
                                <option value="other" >Other</option>
                          </select>
                        </label>
                    </div>
                    <div class="flex flex-wrap justify-evenly">
                        <button type="button" @click="clearForm" class="btn bg-warning w-[150px] border-none text-black rounded-[10px] mx-4 my-[32px] cursor-pointer">Clear Input</button>
                    </div>
                        <table class="table py-[100px] w-[80%] text-center">
                            <thead class="text-black bg-emerald-400 drop-shadow-md">
                                <tr class="rounded-t-lg text-[15px]">
                                    <th class="w-[10%]">DateTime Requested</th>
                                    <th class="w-[10%]">Leave DateTime that request</th>
                                    <th class="w-[20%]">Description</th>
                                    <th class="w-[10%]">Tel</th>
                                    <th class="w-[20%]">Send Request by</th>
                                    <th class="w-[10%]">Type of Leave</th>
                                    <th class="w-[20%]">Status</th>
                                </tr>
                            </thead>
                            <tbody class="text-black text-center" v-if="displayedAttendance.length > 0">
                                    <tr v-for="lr,index in displayedAttendance" :key="lr.id" class="border-b-black">
                                        <td class="border-b-blue-900">{{ formatDateTime(lr.datetime_requested) }}</td>
                                        <td class="border-b-blue-900">{{ formatDateTime(lr.datetime_start) }}<br>-<br>{{ formatDateTime(lr.datetime_end) }}</td>
                                        <td class="border-b-blue-900">{{ lr.description }}</td>
                                        <td class="border-b-blue-900">{{ lr.tel }}</td>
                                        <td class="border-b-blue-900">{{ lr.who_signed }}</td>
                                        <td class="border-b-blue-900">{{ lr.type_of_leave }}</td>
                                        <td v-if="lr.status == 0" class="border-b-blue-900 text-red-600 font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-error text-black w-[125px] border-none">Rejected<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(lr.id,2)"><a>Approve</a></li>
                                                  <li class="text-warning" @click="patchstatus(lr.id,1)"><a>Pend</a></li>
                                                  <li class="text-error" @click="patchstatus(lr.id,0)"><a>Reject</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_leaverequest(lr.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                        <td v-if="lr.status == 1" class="border-b-blue-900 text-warning font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-warning text-black w-[125px] border-none">Pending<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(lr.id,2)"><a>Approve</a></li>
                                                  <li class="text-warning" @click="patchstatus(lr.id,1)"><a>Pend</a></li>
                                                  <li class="text-error" @click="patchstatus(lr.id,0)"><a>Reject</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_leaverequest(lr.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                        <td v-if="lr.status == 2" class="border-b-blue-900 text-green-600 font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-success text-black w-[125px] border-none">Approved<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(lr.id,2)"><a>Approve</a></li>
                                                  <li class="text-warning" @click="patchstatus(lr.id,1)"><a>Pend</a></li>
                                                  <li class="text-error" @click="patchstatus(lr.id,0)"><a>Reject</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_leaverequest(lr.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                            </tbody>
                            <tbody class="text-black text-center" v-else>
                                <tr>
                                    <td colspan="6" class="border-b-blue-900 font-bold">No data available.</td>
                                </tr>
                            </tbody>
                        </table>
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
    </div>
</template>

<script>
    import axios from 'axios'
    import swal from 'sweetalert2'
    let host = ''
    import moment from 'moment'
    import * as XLSX from 'xlsx'
    export default {
        name: 'ApprovePage',
        data(){
            return{
                list_leaverequest: [],
                datestart: '',
                dateend: '',
                search: '',
                currentPage: 1,
                itemsPerPage: 10,
                selectedStatus: '',
                selectedTypeofLeave: '',
                server_datetime: '',
                server_date: '',
                server_time: ''
            }
        },
        created() {
          host = this.$store.state.host
        },
        mounted(){
            this.getlist_leaverequest()
            this.updateDateTime()
            setInterval(() => {
                this.updateDateTime()
                this.getlist_leaverequest()
            }, 1000)
        },
        computed: {
            mergedFilteredList() {
                  return this.list_leaverequest.filter(list => {
                    return (
                      list.who_signed.toLowerCase().includes(this.search.toLowerCase()) &&
                      (!this.datestart || !this.dateend || (list.datetime_requested >= this.datestart && list.datetime_requested <= this.dateend)) &&
                      (!this.selectedStatus || list.status == this.selectedStatus) &&
                      (!this.selectedTypeofLeave || list.type_of_leave == this.selectedTypeofLeave)
                    );
                  });
            },
            totalPages() {
              return Math.ceil(this.mergedFilteredList.length / this.itemsPerPage);
            },
            displayedAttendance() {
              const startIndex = (this.currentPage - 1) * this.itemsPerPage;
              const endIndex = this.currentPage * this.itemsPerPage;
              return this.mergedFilteredList.slice(startIndex, endIndex);
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
            filterByStatus() {
              this.currentPage = 1; // Reset pagination to first page
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
            getlist_leaverequest(){
                axios.get(`${host}leave_requests`)
                .then((res) => {
                    this.list_leaverequest = res.data
                })
            },
            formatDateTime(datetime){
                return moment(datetime).format('D MMM YYYY | hh:mm A')
            },
            patchstatus(id,status){
                axios.patch(`${host}leave_requests/${id}/`,{
                    status: status
                })
                .then((res) => {
                    swal.fire({
                        title: 'Success',
                        text: 'Status Updated',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                })
            },
            delete_leaverequest(id){
                swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this data!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete this data!',
                    cancelButtonText: 'No, keep it'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${host}leave_requests/${id}/`)
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
            clearForm(){
                this.datestart = ''
                this.dateend = ''
                this.search = ''
                this.selectedStatus = ''
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
