<script setup>
import IconSearchBar from '../components/icons/IconSearchbar.vue'
</script>
<template>
    <div>
        <div id="background" class="w-full h-fit bg-white">
            <div class="navbar bg-gray-800">
                <div class="flex-1 px-2 lg:flex-none">
                    <a class="text-lg font-bold text-white">Manage attendance</a>
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
            <div id="box" class="bg-white w-[100%] h-fit flex justify-center flex-col items-center" >
                <div id="config-salary" class="flex justify-center flex-col items-center">
                    <div class="w-[100%] text-center text-black text-[20px] font-bold py-4 flex justify-center">
                        <div id="datetime-server">
                            Time Attendance On {{ formatDate(server_date)  }} at {{ format_time(server_time) }}
                        </div>
                    </div>
                        <div class="text-black font-bold text-[20px] w-[100%] text-center py-10">Config Wages</div>
                        <div class="text-black">
                            daily wage WOF : {{ configsalary.WOF }} | daily wage WFH : {{ configsalary.WFH }}
                        </div><br>
                        <button class="btn bg-warning w-[100px] text-black" onclick="my_modal_1.showModal()"> Edit </button>
                        <dialog id="my_modal_1" class="modal">
                          <div class="modal-box">
                            <h3 class="font-bold text-lg">Edit<br></h3>
                            <div class="flex justify-center flex-col">
                                <label class="form-control w-full">
                                  <div class="label">
                                    <span class="label-text">daily wage of Work Office (Now is {{ configsalary.WOF }})</span>
                                  </div>
                                  <input type="text" placeholder="Change to..." class="input input-bordered w-full max-w-xs" v-model="wof" />
                                </label>
                                <label class="form-control w-full mt-4">
                                  <div class="label">
                                    <span class="label-text">daily wage of Work Form Home (Now is {{ configsalary.WFH }})</span>
                                  </div>
                                  <input type="text" placeholder="Change to..." class="input input-bordered w-full max-w-xs" v-model="wfh" />
                                </label>
                            </div>
                            <div class="modal-action">
                              <form method="dialog">
                                <button class="btn btn-success" @click="updateconfigsalary">Confirm</button>
                                <button class="btn btn-error ml-4">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                    </div>
                <div id="title2">
                    <div class="text-black font-bold text-[20px] w-[100%] text-center py-10">Attendance List</div>
                </div>
                    <label class="input input-bordered w-[30%] flex items-center gap-2">
                        <input v-model="search" type="text" class="grow" placeholder="Search by name." />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
                    </label>
                    <div id="search-by-time" class="w-full flex justify-center ">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text text-black">Date Start</span>
                            </div>
                            <input id="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="datestart"/>
                        </label>
                        <label class="form-control w-full max-w-xs ml-[15px]">
                            <div class="label">
                                <span class="label-text text-black">Date End</span>
                            </div>
                            <input id="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="dateend" />
                        </label>
                    </div>
                    <div class="w-full flex justify-center flex-wrap mb-10">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                              <span class="label-text text-black">filter by type sign</span>
                            </div>
                          <select class="select select-bordered " v-model="selectedStatus" @change="filterByStatus">
                            <option value="">All</option>
                            <option value="normal">Normal</option>
                            <option value="backdate">Backdate</option>
                          </select>
                        </label>
                    </div>
                    <div class="w-full flex justify-center flex-wrap">
                        <input type="button" @click="downloadTimesheetInExcel" value="download list of attendance" class="btn w-[250px] h-[50px] bg-[#3668A7] text-white rounded-[10px] my-[32px] cursor-pointer">
                        <button type="button" @click="clearForm" class="btn bg-warning w-[150px] h-[50px]  text-black rounded-[10px] mx-4 my-[32px] cursor-pointer">Clear Input</button>
                    </div>
                </div>
                <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center py-[72px]">
                    <table class="table py-[100px] w-[80%] text-center">
                        <thead class="text-black bg-emerald-400 rounded-t-lg text-[15px]">
                            <tr class="rounded-t-lg">
                                <th class="w-[10%]">Date Sign</th>
                                <th class="w-[10%]">Time In</th>
                                <th class="w-[10%]">Time Out</th>
                                <th class="w-[20%]">Description</th>
                                <th class="w-[15%]">Site Name</th>
                                <th class="w-[15%]">Signed by</th>
                                <th class="w-[10%]">Type Sign</th>
                                <th class="w-[10%]">Status</th>
                            </tr>
                        </thead>
                        <tbody class="text-black text-center " v-if="displayedAttendance.length > 0">
                                <tr v-for="liftts in displayedAttendance" :key="liftts.id" class="border-b-black">
                                        <td class="border-b-blue-900">{{ formatDate(liftts.date) }}</td>
                                        <td v-if="liftts.time_in == '00:00:00'" class="border-b-blue-900"></td>
                                        <td v-else class="border-b-blue-900">{{ format_date(liftts.time_in) }}</td>
                                        <td v-if="liftts.time_out == '00:00:00'" class="border-b-blue-900"></td>
                                        <td v-else class="border-b-blue-900">{{ format_date(liftts.time_out) }}</td>
                                        <td class="border-b-blue-900">{{ liftts.description }}</td>
                                        <td class="border-b-blue-900">{{ liftts.site_name }}</td>
                                        <td class="border-b-blue-900">{{ liftts.who_signed }}</td>
                                        <td class="border-b-blue-900">
                                            <span v-if="liftts.type_sign == 'normal'" class="text-green-500 font-bold">Normal</span>
                                            <span v-else-if="liftts.type_sign == 'backdate'" class="text-red-500 font-bold">Backdate</span>
                                        </td>
                                        <td v-if="liftts.status == 0" class="border-b-blue-900 text-red-600 font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-error text-black w-[125px]">Rejected<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(liftts.id,2)"><a>Approve</a></li>
                                                  <li class="text-warning" @click="patchstatus(liftts.id,1)"><a>Pend</a></li>
                                                  <li class="text-error" @click="patchstatus(liftts.id,0)"><a>Reject</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_signwork(liftts.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                        <td v-if="liftts.status == 1" class="border-b-blue-900 text-warning font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-warning text-black w-[125px]">Pending<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(liftts.id,2)"><a>Approve</a></li>
                                                  <li class="text-warning" @click="patchstatus(liftts.id,1)"><a>Pend</a></li>
                                                  <li class="text-error" @click="patchstatus(liftts.id,0)"><a>Reject</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_signwork(liftts.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                        <td v-if="liftts.status == 2" class="border-b-blue-900 text-green-600 font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-success text-black w-[125px]">Approved<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(liftts.id,2)"><a>Approve</a></li>
                                                  <li class="text-warning" @click="patchstatus(liftts.id,1)"><a>Pend</a></li>
                                                  <li class="text-error" @click="patchstatus(liftts.id,0)"><a>Reject</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_signwork(liftts.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                </tr>
                        </tbody>
                        <tbody class="text-black text-center font-bold" v-else>
                            <tr>
                                <td colspan="8">No data available.</td>
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
</template>

<script>
    import axios from 'axios'
    const host = 'https://backendvanmangit-production.up.railway.app/';
    import * as XLSX from 'xlsx'
    import swal from 'sweetalert2'
    import moment from 'moment'

    export default {
        name: 'AdminPage',
        data(){
            return{
                user: '',
                listts: [],
                search: '',
                datestart: '',
                dateend:'',
                configsalary:'',
                wfh: '',
                wof: '',
                currentPage: 1,
                itemsPerPage: 10,
                server_datetime: '',
                server_date: '',
                server_time: '',
                selectedStatus: ''
            }
        },
        computed:{
            filteredList() {
            return this.listts.filter(listts => {
                return listts.who_signed.toLowerCase().includes(this.search.toLowerCase())
            })
            },

            filterdatestarttodateend(){
                return this.listts.filter(listts => {
                    return listts.date >= this.datestart && listts.date <= this.dateend
                })
            },

            mergedFilteredList() {
                  return this.listts.filter(listts => {
                    return (
                      listts.who_signed.toLowerCase().includes(this.search.toLowerCase()) &&
                      (!this.datestart || !this.dateend || (listts.date >= this.datestart && listts.date <= this.dateend)) &&
                      (!this.selectedStatus || listts.type_sign === this.selectedStatus)
                    );
                  });
            },
            totalPages() {
              return Math.ceil(this.mergedFilteredList.length / this.itemsPerPage);
            },
            displayedAttendance() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = this.currentPage * this.itemsPerPage;
                const sortedList = this.mergedFilteredList.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                return sortedList.slice(startIndex, endIndex);
            }
        

        },
        mounted(){
            this.getUser()
            this.getlistTimesheet()
            this.getConfigSalary()
            this.get_datetimefromserver()
            setInterval(() => {
                this.get_datetimefromserver();
            }, 1000)

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
            filterByStatus() {
              this.currentPage = 1; // Reset pagination to first page
            },
            clearForm(){
                this.search = ''
                this.datestart = ''
                this.dateend = ''
            },
            getUser(){
                const userjson = localStorage.getItem('user')
                const user_data = JSON.parse(userjson)
                this.user = user_data
            },
            getlistTimesheet(){
                axios.get(host + 'timesheets/')
                .then(res => {
                    this.listts = res.data
                })
            },
            getConfigSalary(){
                axios.get(host + 'config_salary')
                .then(res => {
                    this.configsalary = res.data[0]
                })
            },
            updateconfigsalary(){
                axios.put(host + 'config_salary/' + this.configsalary.id + '/',{
                    WOF: this.wof,
                    WFH: this.wfh
                }).then(res => {
                    console.log(res)
                    this.$router.go()
                })
            },
            downloadTimesheetInExcel() {
                let totalWages = 0;
                const dataForExcel = this.mergedFilteredList.map((attendance) => {
                    let status = '';
                    if (attendance.site_name === "Work From Home") {
                        if (attendance.status === 0) {
                            status = 'Rejected';
                            totalWages += 0;
                        } else if (attendance.status === 1) {
                            status = 'Pending';
                            totalWages += 0;
                        } else if (attendance.status === 2) {
                            status = 'Approved';
                            totalWages += this.configsalary.WFH;
                        }
                    } else if (attendance.site_name === "Work at Office") {
                        if (attendance.status === 0) {
                            status = 'Rejected';
                            totalWages += 0;
                        } else if (attendance.status === 1) {
                            status = 'Pending';
                            totalWages += 0;
                        } else if (attendance.status === 2) {
                            status = 'Approved';
                            totalWages += this.configsalary.WOF;
                        }
                    }
                    return { ...attendance, status };
                });

                const totalObject = { Total_Wages: totalWages };
                dataForExcel.push(totalObject);

                const ws = XLSX.utils.json_to_sheet(dataForExcel);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                XLSX.writeFile(wb, `list_of_attendance.xlsx`);
            },
            formatDateTime(datetime){
                return moment(datetime).format('D MMM YYYY | hh:mm A')
            },
            formatDate(date){
                return moment(date).format('D MMM YYYY')
            },
            format_date(value) {
                if (value) {
                    const today = new Date();
                    const fullDateTime = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${value}`;
                    return moment(fullDateTime, 'YYYY-MM-DD HH:mm:ss').format('hh:mm A');
                }
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
            patchstatus(id,status){
                axios.patch(host + 'timesheets/' + id + '/',{
                    status: status
                }).then((res) => {
                    swal.fire({
                        title: 'Success',
                        text: 'Status Updated',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        if (confirm) {
                            this.$router.go()
                        }
                    })
                })
            },
            delete_signwork(id){
                swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this data!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, keep it'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(host + 'timesheets/' + id + '/')
                        .then(res => {
                            swal.fire({
                                title: 'Success',
                                text: 'Data has been deleted',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                if (confirm) {
                                    this.$router.go()
                                }
                            })
                        })
                    } else if (result.dismiss === swal.DismissReason.cancel) {
                        swal.fire({
                            title: 'Cancelled',
                            text: 'Your data is safe :)',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }
                })
            }
            
        }
    }
</script>
