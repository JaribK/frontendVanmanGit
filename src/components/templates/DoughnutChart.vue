<template>
  <div class="w-full h-dvh flex justify-center align-middle">
    <div v-if="loading" class="flex justify-start flex-col items-center">
      <span class="loading loading-spinner loading-lg bg-black"></span>
      <p class="text-black pt-10 flex justify-center">loading data.</p>
      <span class="loading loading-dots loading-lg items-center flex-row bg-black"></span>
    </div>
    <div v-else class="flex flex-col w-full h-[500px] items-center">
      <Doughnut
        v-if="loaded"
        :options="chartOptions"
        :data="chartData"
      />
      <br>
      <div class="flex justify-center w-full pt-4 animate-fade-up">
        <h3 v-if="userattendance.work_days < 2" class="mr-4 text-black font-bold">Work Days: {{ userattendance.work_days }} Day ({{ formattedWorkPercentage }}%)</h3>
        <h3 v-else class="mr-4 text-black font-bold">Work Days: {{ userattendance.work_days }} Days ({{ formattedWorkPercentage }}%)</h3>
        <h3 v-if="userattendance.absent_days < 2" class="mr-4 text-black font-bold">Absent/Rejected Sign Day: {{ userattendance.absent_days }} Day ({{ formattedAbsentPercentage }}%)</h3>
        <h3 v-else class="mr-4 text-black font-bold">Absent/Rejected Sign Days: {{ userattendance.absent_days }} Days ({{ formattedAbsentPercentage }}%)</h3>
        <h3 v-if="userattendance.wait_days < 2" class="mr-4 text-black font-bold"> Pending approval : {{ userattendance.wait_days }} Day ({{ formattedPendingPercentage }}%)</h3>
        <h3 v-else class="mr-4 text-black font-bold"> Pending approval : {{ userattendance.wait_days }} Days ({{ formattedPendingPercentage }}%)</h3>
      </div>
      <br>
      <div class="flex justify-center w-full pt-4 animate-fade-up">
        <h3 v-if="total_days < 2" class="text-black font-bold text-center mr-4">Total Days : {{ userattendance.total_days }} Day</h3>
        <h3 v-else class="text-black font-bold text-center mr-4">Total Days : {{ userattendance.total_days }} Days</h3>
        <h3 class="text-black font-bold text-center">Total Wages for Intern : {{ userattendance.total_wages_user }} Baht</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { Doughnut } from 'vue-chartjs'
import axios from 'axios'
import swal from 'sweetalert2'
import { Chart as ChartJS, Title, Tooltip, Legend, DoughnutController, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, DoughnutController, ArcElement)

export default defineComponent({
  name: 'DoughnutChart',
  components: { Doughnut },
  data() {
    return {
      loading: true,
      loaded: false,
      userattendance: '',
      timesheetList: [],
      chartData: {
        labels: ['Absent/Rejected Sign' , 'Work' , 'Pending approval'],
        datasets: [
          {
            data: ['', '', ''],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFBE00'], // Custom colors
            borderColor: ['#000', '#000', '#000'], // Optional: Custom border colors
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    }
  },
  computed:{
    formattedAbsentPercentage() {
      return this.userattendance.absent_percentage.toFixed(2)
    },
    formattedWorkPercentage() {
      return this.userattendance.work_percentage.toFixed(2)
    },
    formattedPendingPercentage() {
      return this.userattendance.wait_percentage.toFixed(2)
    }
  },
  created() {
    this.host = this.$store.state.host
  },
  mounted() {
      this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get(`${this.host}attendance-summary/${this.$route.params.id}/`)
        .then(res => {

          this.userattendance = res.data
          this.chartData.datasets[0].data = [this.userattendance.absent_percentage, this.userattendance.work_percentage, this.userattendance.wait_percentage]
          this.loaded = true
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          swal.fire({
            title: 'Error',
            text: err,
            icon: 'error',
            confirmButtonText: 'OK',
          })
        })
    },
  }
})
</script>