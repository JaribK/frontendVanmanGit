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
            <div id="box" class="bg-white w-[100%] h-fit flex justify-center flex-col items-center" >
                <div id="config-salary" class="flex justify-center flex-col items-center">
                        <div class="text-black font-bold text-[20px] w-[100%] text-center py-10">Config Wages</div>
                        <div class="text-black">
                            daily wage WOF : {{ configsalary.WOF }} | daily wage WFH : {{ configsalary.WFH }}
                        </div><br>
                        <button class="btn btn-warning w-[100px]" onclick="my_modal_1.showModal()"> Edit </button>
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
                            <input id="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs mb-10" v-model="datestart"/>
                        </label>
                        <label class="form-control w-full max-w-xs ml-[15px]">
                            <div class="label">
                                <span class="label-text text-black">Date End</span>
                            </div>
                            <input id="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="dateend" />
                        </label>
                    </div>
                    <div class="w-full flex justify-center flex-wrap">
                        <input type="button" @click="downloadTimesheetInExcel" value="download list of attendance" class="btn w-[250px] h-[50px] bg-[#3668A7] text-white rounded-[10px] my-[32px] cursor-pointer">
                        <button type="button" @click="clearForm" class="btn btn-warning w-[150px] h-[50px]  text-black rounded-[10px] mx-4 my-[32px] cursor-pointer">Clear Input</button>
                    </div>
                </div>
                <div id="table" class="overflow-x-auto w-full flex justify-center flex-col items-center pb-10">
                    <table class="table py-[100px] w-[80%] text-center">
                        <thead class="text-black bg-emerald-400 rounded-t-lg text-[15px]">
                            <tr class="rounded-t-lg">
                                <th class="w-[15%]">Date</th>
                                <th class="w-[10%]">Time In</th>
                                <th class="w-[10%]">Time Out</th>
                                <th class="w-[30%]">Description</th>
                                <th class="w-[15%]">Site Name</th>
                                <th class="w-[20%]">Signed by</th>
                            </tr>
                        </thead>
                        <tbody class="text-black text-center" v-if="displayedAttendance.length > 0">
                                <tr v-for="liftts in displayedAttendance" :key="liftts.id" class="border-b-black">
                                    <td class="border-b-blue-900">{{ formatDate(liftts.date) }}</td>
                                    <td v-if="liftts.time_in == '00:00:00'" class="border-b-blue-900"></td>
                                    <td v-else class="border-b-blue-900">{{ format_date(liftts.time_in) }}</td>
                                    <td v-if="liftts.time_out == '00:00:00'" class="border-b-blue-900"></td>
                                    <td v-else class="border-b-blue-900">{{ format_date(liftts.time_out) }}</td>
                                    <td class="border-b-blue-900">{{ liftts.description }}</td>
                                    <td class="border-b-blue-900">{{ liftts.site_name }}</td>
                                    <td class="border-b-blue-900">{{ liftts.who_signed }}</td>
                                </tr>
                        </tbody>
                        <tbody class="text-black text-center font-bold" v-else>
                            <tr>
                                <td colspan="6">No data available.</td>
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
                      (!this.datestart || !this.dateend || (listts.date >= this.datestart && listts.date <= this.dateend))
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
        mounted(){
            this.getUser()
            this.getlistTimesheet()
            this.getConfigSalary()

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
              this.mergedFilteredList.forEach((attendance) => {
                if (attendance.site_name === "Work From Home") {
                  totalWages += this.configsalary.WFH;
                } else if (attendance.site_name === "Work at Office") {
                  totalWages += this.configsalary.WOF;
                }
              });
          
              const totalObject = { Total_Wages: totalWages };
              const dataForExcel = [...this.mergedFilteredList, totalObject];
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
