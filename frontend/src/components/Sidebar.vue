<template>
  <div class="sidebar flex flex-col mx-auto items-center justify-between bg-red-600 w-full text-white min-h-screen">
    <nav class="fixed flex flex-col h-full py-8">
      <!-- Logo del restaurante -->
      <h1 class="flex items-center mb-8">
        <img src="https://i.imgur.com/xHIWOer.png" alt="Logo" class="w-12 h-12 rounded-full mr-3">
        <span class="font-bold text-2xl">Hostess</span>
      </h1>

      <!-- Opciones de navegación -->
      <ul class="text-lg flex-grow flex flex-col">
        <li class="flex items-center">
          <router-link to="/main" class="sidebar-link flex items-center space-x-2">
            <span>Mesas</span>
            <svg class="w-6 h-6" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.00 512.00" xml:space="preserve" stroke="#ffffff"><path d="M389.565,155.826h-50.087v-36.263c19.433-6.892,33.391-25.45,33.391-47.215V38.957c0-9.22-7.475-16.696-16.696-16.696h-66.783c-9.22,0-16.696,7.475-16.696,16.696v33.391c0,21.766,13.959,40.323,33.391,47.215v36.263c-10.637,0-89.859,0-100.174,0v-36.263c19.433-6.892,33.391-25.45,33.391-47.215V38.957c0-9.22-7.475-16.696-16.696-16.696h-66.783c-9.22,0-16.696,7.475-16.696,16.696v33.391c0,21.766,13.959,40.323,33.391,47.215v36.263h-50.087c-27.618,0-50.087,22.469-50.087,50.087v33.391c0,9.22,7.475,16.696,16.696,16.696h68.977l17.305,25.956c6.605,9.907,21.183,9.899,27.784,0L220.414,256h18.891v200.348h-50.087c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h133.565c9.22,0,16.696-7.475,16.696-16.696s-7.475-16.696-16.696-16.696h-50.087V256h150.261c9.22,0,16.696-7.475,16.696-16.696v-33.391C439.652,178.295,417.183,155.826,389.565,155.826z M172.522,55.652h33.391v16.696c0,9.206-7.49,16.696-16.696,16.696s-16.696-7.49-16.696-16.696V55.652z M105.739,222.609v-16.696c0-6.438,3.667-12.024,9.018-14.81l21.003,31.506H105.739z M189.217,242.597c-3.407-5.11-31.16-46.739-35.586-53.379h71.172C220.381,195.851,192.622,237.489,189.217,242.597z M306.087,55.652h33.391v16.696c0,9.206-7.49,16.696-16.696,16.696c-9.206,0-16.696-7.49-16.696-16.696V55.652z M406.261,222.609H242.675l22.26-33.391h124.631c9.206,0,16.696,7.49,16.696,16.696V222.609z"/></svg>
          </router-link>
        </li>
        <li class="flex items-center">
          <router-link to="/meseros" class="sidebar-link flex items-center space-x-2">
            <span>Personal</span>
            <svg class="w-6 h-6" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve" stroke="#ffffff"><circle cx="327.476" cy="42.141" r="42.141"></circle><path d="M373.647,301.495h-37.297c-1.34,0-2.636-0.185-3.88-0.499V487.6c0,13.475,10.924,24.4,24.4,24.4 c13.475,0,24.4-10.924,24.4-24.4V299.538C379.006,300.783,376.409,301.495,373.647,301.495z"/><path d="M430.003,145.591c-0.132-26.4-21.717-47.877-48.117-47.877c-12.094,0-90.329,0-101.605,0 c-14.602,0-28.237,6.516-37.411,17.877l-36.494,45.198h-33.592c1.64-1.302,2.694-3.309,2.694-5.567v-5.037 c22.407-3.812,37.931-12.061,37.931-21.628c0-0.574-0.071-1.141-0.199-1.703c-0.249-1.1-2.105-1.927-4.32-1.927H86.179 c-2.207,0-4.067,0.826-4.319,1.922c-0.13,0.563-0.204,1.133-0.204,1.708c0,9.565,15.525,17.815,37.931,21.628v5.037 c0,3.927,3.184,7.111,7.111,7.111h5.411c-7.373,3.052-12.563,10.311-12.563,18.788c0,11.23,9.103,20.333,20.333,20.333h76.214 c6.145,0,11.96-2.779,15.82-7.56l41.214-51.044l0.009,344.749c0,13.475,10.924,24.4,24.4,24.4c13.475,0,24.4-10.924,24.4-24.4 l0.023-229.7c-14.235-2.924-27.145-14.637-28.998-29.859c-2.205-18.114,11.427-34.659,28.998-38.252v-4.379 c0-8.054,6.032-14.832,14.033-15.765l35.817-4.351c3.135-0.365,6.252,0.214,9.019,1.618V145.73c0-2.35,1.904-4.254,4.254-4.255 c2.35,0,4.255,1.904,4.255,4.253c0,0.022,0,0.044,0,0.066v89.817l23.132-1.635c10.243-1.246,17.927-9.968,17.876-20.286 C430.3,204.536,430.049,154.621,430.003,145.591z"/><path d="M307.293,226.296c0.954,7.837,7.733,14.077,14.666,16.626v-38.157C313.291,207.94,306.13,216.738,307.293,226.296z"/></svg>
          </router-link>
        </li>
        <li class="flex items-center">
          <router-link to="/waitlist" class="sidebar-link flex items-center space-x-2">
            <span>Lista de Espera</span>
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><path d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </router-link>
        </li>
      </ul>

      <!-- Botón de logout -->
      <button @click="logout" class="hover:text-gray-200 mt-auto mb-4 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none">Cerrar sesión</button>
    </nav>
  </div>
</template>

<script>
import { CheckSession } from '../main';
export default {
  name: 'Sidebar',
  async mounted() {
    const session = await CheckSession();
    if (!session) {
      this.$router.push('/');
    }
  },
  methods: {
    logout() {
      //Elimina la sesion del usuario
      localStorage.removeItem('token');
      //Redirige al usuario a la pagina de inicio
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  /* Ancho de la barra lateral */
}

.sidebar-link {
  transition: transform 0.3s ease;
  /* Transición al hacer hover sobre los enlaces */
  padding: 8px 12px;
  /* Espaciado interno de los enlaces */
  display: block;
  /* Hacer que los enlaces ocupen todo el ancho disponible */
  text-align: center;
  /* Alinear el texto al centro */
}

.sidebar-link:hover {
  transform: translateX(4px);
  /* Efecto de desplazamiento al hacer hover */
}

button {
  width: 160px;
  /* Ancho del botón */
  text-align: center;
  /* Alinear el texto del botón al centro */
}
</style>
