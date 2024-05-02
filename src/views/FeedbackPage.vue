<script setup>
    import Navbar from "@/components/templates/Navbar.vue";
</script>
<template>
    <div>
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
                                  <input type="text" placeholder="Title..." class="input input-bordered w-full max-w-xs" v-model="title"/>
                                </label>
                                <label class="form-control w-full max-w-xs ml-10">
                                  <div class="label">
                                    <span class="label-text">Type</span>
                                  </div>
                                  <div>
                                  <select placeholder="" class="input input-bordered w-full max-w-xs"  v-model="types">
                                    <option value="" disabled selected>(Click!) Select the Topic...</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Feature">Feature</option>
                                    <option value="Improvement">Improvement</option>
                                    <option value="Others">Others</option>
                                  </select>
                                </div>
                                </label>
                                    <button class="btn bg-error w-[200px] h-[50px] mt-9 ml-10 rounded-[10px] cursor-pointer text-white" @click="clearForm">Clear Input</button>   
                            </div>
                            <div class=" w-full">
                                <label class="form-control w-full max-w-xs">
                                  <div class="label">
                                    <span class="label-text">Description</span>
                                    </div>
                                    <textarea placeholder="Description..." class="textarea w-[930px] h-[300px]" v-model="description"></textarea>
                                </label>
                            </div>
                        <button class="btn bg-success mt-10 w-[250px] text-white" @click="sendFeedback">Send Feedback</button>

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
const host = 'https://backendvanmangit-production.up.railway.app/'
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
                server_time: ''
            }
        },
        mounted() {
            this.getUser()
            setInterval(() => {
                this.get_datetimefromserver();
            }, 1000)
        },
        methods: {
            getUser(){
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