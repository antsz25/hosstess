<template>
  <div class="sidebar flex flex-col mx-auto items-center justify-between bg-red-600 w-full text-white min-h-screen">
    <nav class="fixed flex flex-col h-full py-8">
      <!-- Logo del restaurante -->
      <h1 class="flex items-center mb-8">
        <img src="https://i.imgur.com/xHIWOer.png" alt="Logo" class="w-12 h-12 rounded-full mr-3">
        <span class="font-bold text-2xl">Hostess</span>
      </h1>

      <!-- Opciones de navegación -->
      <ul class="text-lg flex-grow">
        <li>
          <router-link to="/main" class="sidebar-link">Inicio</router-link>
        </li>
        <li>
          <router-link to="/meseros" class="sidebar-link">Personal</router-link>
        </li>
        <li>
          <router-link to="/waitlist" class="sidebar-link">Lista de Espera</router-link>
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
  async mounted(){
    const session = await CheckSession();
    if(!session){
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
  width: 220px; /* Ancho de la barra lateral */
}

.sidebar-link {
  transition: transform 0.3s ease; /* Transición al hacer hover sobre los enlaces */
  padding: 8px 12px; /* Espaciado interno de los enlaces */
  display: block; /* Hacer que los enlaces ocupen todo el ancho disponible */
  text-align: center; /* Alinear el texto al centro */
}

.sidebar-link:hover {
  transform: translateX(4px); /* Efecto de desplazamiento al hacer hover */
}

button {
  width: 160px; /* Ancho del botón */
  text-align: center; /* Alinear el texto del botón al centro */
}
</style>
