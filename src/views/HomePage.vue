<template>
    <div>
        <div id="background" class="w-full h-fit bg-white">
            <div class="navbar bg-gray-800">
                <div class="flex-1 px-2 lg:flex-none">
                    <a class="text-lg font-bold text-white">Home</a>
                </div> 
                <div class="flex justify-end flex-1 px-2">
                    <div class="flex items-stretch">
                        <div class="dropdown dropdown-end">
                            <div class="btn btn-primary mr-2">{{ user.role }}</div>
                            <div tabindex="0" role="button" class="btn btn-ghost text-black bg-white rounded-btn">Welcome, {{ user.username }}</div>
                                <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-54 mt-4">
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
            <div id="content" class="w-full h-fit flex justify-center">
                <div id="box" class="bg-white w-[80%] h-fit flex justify-center flex-col">
                    <div class="w-[100%] text-center text-black text-[20px] font-bold py-4 flex justify-center">
                        <div id="datetime-server">
                            Time Attendance On {{ formatDate(this.server_date)  }} at {{ format_time(this.server_time) }}
                        </div>
                    </div>
                    <div id="titlebox" class="py-[32px] text-black font-bold text-[30px] w-[100%] text-center">Sign for work <br>{{user.first_name}} {{user.last_name}}</div>
                    <div id="form" class="w-full mt-10">
                        <form action="" class="px-[40px] flex justify-evenly flex-wrap">
                            <!-- <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span class="label-text text-black">Time In</span>
                                </div>
                                <input id="timein" type="time" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-10" v-model="timein" required/>
                            </label> -->
                            <!-- <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span class="label-text text-black">Time Out</span>
                                </div>
                                <input id="timeout" type="time" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="timeout" required/>
                            </label> -->
                            <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span class="label-text text-black">Date</span>
                                    <span class="label-text-alt text-red-600" v-if="isHoliday == true">This date is a holiday.</span>
                                </div>
                                <input id="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs mb-10" v-model="date" required/>
                            </label>
                            <label class="form-control w-full max-w-xs">
                              <div class="label">
                                <span class="label-text text-black">Site Name</span>
                              </div>
                              <select class="select select-bordered" v-model="site_name" required>
                                <option disabled selected>Please Pick one</option>
                                <option>Work From Home</option>
                                <option>Work at Office</option>
                              </select>
                            </label>
                            <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span class="label-text text-black">YourName</span>
                                </div>
                                <input id="timein" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs mb-10" :value="user.first_name + ' ' + user.last_name" disabled />
                            </label>
                            <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span class="label-text text-black">Description (What will you do today?)</span>
                                </div>
                                <textarea id="text" type="text" placeholder="Type here" class="textarea textarea-bordered w-full max-w-xs" cols="15" v-model="text" required></textarea>
                            </label>
                            <div class="w-full flex justify-center flex-wrap mt-10">
                                <input type="button" :disabled="checkSigninToday()" @click="checkdatematchholidays" value="Sign" class="btn w-[300px] h-[50px] bg-[#3668A7] text-white rounded-[10px] cursor-pointer">
                                <button type="button" @click="clearForm" class="btn bg-warning w-[150px] h-[50px]  text-black rounded-[10px] mx-4 cursor-pointer">Clear Input</button>
                                <button type="button" @click="downloadTimesheetInExcel" class="btn w-[300px] h-[50px] bg-gray-400 text-black rounded-[10px] mb-4 cursor-pointer">Download my Attendance</button>
                            </div>
                            <div class="w-full flex justify-center flex-wrap mb-10">
                                <button type="button" onclick="my_modal_1.showModal()" class="btn bg-error w-[300px] text-white">Backdate Sign</button>                     
                                            <dialog id="my_modal_1" class="modal">
                                              <div class="modal-box">
                                                <h3 class="font-bold text-base text-center">Backdate Sign <br> (If you don't have time to sign the normal form)</h3>
                                                <div class="w-full flex flex-col items-center">
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Date</span>
                                                        </div>
                                                        <input id="datetime" type="date" value="" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="date" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Time In</span>
                                                        </div>
                                                        <input id="datetimein" type="time" value="" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="timein" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Time Out</span>
                                                        </div>
                                                        <input id="datetimeout" type="time" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="timeout" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Site Name</span>
                                                        </div>
                                                        <select class="select select-bordered" v-model="site_name" required>
                                                            <option disabled selected>Please Pick one</option>
                                                            <option>Work From Home</option>
                                                            <option>Work at Office</option>
                                                        </select>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Description</span>
                                                        </div>
                                                        <input id="description" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="text" required/>
                                                    </label>
                                                </div>
                                                <div class="modal-action">
                                                  <form method="dialog" class="flex justify-evenly flex-row w-full">
                                                      <button type="submit" class="btn btn-error" @click="checkdatematchholidays2">Sign</button>
                                                      <button type="reset" class="btn btn-warning" @click="clearForm">ClearInput</button>
                                                      <button class="btn btn-info">Close</button>
                                                  </form>
                                                </div>
                                              </div>
                                            </dialog>
                                    <router-link to="/leave-req"><button type="button" class="btn bg-green-500 w-[150px] h-[50px]  text-black rounded-[10px] mx-4 cursor-pointer">Leave Request</button></router-link>
                            </div>
                        </form>
                    </div>
                    <div id="title2">
                        <div class="text-black font-bold text-[20px] w-[100%] text-center mb-10">My Attendance List <br> <div id="amount" class="text-black">Summary Wages : {{ calculateMysalary(this.user_id) }} Baht <br></div></div>
                    </div>
                    <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center mb-10">
                        <table class="table py-[100px] w-[100%] text-center" >
                            <thead class="text-black bg-emerald-400 rounded-t-lg text-[15px]">
                                <tr class="rounded-t-lg">
                                    <th class="w-[5%]">No.</th>
                                    <th class="w-[15%]">Date</th>
                                    <th class="w-[10%]">Time In</th>
                                    <th class="w-[10%]">Time Out</th>
                                    <th class="w-[22%]">Description</th>
                                    <th class="w-[17%]">Site Name</th>
                                    <th class="w-[10%]">Type Sign</th>
                                    <th class="w-[10%]">Status</th>
                                </tr>
                            </thead>
                            <tbody class="text-black text-center" v-if="displayedAttendance.length > 0">
                                    <tr v-for="ts,index in displayedAttendance" :key="ts.id" class="border-b-black">
                                        <td class="border-b-blue-900">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                        <td class="border-b-blue-900">{{ formatDate(ts.date) }}</td>
                                        <td v-if="ts.time_in == '00:00:00'" class="border-b-blue-900"><button :disabled="!isInServerTimeRangeTimeIn()" @click="signtime_in(ts.id,ts.date)" class="btn btn-warning">Sign TimeIn</button></td>
                                        <td v-else class="border-b-blue-900">{{ format_time(ts.time_in) }}</td>
                                        <td v-if="ts.time_out == '00:00:00'" class="border-b-blue-900"><button :disabled="!isInServerTimeRangeTimeOut()" @click="signtime_out(ts.id,ts.date)" class="btn btn-warning">Sign TimeOut</button></td>
                                        <td v-else class="border-b-blue-900">{{ format_time(ts.time_out) }}</td>
                                        <td class="border-b-blue-900">{{ ts.description }}</td>
                                        <td class="border-b-blue-900">{{ ts.site_name}}</td>
                                        <td class="border-b-blue-900">
                                            <span v-if="ts.type_sign == 'normal'" class="text-green-500 font-bold">Normal</span>
                                            <span v-else-if="ts.type_sign == 'backdate'" class="text-red-500 font-bold">Backdate</span>
                                        </td>
                                        <td v-if="ts.status == 0" class="border-b-blue-900 text-red-600 font-bold">Rejected</td>
                                        <td v-if="ts.status == 1" class="border-b-blue-900 text-warning font-bold">Pending</td>
                                        <td v-if="ts.status == 2" class="border-b-blue-900 text-success font-bold">Approved</td>
                                    </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="8" class="text-black text-center font-bold">No data available.</td>
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
import * as XLSX from 'xlsx'
const host = 'https://backendvanmangit-production.up.railway.app/';
import moment from 'moment'

    export default {
        name: 'HomePage',
        data() {
            return {
                holidays: [],
                datadate:[],
                timesheetlList: [],
                date: '',
                timein: '',
                timeout: '',
                site_name: '',
                text: '',
                isHoliday: false,
                user: '',
                user_id: '',
                configsalary: '',
                currentPage: 1,
                itemsPerPage: 10,
                server_datetime: '',
                server_date: '',
                server_time: ''
            }
        },

        mounted() {
            this.fetchHolidays()
            this.getuser()
            this.getlistTimesheet()
            this.getConfigSalary()
            this.get_datetimefromserver()
            setInterval(() => {
                this.get_datetimefromserver();
            }, 1000)
        },

        computed: {
            
            getmyattendance(){
                return this.timesheetlList.filter(timesheet => timesheet.user === this.user_id)
            },
            totalPages() {
              return Math.ceil(this.getmyattendance.length / this.itemsPerPage);
            },
            displayedAttendance() {
              const startIndex = (this.currentPage - 1) * this.itemsPerPage;
              const endIndex = this.currentPage * this.itemsPerPage;
              return this.getmyattendance.slice(startIndex, endIndex);
            }

        },

        methods: {
            async fetchHolidays(){
                await axios.get('https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year=2024', {
                    headers: {
                        'X-IBM-Client-Id': 'b853435f-b070-4ad8-88b9-0f80dd119f7d',
                        'accept': 'application/json'
                    }
                }).then((res) => {
                    const data = res.data.result.data;
                    for (let n = 0; n < data.length; n++) {
                        const currentDate = data[n].Date;
                        this.holidays.push(currentDate)
                    }
                    this.datadate = data
                }).catch((err) => {
                    console.log(err)
                })
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

            checkdatematchholidays(){ 
                try {
                if (this.date == this.server_date) {
                    if (this.holidays.includes(this.date)) {
                        this.isHoliday = true;
                        const holidayIndex = this.holidays.indexOf(this.date);
                        swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'This date is a holiday.',
                            footer: this.datadate[holidayIndex].HolidayDescription
                        });
                    } else {
                        if (this.date == '' || this.site_name == '' || this.text == '') {
                            swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Please fill in all fields.'
                            });
                        } else {
                            swal.fire({
                                title: 'Are you sure?',
                                text: 'You want to sign in ?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.isHoliday = false
                                    axios.post(host+ 'timesheets/',{
                                        date: this.date,
                                        time_in: '00:00:00',
                                        time_out: '00:00:00',
                                        site_name: this.site_name,
                                        description: this.text,
                                        who_signed: this.user.first_name + ' ' + this.user.last_name,
                                        user: this.user_id,
                                        type_sign:'normal',
                                        status: 1
                                    }).then((res) => {
                                        swal.fire({
                                            icon: 'success',
                                            title: 'Success',
                                            text: 'Sign for work successfully'
                                        }).then(() => {
                                            axios.post(host + 'user_timesheets/',{
                                                user: this.user_id,
                                                timesheet: res.data.id
                                            })
                                            this.$router.go();
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }
                            })
                        }
                    }
                } else {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You can only sign in on the same day as the date you selected'
                    });
                }
                } catch (error) {
                    console.error(error)
                }
            },
            checkdatematchholidays2(){ 
                try {
                    const today = new Date(this.server_date);
                    const selectedDate = new Date(this.date);
                    
                    if (selectedDate >= today) {
                        swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please select a day before today.'
                        });
                    } else if (this.holidays.includes(this.date)) {
                        this.isHoliday = true;
                        const holidayIndex = this.holidays.indexOf(this.date);
                        swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'This date is a holiday.',
                            footer: this.datadate[holidayIndex].HolidayDescription
                        });
                    } else {
                        if (this.date == '' || this.site_name == '' || this.text == '') {
                            swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Please fill in all fields.'
                            });
                        } else {
                            swal.fire({
                                title: 'Are you sure?',
                                text: 'You want to sign in ?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.isHoliday = false
                                    axios.post(host+ 'timesheets/',{
                                        date: this.date,
                                        time_in: this.timein,
                                        time_out: this.timeout,
                                        site_name: this.site_name,
                                        description: this.text,
                                        who_signed: this.user.first_name + ' ' + this.user.last_name,
                                        user: this.user_id,
                                        type_sign:'backdate',
                                        status: 1
                                    }).then((res) => {
                                        swal.fire({
                                            icon: 'success',
                                            title: 'Success',
                                            text: 'Sign for work successfully'
                                        }).then(() => {
                                            axios.post(host + 'user_timesheets/',{
                                                user: this.user_id,
                                                timesheet: res.data.id
                                            })
                                            this.$router.go();
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }
                            })
                        }
                    }
                } catch (error) {
                    console.error(error)
                }
            },
            checkSigninToday() {
                const todayDate = this.server_date;
                if (this.displayedAttendance.find(ts => ts.user === this.user_id && ts.date === todayDate)){
                    return true; // Can sign in
                } else {
                    return false; // Cannot sign in
                }
            },

            signtime_out(id,date){
                if (this.server_date != date ){
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You can only sign out on the same day as the date you selected'
                    })
                } else {
                    swal.fire({
                        title: 'Are you sure?',
                        text: 'You want to sign out at ' + this.server_time + ' ?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.patch(host + 'timesheets/' + id + '/',{
                                time_out: this.server_time
                            }).then(() => {
                                swal.fire({
                                    icon: 'success',
                                    title: 'Success',
                                    text: 'Sign for work successfully'
                                }).then(() => {
                                    this.$router.go();
                                })
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    })
                }
            },

            signtime_in(id,date){
                if (this.server_date != date ){
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You can only sign in on the same day as the date you selected'
                    })
                } else {
                    swal.fire({
                        title: 'Are you sure?',
                        text: 'You want to sign in at ' + this.server_time + ' ?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.patch(host + 'timesheets/' + id + '/',{
                                time_in: this.server_time
                            }).then(() => {
                                swal.fire({
                                    icon: 'success',
                                    title: 'Success',
                                    text: 'Sign for work successfully'
                                }).then(() => {
                                    this.$router.go();
                                })
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    })
                }
            
            },

            isInServerTimeRangeTimeIn(){
                const time = this.server_time.split(':');
                const hour = parseInt(time[0]);
                const minute = parseInt(time[1]);
                if ((hour > 8 )) {
                     return true;
                } else {
                    return false;
                }

            },

            isInServerTimeRangeTimeOut(){
                const time = this.server_time.split(':');
                const hour = parseInt(time[0]);
                const minute = parseInt(time[1]);
                if (hour < 18 || (hour === 18 && minute <= 0)) {
                    return true;
                } else {
                    return false;
                }
            },

            getlistTimesheet(){
                axios.get(host + 'timesheets/')
                .then(res => {
                    this.timesheetlList = res.data
                })
            },

            getConfigSalary(){
                axios.get(host + 'config_salary')
                .then(res => {
                    this.configsalary = res.data[0]
                })
            },

            downloadTimesheetInExcel() {
                let totalWages = 0;
                const dataForExcel = this.getmyattendance.map((attendance) => {
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
                XLSX.writeFile(wb, `attendance_of_${this.user.first_name}_${this.user.last_name}.xlsx`);
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

            getuser(){
                const userjson = localStorage.getItem('user')
                const user_data = JSON.parse(userjson)
                this.user = user_data
                this.user_id = user_data.id
            },

            clearForm(){
                this.date = ''
                this.timein = ''
                this.timeout = ''
                this.site_name = ''
                this.text = ''
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

            calculateMysalary(user_id){
                try{
                    let salary = 0
                    this.getmyattendance.map(ts => {
                        if (ts.user === user_id){
                            if (ts.site_name == 'Work at Office') {
                                if (ts.status === 0 || ts.status === 1) {
                                    salary += 0
                                } else {
                                    salary += this.configsalary.WOF
                                }
                            } else {
                                if (ts.status === 0 || ts.status === 1) {
                                    salary += 0
                                } else {
                                    salary += this.configsalary.WFH
                                }
                            }
                        }
                    })
                    return salary
                } catch (error) {
                    console.error(error)
                }
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

