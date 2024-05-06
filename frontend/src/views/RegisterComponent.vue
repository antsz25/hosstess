<template>
    <div class="relative min-h-screen flex items-center justify-center">
        <!-- Fondo con imagen y opacidad -->
        <div class="absolute inset-0 bg-cover bg-center"
            style="background-image: url('https://i.imgur.com/xHIWOer.png'); filter: brightness(80%);"></div>

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
                    <label for="cellphone" class="block text-sm font-medium text-gray-700">N&uacute;mero Telef&oacute;nico</label>
                    <input type="text" id="cellphone" v-model="cellphone" maxlength="14" placeholder="(xxx)-xxx-xxxx" class="input-field"
                    :on-change="validateNum" required />         
                    <label v-if="formatCellphoneError" for="cellphone" class="block text-sm font-medium text-red-700">Formato de n&uacute;mero incorrecto</label>
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
                    <label for="email" class="block text-sm font-medium text-gray-700">Correo Electr&oacute;nico</label>
                    <input type="text" id="email" v-model="email" class="input-field" placeholder="Correo Electr&oacute;nico"
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
                    <label v-if="differentsPassword" for="cellphone" class="block text-sm font-medium text-red-700">Las contraseñas no coinciden</label>
                </div>
                <div>
                    <label for="role" class="block text-sm font-medium text-gray-700">Puesto</label>
                    <select id="role" v-model="role" class="input-field" required>
                        <option value="waiter">Mesero</option>
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
                <router-link v-if="confirmRequest" to="/" class="block text-center text-base text-green-700 underline mt-4 hover:text-gray-800">
                    Registro exitoso. Da clic aqu&iacute; para iniciar sesi&oacute;n
                </router-link>
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
            cellphone: '',
            username: '',
            email: '',
            password: '',
            formatCellphoneError: false,
            confirmPassword: '',
            differentsPassword: false,
            confirmRequest: false,
            role: 'waiter', // Valor predeterminado: mesero
            workSchedule: 'morning' // Valor predeterminado: mañana
        };
    },
    computed:{
        validateNum(){
            let num = this.cellphone;
            let regex = /\D/i;
            num = num.replace(/\-/g,"");
            num = num.replace(/\(/g,"");
            num = num.replace(/\)/g,"");
            num = num.replace(/\s/g,"")
            if(regex.test(num)){
                this.formatCellphoneError = true;
            }else{
                this.formatCellphoneError = false;
                if(num.length == 10){
                    let newNum = "("+num.substring(0,3)+")-"+num.substring(3,6)+"-"+num.substring(6,10);
                    this.cellphone = newNum;
                }
            }
        }
    },
    methods: {
        async register() {
            try{
                if(this.formatCellphoneError){
                    let input = document.getElementById("cellphone");
                    input.focus();
                    return;
                }
                if(this.password != this.confirmPassword){
                    let input = document.getElementById("confirmPassword");
                    this.differentsPassword = true;
                    input.focus();
                    return;
                }
                let num = this.cellphone;
                num = num.replace(/\-/g,"");
                num = num.replace(/\(/g,"");
                num = num.replace(/\)/g,"");
                num = num.replace(/\s/g,"")
                if(num.length != 10){
                    let input = document.getElementById("cellphone");
                    input.focus();
                    this.formatCellphoneError = true;
                    return;
                }
                const request = await Axios.post("usuarios/register",{
                    name: this.firstName,
                    lastName: this.lastName,
                    birthDate: this.birthdate,
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    cellphone: num,
                })
                if(request.status == 201){
                    this.confirmRequest = true;
                }
                else{
                    throw new Error("Error al registrar: ", request.data.message);
                }
            }catch(error){
                console.log(error);
            }
            // Por ejemplo, puedes enviar una solicitud HTTP para guardar los datos del usuario en la base de datos

            // Redirigir al usuario a la página de inicio de sesión después del registro (opcional)
            /*this.$router.push('/login');*/
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