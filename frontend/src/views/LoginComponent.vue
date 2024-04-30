<template>
    <div class="relative min-h-screen flex items-center justify-center">
        <!-- Fondo con imagen y opacidad -->
        <div class="absolute inset-0 bg-cover bg-center"
            style="background-image: url('https://i.imgur.com/xHIWOer.png'); filter: brightness(80%);"></div>

        <!-- Contenedor principal -->
        <div class="z-10 max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden p-8">
            <h2 class="text-3xl font-semibold text-center text-red-600 py-6">Ingresar</h2>
            <form @submit.prevent="login" class="px-8 py-6">
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-gray-700">Usuario o correo electr&oacute;nico</label>
                    <input type="text" id="username" v-model="username" class="input-field"
                        placeholder="Enter your username or email" required />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" id="password" v-model="password" class="input-field"
                        placeholder="Enter your password" required />
                </div>
                <button type="submit" @onClick="Ingresar"
                    class="w-full py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">
                    Log in
                </button>
            </form>

            <!-- Enlace para redirigir al componente de registro -->
            <router-link to="/register" class="block text-center text-sm text-gray-600 mt-4 hover:text-gray-800">
                ¿No tienes cuenta? Regístrate aquí
            </router-link>
        </div>
    </div>
</template>

<script>
import Axios from '../main.ts';
export default {
    data() {
        return {
            username: '',
            password: '',
            error: false
        };
    },
    methods: {
        async login() {
            try{
                const request = await Axios.post('clientes/login',{
                    data: this.username,
                    password: this.password
                });      
                if(request.status !== 200){throw new Error ()}
                localStorage.setItem("token","Bearer: "+request.data.token);
                this.$router.push('/main');
            }catch(err){
                console.error('Error logging in:', err.message);
                return this.error = true;
            }
        }
    }
};
</script>

<style scoped>
.input-field {
    appearance: none;
    border: 1px solid #D1D5DB;
    border-radius: 0.375rem;
    padding: 0.75rem;
    width: 100%;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-field:focus {
    outline: none;
    border-color: #EF4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
}
</style>