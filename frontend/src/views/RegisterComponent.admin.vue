<template>
    <div class="relative min-h-screen flex items-center justify-center">
        <!-- Fondo con imagen y opacidad -->
        <div class="absolute inset-0 bg-cover bg-center"
            style="background-image: url('https://i.imgur.com/W2nDi4U.png'); filter: brightness(80%);"></div>

        <!-- Contenedor principal -->
        <div class="z-10 max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden p-8">
            <h2 class="text-3xl font-semibold text-center text-red-600 mb-6">Registro</h2>
            <form @submit.prevent="register" class="space-y-4">
                <!-- Campos de entrada -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="firstName" class="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" id="firstName" v-model="firstName" class="input-field" placeholder="Nombre"
                            required />
                    </div>
                    <div>
                        <label for="lastName" class="block text-sm font-medium text-gray-700">Apellido</label>
                        <input type="text" id="lastName" v-model="lastName" class="input-field" placeholder="Apellido"
                            required />
                    </div>
                </div>
                <div>
                    <label for="birthdate" class="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input type="date" id="birthdate" v-model="birthdate" class="input-field" required />
                </div>
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Usuario</label>
                    <input type="text" id="username" v-model="username" class="input-field" placeholder="Usuario"
                        required />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" id="password" v-model="password" class="input-field" placeholder="Contraseña"
                        required />
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar
                        Contraseña</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" class="input-field"
                        placeholder="Confirmar Contraseña" required />
                </div>
                <div>
                    <label for="role" class="block text-sm font-medium text-gray-700">Puesto</label>
                    <select id="role" v-model="role" class="input-field" required>
                        <option value="admin">Admin</option>
                        <option value="mesero">Mesero</option>
                        <option value="hostess">Hostess</option>
                    </select>
                </div>
                <div>
                    <label for="workSchedule" class="block text-sm font-medium text-gray-700">Horario Laboral</label>
                    <select id="workSchedule" v-model="workSchedule" class="input-field" required>
                        <option value="morning">Mañana (8am - 4pm)</option>
                        <option value="afternoon">Tarde (12pm - 8pm)</option>
                        <option value="evening">Noche (4pm - 12am)</option>
                    </select>
                </div>
                <!-- Botón de registro -->
                <button type="submit"
                    class="w-full py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">
                    Registrar
                </button>

                <!-- Enlace a la página de inicio de sesión -->
                <router-link to="/" class="block text-center text-sm text-gray-600 mt-4 hover:text-gray-800">
                    ¿Ya tienes cuenta? Iniciar sesión
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import Axios from '../main.ts'
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            birthdate: '',
            username: '',
            password: '',
            confirmPassword: '',
            role: 'mesero', // Valor predeterminado: mesero
            workSchedule: 'morning' // Valor predeterminado: mañana
        };
    },
    methods: {
        async register() {
            // Aquí puedes implementar la lógica para registrar al usuario
            console.log('Nombre:', this.firstName);
            console.log('Apellido:', this.lastName);
            console.log('Fecha de Nacimiento:', this.birthdate);
            console.log('Usuario:', this.username);
            console.log('Contraseña:', this.password);
            console.log('Puesto:', this.role);
            console.log('Horario Laboral:', this.workSchedule);
            const request = await Axios.post("clientes/register",{
                name: this.firstName +" "+this.lastName,
                birthdate: this.birthdate,
                username: this.username,
                
            })

            // Por ejemplo, puedes enviar una solicitud HTTP para guardar los datos del usuario en la base de datos

            // Redirigir al usuario a la página de inicio de sesión después del registro (opcional)
            this.$router.push('/login');
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