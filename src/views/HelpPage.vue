<template>
    <div>
        <div id="background" class="w-full h-lvh bg-white">
            <div class="navbar bg-gray-800">
                <div class="flex-1 px-2 lg:flex-none">
                    <a class="text-lg font-bold text-white">Help</a>
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
                                    <li><router-link to="/profile">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                        </svg>
                                        Profile
                                    </router-link></li>
                                    <li v-if="user.is_superuser == true"><router-link to="/dashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16">
                                          <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                                          <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"/>
                                        </svg>
                                        Dashboard
                                    </router-link></li>
                                    <li><router-link to="/leave-req">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
                                          <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                        </svg>
                                        Leave Request
                                    </router-link></li>
                                    <li v-if="user.is_superuser == true"><router-link to="/approve-sw">
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
                                    <li class="bg-warning text-black  rounded"><router-link to="/help">
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
                <div id="title" class="flex justify-center w-full py-10">
                    <div class="font-bold text-black text-[30px]">Help Foreach Page</div>
                </div>
                <div id="content" class="h-fit w-full bg-white flex justify-center py-10">
                    <div id="listhelp" class="w-[80%] flex justify-center">
                        <div class="w-full h-full">
                            <div class="collapse collapse-arrow bg-base-200 mb-4">
                              <input type="radio" name="my-accordion-2"/> 
                              <div class="collapse-title text-xl font-bold">
                                Guide for HomePage (Click to open.)
                              </div>
                              <div class="collapse-content">
                                <p>What's Sign System?</p>
                                <p>มี 2 แบบคือ แบบปกติ(normal) และ ย้อนหลัง(backdate)</p>
                                <br>
                                <p>- ในส่วนของปุ่ม Sign แบบปกติ สามารถกดได้ 1 ครั้งต่อวัน จะไม่สามารถลงชื่อในวันหยุดตาม BOT ได้,ไม่สามารถลงชื่อล่วงหน้าได้ และจะมีให้ Sign TimeIn และ Sign TimeOut</p>
                                <p>Sign TimeIn -> จะสามารถลงชื่อได้ในช่วง 8.00 - 18.00 น. ของวันนั้นๆเท่านั้นที่ Sign แบบธรรมดา</p>
                                <p>Sign TimeOut -> จะสามารถลงชื่อได้ในช่วง 8.00 - 18.00 น. ของวันนั้นๆเท่านั้นที่ Sign แบบธรรมดา</p>
                                <br>
                                <p>- ในส่วนของปุ่ม Sign แบบย้อนหลัง สามารถกดได้หลายครั้งแต่ต้องเป็นวันที่นับตั้งแต่เมื่อวานเป็นต้นไป (เฉพาะผู้ที่ลงชื่อแบบธรรมดาไม่ทัน)</p>
                                <p>เช่น วันนี้วันที่ 10 Sign แบบย้vนหลัง จะสามารถลงชื่อในวันที่ 9,8,7,6,... พอลงชื่อเสร็จจะติด status "Backdate"</p>
                                <br>
                                <p class="font-bold">**Sign TimeIn & TimeOut ถ้าไม่ได้ SignTime จะมีค่าเริ่มต้นเป็น 00:00:00 ใน excel</p>
                                <p class="font-bold">**การลงชื่อทั้งสองแบบต้องได้รับการยืนยันจาก Admin ถึงจะสามารถได้รับค่าจ้าง.</p>
                                <br>
                                <p class="mb-4"><input type="button" value="Sign" class="mr-2 btn w-[300px] h-[50px] bg-[#3668A7] text-white rounded-[10px] cursor-pointer">นี่คือปุ่มลงชื่อแบบปกติ</p>
                                <p class="mb-4"><button type="button" class="btn bg-warning mr-2  w-[150px] h-[50px]  text-black rounded-[10px] cursor-pointer">Clear Input</button>นี่คือปุ่มเคลียร์ข้อมูลที่ใส่ไว้อยู่</p>
                                <p class="mb-4"><button type="button" class="btn w-[300px] mr-2  h-[50px] bg-gray-400 text-black rounded-[10px] cursor-pointer">Download my Attendance</button>นี่คือปุ่มดาวน์โหลดประวัติการณ์ลงชื่อของคุณทั้งหมด(ส่วนตัวของผู้ใช้)</p>
                                <p class="mb-4"><button type="button" class="btn bg-error w-[300px] mr-2 h-[50px]  text-white">Backdate Sign</button>นี่คือปุ่มลงชื่อแบบย้อนหลัง</p>
                                <p class="mb-4"><button type="button" class="btn bg-green-500 w-[150px] mr-2 h-[50px]  text-black rounded-[10px] cursor-pointer">Leave Request</button>ปุ่มนี่คือไปหน้า Leave Request</p>
                              </div>
                            </div>
                            <div class="collapse collapse-arrow bg-base-200 mb-4">
                              <input type="radio" name="my-accordion-2" /> 
                              <div class="collapse-title text-xl font-bold">
                                Guide for Leave Request Page (Click to open.)
                              </div>
                              <div class="collapse-content"> 
                                <p>How to Send Leave Request?</p>
                                <p>คุณจะต้องเลือกช่วงที่ต้องการลา(นับจากวันนี้ไปอย่างน้อย 15 วัน เช่น วันนี้วันที่ 1 หากต้องการจะลา ต้องลาช่วงตั้งแต่ 16 เป็นต้นไป)</p>
                                <p>และสามารถการจัดการเกี่ยวกับการ request (update request หรือ delete request ได้)</p>
                                <br>
                                <p class="font-bold">**และต้องได้รับการอนุมัติจาก Admin ก่อนถึงจะสามารถลาได้</p>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contact" class="h-fit w-full bg-white flex flex-col justify-center py-10">
                    <div class="flex justify-center w-full py-10">
                        <div class="font-bold text-black text-[20px]">Ask for more information</div>
                    </div>
                    <div class="flex justify-center w-full">
                        <div class="w-[80%]">
                            <div class="text-black text-[16px] text-center">Email : admin@admin.com
                                <br>Tel : 02-123-4567
                            </div>
                        </div>
                    </div>
                        
                </div>
        </div>
</div>
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'
const host = 'https://backendvanmangit-production.up.railway.app/'
    export default {
        name: 'HelpPage',
        data(){
            return{
                user: '',
                user_id: ''
            }
        },
        mounted() {
            this.getUser()
        },
        methods : {
            getUser() {
                const userjson = localStorage.getItem('user')
                const user_data = JSON.parse(userjson)
                this.user = user_data
                this.user_id = user_data.id
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
                    const Toast = swal.mixin({
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.onmouseenter = swal.stopTimer;
                        toast.onmouseleave = swal.resumeTimer;
                      }
                    });
                    Toast.fire({
                      icon: "success",
                      title: "Logged out successfully"
                    });
                    this.$router.push('/');
                }).catch((err) => {
                    console.log(err)
                })
            },
        }
        
    }
</script>