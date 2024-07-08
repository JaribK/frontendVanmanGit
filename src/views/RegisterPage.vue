<template>
    <div>
        <div id="background" class="h-dvh w-full bg-blue-950 flex justify-center items-center">
            <div id="box" class="w-[400px] h-fit bg-white rounded-[28px] items-center animate-fade-left animate-once" >
                <div id="title" class="text-black font-bold w-full text-center my-[16px] text-[30px]">Sign up</div>
                <div id="from" class="w-full">
                    <form @submit.prevent="register" class="px-[40px]" >
                        <input maxlength="50" type="text" v-model="username" name="username" id="username" placeholder="Username" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input maxlength="50" type="email" v-model="email" name="email" id="email" placeholder="Email" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input maxlength="50" type="text" v-model="firstname" name="firstname" id="firstname" placeholder="First Name" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input maxlength="50" type="text" v-model="lastname" name="lastname" id="lastname" placeholder="Last Name" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                        <input maxlength="50" type="password" v-model="password" name="password" id="password" placeholder="Password" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white  text-black" required>
                        <input maxlength="50" type="password" v-model="password_confirmation" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" class="input input-primary w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white  text-black" required>
                        <select v-model="role" name="role" id="role" class="select select-bordered w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                            <option value="" disabled selected>Select Role</option>
                            <option value="System Engineer Trainee">System Engineer Trainee</option>
                            <option value="IT specialist Trainee">IT specialist Trainee</option>
                            <option value="Web Designer Trainee">Web Designer Trainee</option>
                            <option value="Programmer Trainee">Programmer Trainee</option>
                            <option value="Web Developer Trainee">Web Developer Trainee</option>
                            <option value="Marketing Trainee">Marketing Trainee</option>
                            <option value="HR Trainee">HR Trainee</option>
                            <option value="Recruitment Trainee">Recruitment Trainee</option>
                            <option value="Admin Trainee">Admin Trainee</option>
                            <option value="Management Trainee">Management Trainee</option>
                            <option value="Sales Trainee">Sales Trainee</option>
                            <option value="Translator Trainee">Translator Trainee</option>
                            <option value="Accountant Trainee">Accountant Trainee</option>
                            <option value="Secretary Trainee">Secretary Trainee</option>
                        </select>
                        <select name="supervisor" id="supervisor" v-model="supervisor" class="select select-bordered w-full h-[40px] border-[1px] border-blue-950 rounded-[10px] px-4 my-2 bg-white text-black" required>
                            <option value="" disabled selected>Select Supervisor</option>
                            <option v-for="user in superusersList" :key="user.id" :value="user.id">
                                {{user.username}}
                            </option>
                        </select>
                        <button type="submit" value="Register" class="btn w-full h-[50px] bg-[#3668A7] text-white rounded-[10px] my-[32px] cursor-pointer">Sign up</button>
                    </form>
                    <div id="sign-up">
                        <p class="text-black pb-4 text-center">Don you have an account? <router-link to="/" class="text-[#3668A7]">Sign in</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import swal from 'sweetalert2'
    let host = ''

    export default {
        name: 'LoginPage',
        data(){
            return{
                username: '',
                password: '',
                email: '',
                password_confirmation: '',
                firstname: '',
                lastname: '',
                role: '',
                supervisor: '',
                superusersList: []
            }
        },
        created(){
            host = this.$store.state.host
            this.checkUserlogin()
        },
        mounted(){
            this.getUsers()
        },
        methods : {
            checkUserlogin(){
                if(localStorage.getItem('token')){
                    this.$router.push('/home')
                }
            },
            getUsers(){
                axios.get(host + 'users/')
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].is_superuser == true) {
                            this.superusersList.push(response.data[i])
                        }
                    }
                })
            },
            async register(){
                try {
                    if (this.password != this.password_confirmation) {
                        swal.fire({
                            title: 'Warning',
                            text: 'Password and Confirm Password must be the same',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else if (this.password.length < 8) {
                        swal.fire({
                            title: 'Warning',
                            text: 'The length of password must be more than 8 digits',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else if (this.username.length < 6) {
                        swal.fire({
                            title: 'Warning',
                            text: 'The length of username must be more than 6 digits',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/)) {
                        swal.fire({
                            title: 'Warning',
                            text: 'Password must contain at least 1 capital letter, 1 small letter, 1 number, and 1 special character',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            footer: 'Special letter : @ $ ! % * ? & _ -'
                        });
                    } else {
                        // Rest of the code remains the same
                        await axios.post(host + 'api/register', {
                            username: this.username,
                            email: this.email,
                            password: this.password,
                            first_name: this.firstname,
                            last_name: this.lastname,
                            role: this.role,
                            supervisor: this.supervisor
                        })
                        .then((response) => {
                                swal.fire({
                                    title: 'Success',
                                    text: 'Register Success',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                });
                                this.$router.push('/');
                        });
                    }
                } catch (error) {
                    console.log(error)
                    if (error.response.status == 409){
                        swal.fire({
                            title: 'Error',
                            text: error.response.data.error,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else if (error.response.status == 400) {
                        swal.fire({
                            title: 'Error',
                            text: 'Please fill in all fields',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }
            }
        }
    }
</script>
