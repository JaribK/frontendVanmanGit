<script setup>
    import DoughnutChart from '@/components/templates/DoughnutChart.vue'
    import Navbar from '@/components/templates/Navbar.vue';
</script>
<template>
    <div>
      <div id="background" class="w-full h-fit bg-white">
        <Navbar/>
        <div id="backtodashboard">
          <router-link to="/dashboard" class="text-black text-[20px] font-bold flex justify-center py-4">
              <button class="btn btn-circle btn-outline bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </button>
          </router-link>

        </div>
        <div class="animate-fade-up">
          <h1 class="text-black text-[30px] py-[32px] font-bold text-center">Attendance Details of {{ getfullname }}</h1>
        <div class="animate-fade-up">
            <DoughnutChart/>
        </div>
      </div>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios'
let host = ''
    export default {
        name: 'GraphViewsOfAttendancePage',
        data() {
            return {
                user: '',
                user_id: '',
                usersList: [],
                firstandlastname: ''
            }
        },
        computed: {
            getfullname(){
                let user = this.usersList.find(user => user.id == this.$route.params.id)
                if(user){
                    this.firstandlastname = user.first_name + ' ' + user.last_name
                }
                return this.firstandlastname 
            }
        },
        created() {
            host = this.$store.state.host
        },
        mounted() {
            this.getUsers()
        },
        methods: {
            getUsers(){
                axios.get(`${host}users/`)
                .then((response) => {
                    this.usersList = response.data
                })
            },
        },

  }
</script>
  