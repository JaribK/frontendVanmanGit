<template>
    <div>
        <div id="background" class="h-dvh w-full bg-blue-950 flex justify-center items-center">
            <div id="box" class="w-[400px] h-[600px] bg-white rounded-[28px] items-center" >
                <div id="title" class="text-black font-bold w-full text-center my-[16px] text-[30px]">Sign up</div>
                <div id="from" class="w-full">
                    <form @submit.prevent="register" class="px-[40px]" >
                        <input type="text" v-model="username" name="username" id="username" placeholder="Username" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input type="email" v-model="email" name="email" id="email" placeholder="Email" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input type="text" v-model="firstname" name="firstname" id="firstname" placeholder="First Name" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input type="text" v-model="lastname" name="lastname" id="lastname" placeholder="Last Name" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input type="password" v-model="password" name="password" id="password" placeholder="Password" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white  text-black" required>
                        <input type="password" v-model="password_confirmation" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white  text-black" required>
                        <button type="submit" value="Register" class="btn w-full h-[50px] bg-[#3668A7] text-white rounded-[10px] my-[32px] cursor-pointer">Sign up</button>
                    </form>
                    <div id="sign-up">
                        <p class="text-black
                        text-center">Don you have an account? <router-link to="/" class="text-[#3668A7]">Sign in</router-link></p>
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
                password: '',
                email: '',
                password_confirmation: '',
                firstname: '',
                lastname: ''
            }
        },
        methods : {
            async register(){
                try {
                    if (this.password != this.password_confirmation) {
                        swal.fire({
                            title: 'Error',
                            text: 'Password and Confirm Password must be the same',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    } else {
                        await axios.post('https://backendvanmangit-production.up.railway.app/api/register', {
                            username: this.username,
                            email: this.email,
                            password: this.password,
                            first_name: this.firstname,
                            last_name: this.lastname
                        })
                        .then((response) => {
                            console.log(response.status)
                            if (response.status == 400) {
                                alert('Username or Password is incorrect')
                            } else {
                                swal.fire({
                                    title: 'Success',
                                    text: 'Register Success',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                })
                                this.$router.push('/')
                            }
                        })
                    }
                } catch (error) {
                    console.error(error);
            }
    
        }
    }
    }
</script>
