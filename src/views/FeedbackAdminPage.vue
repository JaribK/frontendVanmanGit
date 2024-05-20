<script setup>
    import Navbar from "@/components/templates/Navbar.vue";
</script>
<template>
    <div>
        <div id="background" class="w-full h-lvh bg-white">
            <Navbar></Navbar>
            <div class="w-[100%] text-center text-black text-[20px] font-bold py-4 flex justify-center animate-fade-up animate-once">
                        <div id="datetime-server">
                            Time Attendance On {{ formatDate(server_date)  }} at {{ format_time(server_time) }}
                        </div>
            </div>
            <div id="title" class="flex justify-center w-full pt-10">
                <div class="font-bold text-black text-[30px] animate-fade-up animate-once">Feedback from User</div>
            </div>
            <div class="w-full flex justify-center flex-wrap mb-10 animate-fade-up animate-once">
                        <label class="form-control w-full max-w-xs mr-4">
                            <div class="label">
                              <span class="label-text text-black">filter by Types</span>
                            </div>
                          <select class="select select-bordered " v-model="selectedTypes" @change="filterByTypes">
                            <option value="">All</option>
                            <option value="Bug">Bug</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="Other">Other</option>
                          </select>
                        </label>
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                              <span class="label-text text-black">filter by Status</span>
                            </div>
                          <select class="select select-bordered " v-model="selectedStatus" @change="filterByStatusAndType">
                            <option value="">All</option>
                            <option value="0">wait for response</option>
                            <option value="1">In progressing</option>
                            <option value="2">Done</option>
                          </select>
                        </label>
            </div>
            <div id="my-feedback" class="w-full h-dvh bg-white animate-fade-up animate-once">
                <div id="title" class="w-full text-center text-[20px] font-bold text-black pt-10">All Feedbacks</div>
                <div id="table" class="overflow-x-auto w-[80%] flex justify-center flex-col items-center mb-10 mx-auto py-20">
                        <table class="table py-[200px] w-[100%] text-center">
                            <thead class="text-black bg-emerald-400 text-[15px] drop-shadow-md">
                                <tr class="rounded-t-lg">
                                    <th class="w-[10%]">DateTime</th>
                                    <th class="w-[12%]">Type</th>
                                    <th class="w-[22%]">Details</th>
                                    <th class="w-[10%]">Send By</th>
                                    <th class="w-[10%]">Manage</th>
                                </tr>
                            </thead>
                            <tbody class="text-black text-center" v-if="displayedAttendance.length > 0">
                                    <tr v-for="mf in displayedAttendance" :key="mf.id" class="border-b-black">
                                        <td>{{ format_datetime(mf.datetime_send) }}</td>
                                        <td>{{ mf.type }}</td>
                                        <td><button class="btn bg-black text-white hover:text-slate-300" @click="openModal(mf.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                            </svg>
                                            View details of this feedback.
                                        </button>
                                        <dialog :id="'my_modal_3_' + mf.id" class="modal ">
                                          <div class="modal-box bg-slate-300 h-[500px] ">
                                            <form method="dialog">
                                              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <div>
                                                <h3 class="font-bold text-lg mb-10">Details of this feedback.</h3>
                                                <div class="w-full flex flex-col justify-center flex-wrap items-center">
                                                    <div class="w-full flex flex-col justify-center flex-wrap items-center">
                                                        <label class="form-control w-full max-w-xs">
                                                          <div class="label">
                                                            <span class="label-text text-black font-bold">Title</span>
                                                            </div>
                                                            <input type="text" placeholder="Title..." class="input input-bordered w-full max-w-xs bg-white text-black border-black" v-model="mf.title" readonly/>
                                                        </label>
                                                        <label class="form-control w-full max-w-xs">
                                                          <div class="label">
                                                            <span class="label-text text-black font-bold">Type</span>
                                                            </div>
                                                            <input type="text" placeholder="Type..." class="input input-bordered w-full max-w-xs bg-white text-black border-black" v-model="mf.type" readonly/>
                                                        </label>
                                                        <label class="form-control w-full max-w-xs">
                                                          <div class="label">
                                                            <span class="label-text text-black font-bold">Description :</span>
                                                            </div>
                                                            <textarea placeholder="Description..." class="textarea w-[320px] h-[300px] bg-white text-black border-black resize-none" v-model="mf.description" readonly></textarea>
                                                        </label>

                                                </div>
                                                </div>
                                            </div>
                                          </div>
                                        </dialog></td>
                                        <td>{{ usersList.find(user => user.id === mf.user).first_name }}</td>
                                        <td v-if="mf.status == 0" class="border-b-blue-900 text-red-600 font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-error text-black w-[125px] border-none">Uncheck<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(mf.id,2)"><a>Success</a></li>
                                                  <li class="text-warning" @click="patchstatus(mf.id,1)"><a>Pending</a></li>
                                                  <li class="text-error" @click="patchstatus(mf.id,0)"><a>Uncheck</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_feedbacks(mf.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                        <td v-if="mf.status == 1" class="border-b-blue-900 text-warning font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-warning text-black w-[125px] border-none">Pending<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(mf.id,2)"><a>Success</a></li>
                                                  <li class="text-warning" @click="patchstatus(mf.id,1)"><a>Pending</a></li>
                                                  <li class="text-error" @click="patchstatus(mf.id,0)"><a>Uncheck</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_feedbacks(mf.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                        <td v-if="mf.status == 2" class="border-b-blue-900 text-green-600 font-bold flex justify-center items-center">
                                            <div class="dropdown dropdown-top dropdown-end ">
                                              <div tabindex="0" role="button" class="btn m-1 bg-success text-black w-[125px] border-none">Success<svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg></div>
                                              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  <li class="text-success" @click="patchstatus(mf.id,2)"><a>Success</a></li>
                                                  <li class="text-warning" @click="patchstatus(mf.id,1)"><a>Pending</a></li>
                                                  <li class="text-error" @click="patchstatus(mf.id,0)"><a>Uncheck</a></li>
                                              </ul>
                                            </div>
                                            <button class="btn btn-square btn-outline ml-4" @click="delete_feedbacks(mf.id)">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="8" class="text-black text-center font-bold">No data available.</td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <br>
                        <div>
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
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import swal from "sweetalert2";
let host = ''
    export default {
        name: 'FeedbackAdminPage',
        data() {
            return {
                usersList: [],
                feedbacks_list: [],
                server_datetime: '',
                server_date: '',
                server_time: '',
                selectedTypes: '',
                selectedStatus: '',
                currentPage: 1,
                itemsPerPage: 5,
            }
        },
        computed: {
            filterbyStatusAndType() {
                return this.feedbacks_list.filter(list => {
                    return (
                        (this.selectedTypes ? list.type === this.selectedTypes : true) &&
                        (this.selectedStatus ? list.status == this.selectedStatus : true || this.selectedStatus == '0' && list.status == 0 || this.selectedStatus == '1' && list.status == 1 || this.selectedStatus == '2' && list.status == 2)
                    );
                });
            },
            totalPages() {
              return Math.ceil(this.filterbyStatusAndType.length / this.itemsPerPage);
            },
            displayedAttendance() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = this.currentPage * this.itemsPerPage;
                const sortedAttendance = this.filterbyStatusAndType.sort((a, b) => {
                    return new Date(b.datetime_send) - new Date(a.datetime_send);
                });
                return sortedAttendance.slice(startIndex, endIndex);
            }
        },
        created() {
          host = this.$store.state.host
        },
        mounted(){
            this.getUsers()
            this.getFeedbacks()
            this.updateDateTime()
            setInterval(() => {
                this.updateDateTime()
                this.getFeedbacks()
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
            goToFirstPage() {
              this.currentPage = 1;
            },
            goToLastPage() {
              this.currentPage = this.totalPages;
            },
            openModal(index) {
                const modalId = 'my_modal_3_' + index;
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.showModal();
                }
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
            updateDateTime() {
              const now = new Date();
              const date = this.formatDate(now);
              const time = this.format_time(now);

              this.server_datetime = `${date} ${time}`;

              this.server_date = now.toISOString().split('T')[0];

              this.server_time = now.toTimeString().split(' ')[0];
            },
            getUsers(){
                axios.get(`${host}users/`)
                .then((response) => {
                    this.usersList = response.data
                })
            },
            getFeedbacks(){
                axios.get(`${host}feedbacks/`)
                .then((response) => {
                    this.feedbacks_list = response.data
                })
            },
            patchstatus(id,status){
                axios.patch(`${host}feedbacks/${id}/`,{
                    status: status
                }).then((response) => {
                    swal.fire({
                        title: 'Success',
                        text: 'Update status success',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                })
            },
            delete_feedbacks(id){
                swal.fire({
                    title: 'Warning',
                    text: 'Are you sure you want to delete this feedback?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.delete(`${host}feedbacks/${id}/`)
                        .then((response) => {
                            swal.fire({
                                title: 'Success',
                                text: 'Delete feedback success',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        })
                    }
                })
            },
        }
    }
</script>
