<script setup>
    import Navbar from "@/components/templates/Navbar.vue";
</script>
<template>
    <div>
        <div id="background" class="w-full h-fit bg-white">
            <Navbar></Navbar>
            <div id="content" class="w-full h-fit flex justify-center animate-fade-up animate-once">
                <div id="box" class="bg-white w-[80%] h-fit flex justify-center flex-col">
                    <div class="w-[100%] text-center text-black text-[20px] font-bold py-4 flex justify-center">
                        <div id="datetime-server">
                            Time Attendance On {{ formatDate(server_date)  }} at {{ format_time(server_time) }}
                        </div>
                    </div>
                    <div id="titlebox" class="py-[32px] text-black font-bold text-[30px] w-[100%] text-center">Sign for work <br>{{user.first_name}} {{user.last_name}}</div>
                    <div id="form" class="w-full mt-10">
                        <form action="" class="px-[40px] flex justify-evenly flex-wrap">
                            <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span class="label-text text-black">Date</span>
                                    <span class="label-text-alt text-red-600" v-if="isHoliday == true">This date is a holiday.</span>
                                </div>
                                <input id="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs mb-10" v-model="date" required/>
                            </label>
                            <label class="form-control w-full max-w-xs">
                              <div class="label">
                                <span class="label-text text-black">Type of work</span>
                              </div>
                              <select class="select select-bordered" v-model="type_of_work" required>
                                <option disabled selected>Please Pick one</option>
                                <option>Work From Home</option>
                                <option>Work at Office</option>
                              </select>
                            </label>
                            <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span class="label-text text-black">Your Name</span>
                                </div>
                                <input id="timein" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs mb-10" :value="user.first_name + ' ' + user.last_name" disabled />
                            </label>
                            <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span class="label-text text-black">Description (What will you do today?)</span>
                                </div>
                                <textarea maxlength="255" id="text" type="text" placeholder="Type here" class="textarea textarea-bordered w-full max-w-xs" cols="15" v-model="text" required></textarea>
                            </label>
                            <div class="w-full flex justify-center flex-wrap mt-10">
                                <input type="button" :disabled="checkSigninToday()" @click="checkdatematchholidays" value="Start Work" class="btn w-[300px] h-[50px] mt-10 border-none bg-[#3668A7] text-white rounded-[10px] cursor-pointer">
                                <button type="button" @click="clearForm" class="btn bg-warning w-[150px] h-[50px] border-none text-black rounded-[10px] mt-10 mx-4 cursor-pointer">Clear Input</button>
                                <button type="button" @click="downloadTimesheetInExcel" class="btn w-[300px] h-[50px] bg-gray-400 mt-10 border-none text-black rounded-[10px] mb-4 cursor-pointer">Download my Attendance</button>
                            </div>
                            <div class="w-full flex justify-center flex-wrap mb-10">
                                <button type="button" onclick="my_modal_1.showModal()" class="btn bg-error w-[300px] text-white border-none">Belated Sign</button>                     
                                            <dialog id="my_modal_1" class="modal">
                                              <div class="modal-box">
                                                <h3 class="font-bold text-base text-center">Belated Sign <br> (If you don't have time to sign the normal form)</h3>
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
                                                        <input id="datetimein" type="time" step="2" value="" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="timein" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Time Out</span>
                                                        </div>
                                                        <input id="datetimeout" type="time" step="2" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="timeout" required/>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Type of work</span>
                                                        </div>
                                                        <select class="select select-bordered" v-model="type_of_work" required>
                                                            <option disabled selected>Please Pick one</option>
                                                            <option>Work From Home</option>
                                                            <option>Work at Office</option>
                                                        </select>
                                                    </label>
                                                    <label class="form-control w-full max-w-xs">
                                                        <div class="label">
                                                            <span class="label-text text-black">Description</span>
                                                        </div>
                                                        <input maxlength="255" id="description" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl mb-4" v-model="text" required/>
                                                    </label>
                                                </div>
                                                <div class="modal-action">
                                                  <form method="dialog" class="flex justify-evenly flex-row w-full">
                                                      <button type="submit" class="btn btn-error border-none" @click="checkdatematchholidays2">Sign</button>
                                                      <button type="reset" class="btn btn-warning border-none" @click="clearForm">ClearInput</button>
                                                      <button class="btn btn-info">Close</button>
                                                  </form>
                                                </div>
                                              </div>
                                            </dialog>
                                    <router-link to="/leave-req"><button type="button" class="btn bg-green-500 w-[150px] h-[50px] border-none text-black rounded-[10px] mx-4 cursor-pointer">Leave Request</button></router-link>
                            </div>
                        </form>
                    </div>
                    <div id="title2">
                        <div class="text-black font-bold text-[20px] w-[100%] text-center mb-10">My Attendance List <br> <div id="amount" class="text-black">Summary Wages : {{ calculateMysalary(user_id) }} Baht <br></div></div>
                    </div>
                    <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center mb-10">
                        <table class="table py-[100px] w-[100%] text-center">
                            <thead class="text-black bg-emerald-400 text-[15px] drop-shadow-md">
                                <tr class="rounded-full">
                                    <th class="w-[5%]">No.</th>
                                    <th class="w-[15%]">Date</th>
                                    <th class="w-[10%]">Time In</th>
                                    <th class="w-[10%]">Time Out</th>
                                    <th class="w-[22%]">Description</th>
                                    <th class="w-[17%]">Type of work</th>
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
                                        <td class="border-b-blue-900">{{ ts.description }} <br>
                                            <!-- Open the modal using ID.showModal() method -->
                                            <button v-if=" ts.date == server_date" class="btn mt-4" @click="openModal(ts.id)" >Edit</button>
                                            <dialog :id="'my_modal_5_' + ts.id" class="modal modal-bottom sm:modal-middle">
                                              <div class="modal-box">
                                                <h3 class="font-bold text-lg text-white">Edit Description</h3>
                                                <br>
                                                <textarea type="text" class="input input-bordered w-[320px] max-w-xs h-[180px] resize-none cursor-not-allowed" :value="ts.description" readonly>
                                                </textarea>
                                                <p class="py-4 text-white">Change to</p>
                                                <textarea maxlength="255" type="text" class="input input-bordered w-[320px] max-w-xs h-[180px] resize-none mb-4" v-model="today_des" required>
                                                </textarea>
                                                <div class="modal-action flex justify-around">
                                                  <form method="dialog">
                                                    <button type="submit" class="btn btn-success border-none mx-4" @click="patchDescription(ts.id)">Save</button>
                                                    <button class="btn">Close</button>
                                                  </form>
                                                </div>
                                              </div>
                                            </dialog>
                                        </td>
                                        <td class="border-b-blue-900">{{ ts.type_of_work}}</td>
                                        <td class="border-b-blue-900">
                                            <span v-if="ts.type_sign == 'normal'" class="text-green-500 font-bold">Normal</span>
                                            <span v-else-if="ts.type_sign == 'backdate'" class="text-red-500 font-bold">Backdate</span>
                                            <span v-else-if="ts.type_sign == 'holiday'" class="text-blue-500 font-bold">Holiday</span>
                                            <span v-else-if="ts.type_sign == 'backdate(holiday)'" class="text-red-700 font-bold">Backdate(Holiday)</span>
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
                    <div ref="bottomEl" class="flex justify-center mt-4 pb-[32px] flex-wrap items-center">
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
let host = ''
import moment from 'moment'

    export default {
        name: 'HomePage',
        data() {
            return {
                user: '',
                user_id: '',
                holidays: [],
                datadate:[],
                timesheetlList: [],
                date: '',
                timein: '',
                timeout: '',
                type_of_work: '',
                text: '',
                isHoliday: false,
                user: '',
                user_id: '',
                configsalary: '',
                currentPage: 1,
                itemsPerPage: 10,
                server_datetime: '',
                server_date: '',
                server_time: '',
                checkday: '',
                year:'',
                today_des: '',
            }
        },
        created() {
          host = this.$store.state.host
        },

        mounted() {
            this.getUser()
            this.getlistTimesheet()
            this.fetchHolidays()
            this.getConfigSalary()
            this.updateDateTime()
            this.getyearfromserverdatetime()
            setInterval(() => {
                this.updateDateTime();
                this.getlistTimesheet();
                this.getyearfromserverdatetime();
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
                const sortedAttendance = this.getmyattendance.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                return sortedAttendance.slice(startIndex, endIndex);
            }

        },
        

        methods: {
            cleardescription(){
                this.today_des = ''
            },
            patchDescription(id){
                axios.patch(host + 'timesheets/' + id + '/',{
                    description: this.today_des
                }).then(() => {
                    swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Edit description successfully'
                    })
                    this.cleardescription()
                }).catch((err) => {
                    console.log(err)
                })
            },
            openModal(id){
                const modalId = 'my_modal_5_' + id;
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.showModal();
                }
            },
            getyearfromserverdatetime(){
                const dateParts = this.server_datetime.split(' '); 
                const year = dateParts[2];
                this.year = year;
            },
            updateDateTime() {
              const now = new Date();
              const date = this.formatDate(now);
              const time = this.format_time(now);

              this.server_datetime = `${date} ${time}`;

              this.server_date = now.toISOString().split('T')[0];

              this.server_time = now.toTimeString().split(' ')[0];
            },
            async fetchHolidays(){
                await axios.get(`https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year=${this.year}`, {
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
                    const selectedDate = new Date(this.date);
                    const day_of_Week = selectedDate.getDay();
                    this.checkday = day_of_Week
                    if (this.date == '' || this.type_of_work == '' || this.text == '') {
                            swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Please fill in all fields.'
                            });
                    } else if (this.holidays.includes(this.date) || this.checkday == 0 || this.checkday == 6) {
                        this.isHoliday = true;
                        const holidayIndex = this.holidays.indexOf(this.date);
                        if (this.holidays.includes(this.date)) {
                            swal.fire({
                                icon: 'warning',
                                title: 'Oops...',
                                text: 'This date is a holiday. Do you want to sign in?',
                                footer: this.datadate[holidayIndex].HolidayDescription,
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, I want to sign in',
                                cancelButtonText: 'No'
                            }).then(result => {
                                if (result.isConfirmed) {
                                    axios.post(host+ 'timesheets/',{
                                        date: this.date,
                                        time_in: this.server_time,
                                        time_out: '00:00:00',
                                        type_of_work: this.type_of_work,
                                        description: this.text,
                                        who_signed: this.user.first_name + ' ' + this.user.last_name,
                                        user: this.user_id,
                                        type_sign:'holiday',
                                        status: 1
                                    }).then((res) => {
                                        swal.fire({
                                            icon: 'success',
                                            title: 'Success',
                                            text: 'Sign for work successfully'
                                        }).then(() => {
                                            this.scrollToBottom()
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                } else {
                                }
                            })
                        } else if (this.checkday == 0 || this.checkday == 6){
                            swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'This date is a holiday. Do you want to sign in?',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, I want to sign in',
                            cancelButtonText: 'No'
                        }).then(result => {
                                if (result.isConfirmed) {
                                    axios.post(host+ 'timesheets/',{
                                        date: this.date,
                                        time_in: this.server_time,
                                        time_out: '00:00:00',
                                        type_of_work: this.type_of_work,
                                        description: this.text,
                                        who_signed: this.user.first_name + ' ' + this.user.last_name,
                                        user: this.user_id,
                                        type_sign:'holiday',
                                        status: 1
                                    }).then((res) => {
                                        swal.fire({
                                            icon: 'success',
                                            title: 'Success',
                                            text: 'Sign for work successfully'
                                        }).then(() => {
                                            this.scrollToBottom()
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                } else {
                                }
                            })
                        }
                    } else {
                        if (this.date == '' || this.type_of_work == '' || this.text == '') {
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
                                        time_in: this.server_time,
                                        time_out: '00:00:00',
                                        type_of_work: this.type_of_work,
                                        description: this.text,
                                        who_signed: this.user.first_name + ' ' + this.user.last_name,
                                        user: this.user_id,
                                        type_sign:'normal',
                                        status: 1
                                    }).then((res) => {
                                        swal.fire({
                                            icon: 'success',
                                            title: 'Success',
                                            text: 'Sign for work successfully',
                                            confirmButtonText: 'Next'
                                            
                                        }).then(async () => {
                                            await swal.fire({
                                                title: 'Warning',
                                                text: 'Please sign In & Out for Work at bottom table.',
                                                icon: 'warning',
                                                confirmButtonColor: '#3085d6',
                                                confirmButtonText: 'OK, I understand'
                                            }).then((res) => {   
                                                if (res.isConfirmed) {
                                                    this.scrollToBottom()
                                                }
                                            })
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
            scrollToBottom() {
              this.$refs.bottomEl.scrollIntoView({ behavior: 'smooth' });
            },
            checkdatematchholidays2(){ 
                try {
                    const today = new Date(this.server_date);
                    const selectedDate = new Date(this.date);
                    const day_of_Week = selectedDate.getDay();
                    this.checkday = day_of_Week
                    
                    
                    if (selectedDate >= today) {
                        swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please select a day before today.'
                        });
                    } else if (this.date == '' || this.type_of_work == '' || this.text == '' || this.timein == '' || this.timeout == '') {
                            swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Please fill in all fields.'
                            });
                    } else if (this.holidays.includes(this.date) || this.checkday == 0 || this.checkday == 6) {
                        this.isHoliday = true;
                        const holidayIndex = this.holidays.indexOf(this.date);
                        if (this.holidays.includes(this.date)) {
                            swal.fire({
                                icon: 'warning',
                                title: 'Oops...',
                                text: 'This date is a holiday. Do you want to sign in?',
                                footer: this.datadate[holidayIndex].HolidayDescription,
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, I want to sign in',
                                cancelButtonText: 'No'
                            }).then(result => {
                                if (result.isConfirmed) {
                                    axios.post(host+ 'timesheets/',{
                                        date: this.date,
                                        time_in: this.timein,
                                        time_out: this.timeout,
                                        type_of_work: this.type_of_work,
                                        description: this.text,
                                        who_signed: this.user.first_name + ' ' + this.user.last_name,
                                        user: this.user_id,
                                        type_sign:'backdate(holiday)',
                                        status: 1
                                    }).then((res) => {
                                        swal.fire({
                                            icon: 'success',
                                            title: 'Success',
                                            text: 'Sign for work successfully'
                                        }).then(() => {
                                            this.scrollToBottom()
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }
                            })
                        } else if (this.checkday == 0 || this.checkday == 6){
                            swal.fire({
                                icon: 'warning',
                                title: 'Oops...',
                                text: 'This date is a holiday. Do you want to sign in?',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, I want to sign in',
                                cancelButtonText: 'No'
                            }).then(result => {
                                    if (result.isConfirmed) {
                                        axios.post(host+ 'timesheets/',{
                                            date: this.date,
                                            time_in: this.timein,
                                            time_out: this.timeout,
                                            type_of_work: this.type_of_work,
                                            description: this.text,
                                            who_signed: this.user.first_name + ' ' + this.user.last_name,
                                            user: this.user_id,
                                            type_sign:'backdate(holiday)',
                                            status: 1
                                        }).then((res) => {
                                            swal.fire({
                                                icon: 'success',
                                                title: 'Success',
                                                text: 'Sign for work successfully'
                                            }).then(() => {
                                                this.scrollToBottom()
                                            })
                                        }).catch((err) => {
                                            console.log(err)
                                        })
                                    }
                            })
                        }
                    } else {
                        if (this.date == '' || this.type_of_work == '' || this.text == '' || this.timein == '' || this.timeout == '') {
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
                                        type_of_work: this.type_of_work,
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
                                            this.scrollToBottom()
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
                if ((hour >= 8 && hour < 18)) {
                    return true;
                } else {
                    return false;
                }
            },

            isInServerTimeRangeTimeOut(){
                const time = this.server_time.split(':');
                const hour = parseInt(time[0]);
                const minute = parseInt(time[1]);
                if ((hour >= 8 && hour < 21)) {
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
                    let wages = 0; // Variable to store wages
                
                    if (attendance.type_of_work === "Work From Home") {
                        if (attendance.status === 0) {
                            status = 'Rejected';
                        } else if (attendance.status === 1) {
                            status = 'Pending';
                        } else if (attendance.status === 2) {
                            status = 'Approved';
                            wages = this.configsalary.WFH;
                            totalWages += wages;
                        }
                    } else if (attendance.type_of_work === "Work at Office") {
                        if (attendance.status === 0) {
                            status = 'Rejected';
                        } else if (attendance.status === 1) {
                            status = 'Pending';
                        } else if (attendance.status === 2) {
                            status = 'Approved';
                            wages = this.configsalary.WOF;
                            totalWages += wages;
                        }
                    }
                    return {
                        date: attendance.date,
                        time_in: attendance.time_in,
                        time_out: attendance.time_out === '00:00:00' ? 'Not signed out work' : attendance.time_out,
                        description: attendance.description,
                        type_of_work: attendance.type_of_work,
                        who_signed: attendance.who_signed,
                        type_sign: attendance.type_sign,
                        status,
                        wages 
                    }; // Include wages in the returned object
                });
            
                const totalObject = { Total_Wages: totalWages };
                dataForExcel.push(totalObject);
            
                const ws = XLSX.utils.json_to_sheet(dataForExcel);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
                XLSX.writeFile(wb, `attendance_of_${this.user.first_name}_${this.user.last_name}.xlsx`);
            },

            getUser() {
                const userjson = localStorage.getItem('user')
                const user_data = JSON.parse(userjson)
                this.user = user_data
                this.user_id = user_data.id
            },

            clearForm(){
                this.date = ''
                this.timein = ''
                this.timeout = ''
                this.type_of_work = ''
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
                            if (ts.type_of_work == 'Work at Office') {
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

            // get_datetimefromserver(){
            //     axios.get('https://worldtimeapi.org/api/ip')
            //     // https://worldtimeapi.org/api/ip
            //     .then(res => {
            //         this.server_datetime = res.data.datetime
            //         const datetime = new Date(this.server_datetime);
            
            //         // Get date in "YYYY-MM-DD" format
            //         this.server_date = datetime.toISOString().split('T')[0];

            //         // Get time in "HH:MM:SS" format
            //         this.server_time = datetime.toTimeString().split(' ')[0];

            //     })
            // },
        }
    }   
</script>

