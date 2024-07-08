<script setup>
    import Navbar from "@/components/templates/Navbar.vue";
</script>
<template>
    <div class="overflow-x-hidden overflow-y-auto">
        <div id="background" class="bg-white w-full h-lvh ">
            <Navbar></Navbar>
            <div class="w-[100%] text-center text-black text-[20px] font-bold py-4 flex justify-center animate-fade-up animate-once">
                        <div id="datetime-server">
                            Time Attendance On {{ formatDate(server_date)  }} at {{ format_time(server_time) }}
                        </div>
            </div>
            <div id="title" class="flex justify-center w-full pt-10">
                <div class="font-bold text-black text-[30px] animate-fade-up animate-once">Feedback to Developer</div>
            </div>
            <div class="flex justify-center bg-white">
                <div id="information" class=" w-[1024px] my-16 rounded-[28px] overflow-hidden justify-self-center drop-shadow-2xl animate-fade-up animate-once">
                        <div class="bg-[#3C3C3C] drop-shadow-lg p-4">
                            <h2 class="text-white ml-8">Feedback</h2>
                        </div>
                        <div class="bg-[#303346] h-fit z-40 p-12 drop-shadow-2xl flex flex-col items-center w-full">
                            <div class="flex flex-warp justify-evenly w-full items-center">
                                <label class="form-control w-full max-w-xs">
                                  <div class="label">
                                    <span class="label-text">Title</span>
                                  </div>
                                  <input maxlength="100" type="text" placeholder="Title..." class="input input-bordered w-full max-w-xs" v-model="title" required/>
                                </label>
                                <label class="form-control w-full max-w-xs ml-10">
                                  <div class="label">
                                    <span class="label-text">Type</span>
                                  </div>
                                  <div>
                                  <select placeholder="" class="input input-bordered w-full max-w-xs"  v-model="types" required>
                                    <option value="" disabled selected>(Click!) Select the Topic...</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Feature Request">Feature Request</option>
                                    <option value="Nan" disabled>In future...</option>
                                  </select>
                                </div>
                                </label>
                                    <button class="btn bg-error w-[200px] h-[50px] mt-9 ml-10 rounded-[10px] cursor-pointer text-white border-none" @click="clearForm">Clear Input</button>   
                            </div>
                            <div class=" w-full">
                                <label class="form-control w-full max-w-xs">
                                  <div class="label">
                                    <span class="label-text">Description</span>
                                    </div>
                                    <textarea maxlength="255" placeholder="Description..." class="textarea w-[930px] h-[300px] resize-none" v-model="description" required></textarea>
                                </label>
                            </div>
                            <button class="btn bg-success mt-10 w-[250px] text-white border-none" @click="sendFeedback">Send Feedback</button>
                        </div>
                </div>
            </div>
            <div id="my-feedback" class="w-full h-fit bg-white animate-fade-up animate-once">
                <div id="title" class="w-full text-center text-[20px] font-bold text-black">My Feedbacks</div>
                <div id="table" class="overflow-x-auto w-[80%] flex justify-center flex-col items-center mb-10 mx-auto py-10">
                        <table class="table py-[100px] w-[100%] text-center">
                            <thead class="text-black bg-emerald-400 text-[15px] drop-shadow-md">
                                <tr class="rounded-t-lg">
                                    <th class="w-[5%]">No.</th>
                                    <th class="w-[15%]">DateTime</th>
                                    <th class="w-[7%]">Type</th>
                                    <th class="w-[22%]">Details</th>
                                    <th class="w-[10%]">Status</th>
                                </tr>
                            </thead>
                            <tbody class="text-black text-center" v-if="displayedAttendance.length > 0">
                                    <tr v-for="mf,index in displayedAttendance" :key="mf.id" class="border-b-black">
                                        <td>{{ index + 1 }}</td>
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
                                        <td v-if="mf.status == 0" class="text-red-500 font-bold">we have received your message.</td>
                                        <td v-if="mf.status == 1" class="text-yellow-400 font-bold">We are working on this.</td>
                                        <td v-if="mf.status == 2" class="text-green-500 font-bold">We have completed processing this or are aware of this.</td>
                                    </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="8" class="text-black text-center font-bold">No data available.</td>
                                </tr>
                            </tbody>
                        </table>
                        <br><br>
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
import swal from 'sweetalert2'
let host = ''
    export default {
        name: "FeedbackPage",
        data() {
            return {
                user: '',
                user_id: '',
                title: '',
                types: '',
                description: '',
                server_datetime: '',
                server_date: '',
                server_time: '',
                feedbacks_list: [],
                currentPage: 1,
                itemsPerPage: 5,
            }
        },
        computed: {
            myfeedbacks(){
             return this.feedbacks_list.filter(feedback => feedback.user === this.user_id);
            },
            totalPages() {
              return Math.ceil(this.myfeedbacks.length / this.itemsPerPage);
            },
            displayedAttendance() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = this.currentPage * this.itemsPerPage;
                const sortedAttendance = this.myfeedbacks.sort((a, b) => {
                    return new Date(b.datetime_send) - new Date(a.datetime_send);
                });
                return sortedAttendance.slice(startIndex, endIndex);
            }
        },
        created() {
          host = this.$store.state.host
        },
        mounted() {
            this.getUser()
            this.getFeedbacks();
            this.updateDateTime();
            setInterval(() => {
                this.getFeedbacks();
                this.updateDateTime();
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
            getFeedbacks(){
                axios.get(`${host}feedbacks/`)
                .then((response) => {
                    this.feedbacks_list = response.data
                })
            },
            getUser() {
                const userjson = localStorage.getItem('user')
                const user_data = JSON.parse(userjson)
                this.user = user_data
                this.user_id = user_data.id
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

              this.server_datetime = now;

              this.server_date = now.toISOString().split('T')[0];

              this.server_time = now.toTimeString().split(' ')[0];
            },
            sendFeedback(){
                swal.fire({
                    title: 'Warning',
                    text: 'Are you sure you want to send this feedback?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.post(`${host}feedbacks/`, {
                            datetime_send: this.server_datetime,
                            title: this.title,
                            type: this.types,
                            description: this.description,
                            user: this.user_id,
                            status: 0
                        }).then((response) => {
                            swal.fire({
                                title: 'Success',
                                text: 'Feedback has been sent!',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        }).catch((error) => {
                            console.log(error)
                        })
                    } else {
                        swal.fire({
                            title: 'Warning',
                            text: 'Feedback has not been sent!',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                        });
                    }
                })
            },
            clearForm(){
                this.title = ''
                this.types = ''
                this.description = ''
            }
        }
    }
</script>