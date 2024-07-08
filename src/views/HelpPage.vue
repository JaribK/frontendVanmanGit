<script setup>
    import Navbar from "@/components/templates/Navbar.vue";
</script>
<template>
    <div>
        <div id="background" class="w-full h-lvh bg-white">
            <Navbar></Navbar>
                <div id="title" class="flex justify-center w-full py-10 animate-fade-up animate-once">
                    <div class="font-bold text-black text-[30px]">Help Foreach Page</div>
                </div>
                <div id="content" class="h-fit w-full bg-white flex justify-center py-10 animate-fade-up animate-once">
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
                                <p>เช่น วันนี้วันที่ 10 Sign แบบย้อนหลัง จะสามารถลงชื่อในวันที่ 9,8,7,6,... พอลงชื่อเสร็จจะติด status "Backdate"</p>
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
                            <div class="collapse collapse-arrow bg-base-200 mb-4 ">
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
                            <div class="collapse collapse-arrow bg-base-200 mb-4 ">
                                <input type="radio" name="my-accordion-2" /> 
                                <div class="collapse-title text-xl font-bold">
                                    Guide for Feedback to Dev Page (Click to open.)
                                </div>
                                <div class="collapse-content"> 
                                    <p>About this Page?</p>
                                    <p>จะเป็นหน้าสำหรับ user ทั่วไป</p>
                                    <p>ในหน้านี้ user สามารถส่ง feedback ถึง developer ได้ โดยกรอกข้อมูลให้ครบถ้วนและกดส่ง</p>
                                    <p>และในส่วนของ table ข้างล่างจะแสดงของ feedback ที user ส่งไปแต่ละอันว่ามีการตอบรับหรือแก้ไขแล้ว</p>
                                    <br>
                                </div>
                            </div>
                            <div v-if="user.is_superuser == true" class="collapse collapse-arrow bg-base-200 mb-4 ">
                              <input type="radio" name="my-accordion-2" /> 
                              <div class="collapse-title text-xl font-bold">
                                Guide for Dashboard Page (Click to open.)
                              </div>
                              <div class="collapse-content"> 
                                <p>About this Page?</p>
                                <p>จะเป็นหน้าสำหรับ superuser(admin) จะแสดงรายละเอียดต่างๆให้ได้เห็น</p>
                                <p>ไม่ว่าจะเป็น จำนวน users ที่ ออนไลน์, users ในระบบที่มีอยู่, เวลาของ server และ จำนวน request</p>
                                <p>ของการลงชื่อเข้าใช้งานและการขอลา</p>
                                <br>
                                <p class="font-bold">**user ต้องมี superuser จึงจะเห็น page นี้</p>
                              </div>
                            </div>
                            <div v-if="user.is_superuser == true || user.role == 'Web Developer Trainee'" class="collapse collapse-arrow bg-base-200 mb-4 ">
                              <input type="radio" name="my-accordion-2" /> 
                              <div class="collapse-title text-xl font-bold">
                                Guide for Feedback from User Page (Click to open.)
                              </div>
                              <div class="collapse-content"> 
                                <p>About this Page?</p>
                                <p>จะเป็นหน้าสำหรับ superuser(admin) และ Web developer Trainee </p>
                                <p>จะเป็นหน้าที่แสดง feedback ที่ได้จาก user และผู้ที่รับผิดชอบในหน้านี้จะต้องคอบรับผิดชอบตรวจเช็ค feedback จาก user</p>
                                <p>โดย การปรับ status ของแต่ละ feedback จะมี 3 status คือ Uncheck, Pending, Success</p>
                                <br>
                                <p class="font-bold">**user ต้องมี superuser หรือมี role เป็น Web developer Trainee จึงจะเห็น page นี้</p>
                              </div>
                            </div>
                            <div v-if="user.is_superuser == true" class="collapse collapse-arrow bg-base-200 mb-4 ">
                              <input type="radio" name="my-accordion-2" /> 
                              <div class="collapse-title text-xl font-bold">
                                Guide for Manage Attendance Page (Click to open.)
                              </div>
                              <div class="collapse-content"> 
                                <p>About this Page?</p>
                                <p>จะเป็นหน้าสำหรับ superuser(admin) ในการจัดการการลงชื่อเข้างานและลงชื่ออกงาน </p>
                                <p>จะเป็นหน้าที่แสดง request start work จาก user ผู้ดูแลมีส่วนที่ต้องอนุมัติการลงชื่อเข้าใช้งานในแต่ละวัน</p>
                                <p>โดย การปรับ status ของแต่ละ feedback จะมี 3 status คือ Rejected, Pending, Approved</p>
                                <br>
                                <p class="font-bold">**user ต้องมี superuser จึงจะเห็น page นี้</p>
                              </div>
                            </div>
                            <div v-if="user.is_superuser == true" class="collapse collapse-arrow bg-base-200 mb-4 ">
                              <input type="radio" name="my-accordion-2" /> 
                              <div class="collapse-title text-xl font-bold">
                                Guide for Manage Leave Request Page (Click to open.)
                              </div>
                              <div class="collapse-content"> 
                                <p>About this Page?</p>
                                <p>จะเป็นหน้าสำหรับ superuser(admin) ในการจัดการการลงชื่อลางาน</p>
                                <p>จะเป็นหน้าที่แสดงคำขอลา ที่ได้จาก user และผู้ที่รับผิดชอบในหน้านี้จะต้องคอบรับผิดชอบตรวจเช็ค request จาก user</p>
                                <p>โดย การปรับ status ของแต่ละ feedback จะมี 3 status คือ Rejected, Pending, Approved</p>
                                <br>
                                <p class="font-bold">**user ต้องมี superuser จึงจะเห็น page นี้</p>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contact" class="h-fit w-full bg-white flex flex-col justify-center py-10 animate-fade-up animate-once">
                    <div class="flex justify-center w-full py-10">
                        <div class="font-bold text-black text-[20px]">Ask for more information</div>
                    </div>
                    <div id="discord" class="w-full h-fit flex justify-center pb-10">
                        <iframe
                          src="https://discord.com/widget?id=1237246053099765812&theme=dark"
                          width="350"
                          height="250"
                          allowtransparency="true"
                          frameborder="0"
                          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
                        </iframe>
                    </div>
                    <div class="flex justify-center w-full">
                        <div class="w-[80%]">
                            <div class="text-black text-[16px] text-center">Email : k.yorinforwork@gmail.com
                                <br>Tel : 098-523-2540
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
let host = ''
    export default {
        name: 'HelpPage',
        data(){
            return{
                user: ''
            }
        },
        created() {
          host = this.$store.state.host
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
        }
        
    }
</script>