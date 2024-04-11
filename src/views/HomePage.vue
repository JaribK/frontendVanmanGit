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
                                <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                    <li><router-link to="/leave-req">Leave Request</router-link></li>
                                    <li v-if="user.is_superuser == true"><router-link to="/home/admin">Manage Attendance</router-link></li>
                                    <li v-if="user.is_superuser == true"><router-link to="/approve-lr">Manage Leave Request</router-link></li>
                                    <li class="bg-error text-black rounded" @click="logout"><a>logout</a></li>
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
                                    <span class="label-text text-black">Description</span>
                                </div>
                                <textarea id="text" type="text" placeholder="Type here" class="textarea textarea-bordered w-full max-w-xs" cols="15" v-model="text" required></textarea>
                            </label>
                            <div class="w-full flex justify-center flex-wrap">
                                <input type="button" :disabled="checkSigninToday()" @click="checkdatematchholidays" value="Sign" class="btn w-[300px] h-[50px] bg-[#3668A7] text-white rounded-[10px] my-[64px] cursor-pointer">
                                <button type="button" @click="clearForm" class="btn btn-warning w-[150px] h-[50px]  text-black rounded-[10px] mx-4 my-[64px] cursor-pointer">Clear Input</button>
                                <button type="button" @click="downloadTimesheetInExcel" class="btn w-[300px] h-[50px] bg-gray-400 text-black rounded-[10px] my-[64px] cursor-pointer">Download my Attendance</button>
                            </div>
                        </form>
                    </div>
                    <div id="title2">
                        <div class="text-black font-bold text-[20px] w-[100%] text-center mb-10">My Attendance List <br> <div id="amount" class="text-black">Summary Salary : {{ calculateMysalary(this.user_id) }} Baht <br></div></div>
                    </div>
                    <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center mb-10">
                        <table class="table py-[100px] w-[80%] text-center" >
                            <thead class="text-black bg-emerald-400 rounded-t-lg text-[15px]">
                                <tr class="rounded-t-lg">
                                    <th class="w-[5%]">No.</th>
                                    <th class="w-[15%]">Date</th>
                                    <th class="w-[15%]">Time In</th>
                                    <th class="w-[15%]">Time Out</th>
                                    <th class="w-[30%]">Description</th>
                                    <th class="w-[20%]">Site Name</th>
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
                                    </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6" class="text-black text-center font-bold">No data available.</td>
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
                                        status:'normal'
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
                if ((hour === 8 && minute >= 0) || (hour === 8 && minute === 30)) {
                     return true;
                } else {
                    return false;
                }

            },

            isInServerTimeRangeTimeOut(){
                const time = this.server_time.split(':');
                const hour = parseInt(time[0]);
                const minute = parseInt(time[1]);
                if ((hour === 17 && minute >= 30) || (hour === 18 && minute === 0)) {
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
              this.getmyattendance.forEach((attendance) => {
                if (attendance.site_name === "Work From Home") {
                  totalWages += this.configsalary.WFH;
                } else if (attendance.site_name === "Work at Office") {
                  totalWages += this.configsalary.WOF;
                }
              });
          
              const totalObject = { Total_Wages: totalWages };
              const dataForExcel = [...this.getmyattendance, totalObject];
              const ws = XLSX.utils.json_to_sheet(dataForExcel);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
              XLSX.writeFile(wb, `attendance_of_${this.user.first_name}_${this.user.last_name}.xlsx`);
            },

            logout(){
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    swal.fire({
                        title: 'Success',
                        text: 'Logout Success',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.$router.push('/login');
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
                                salary += this.configsalary.WOF
                            } else {
                                salary += this.configsalary.WFH
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

