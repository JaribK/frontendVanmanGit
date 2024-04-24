<template>
    <div>
        <div id="background" class="h-dvh w-full bg-blue-950 flex justify-center items-center">
            <div id="box" class="w-[400px] h-[600px] bg-white rounded-[28px] items-center" >
                <div id="title" class="text-black font-bold w-full text-center my-[64px] text-[30px]">VANMAN <br> Sign for work</div>
                <div id="from" class="w-full">
                    <form @submit.prevent="login" class="px-[40px]" >
                        <input type="text" v-model="username" name="username" id="username" placeholder="Username" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input type="password" v-model="password" name="password" id="password" placeholder="Password" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white  text-black" required>
                        <button type="submit" value="Login" class="btn w-full h-[50px] bg-[#3668A7] text-white rounded-[10px] my-[32px] cursor-pointer">Login</button>
                    </form>
                    <div id="sign-up">
                        <p class="text-black text-center">Don't have an account? <router-link to="/register" class="text-[#3668A7]">Sign Up</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import swal from 'sweetalert2'

    export default {
        name: 'LoginPage',
        data(){
            return{
                username: '',
                password: ''
            }
        },
        created(){
            this.checkUserlogin()
        },
        methods : {
        checkUserlogin(){
            if(localStorage.getItem('token')){
                this.$router.push('/home')
            }
        },
        async login() {
            try {
                const response = await axios.post('https://backendvanmangit-production.up.railway.app/api/login', {
                    username: this.username,
                    password: this.password
                });
                    const user = JSON.stringify(response.data.user);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', user);
                    swal.fire({
                        title: 'Success',
                        text: 'Login Success',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        footer: 'If you have any questions about how to use the system,<br>please click on the Menu at the top right and select <router-link to="/help" class="text-[#3668A7]">Need help?</router-link>'
                    });
                    this.$router.push('/home');
                } catch (error) {
                    if (error.response.status === 400) {
                        swal.fire({
                            title: 'Warning',
                            text: 'Username or Password is incorrect',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                        });
                    } else if (error.response.status === 409) {
                        swal.fire({
                            title: 'Warning',
                            text: 'another user is logged in now, please try again later',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        swal.fire({
                            title: 'Warning',
                            text: 'Something went wrong',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                        });
                    }
                }
            }
        }
    }
</script>
