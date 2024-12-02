<template>
  <div class="flex flex-col w-16 bg-white text-gray-800 min-h-screen border-r border-gray-200">
    <!-- Logo -->
    <div class="flex items-center justify-center py-4">
      <img
        src="https://scontent.ftij6-1.fna.fbcdn.net/v/t39.30808-6/263088769_667740991276148_1685325883534833247_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHS_naGQgBoJ5nImkpcfA0xmbqqxKv-s0OZuqrEq_6zQwBW13rFRmR0S-flKAIMLjD6ILQ6fbRGr334rGen1QmZ&_nc_ohc=nywffPTvzJQQ7kNvgEZeb0e&_nc_zt=23&_nc_ht=scontent.ftij6-1.fna&_nc_gid=A6IfhxTeZXI_F6RBCiwbsx_&oh=00_AYCEcNQsc4oqCJLuz-WQd0gyAr-MnpkYAJ4BZKajA2isag&oe=6752DCEA"
        alt="Logo"
        class="w-8 h-8 rounded-full"
      />
    </div>

    <!-- Navegación -->
    <nav class="flex flex-col space-y-6 flex-1 py-4 items-center">
      <!-- Ruta Mesas -->
      <router-link
        to="/main"
        :class="[ 
          'flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100',
          $route.path === '/main' ? 'bg-gray-200' : ''
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-800"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 10.5h15m-15 3h15m-15 3h15m-15 0h15"
          />
        </svg>
      </router-link>

      <!-- Ruta Personal -->
      <router-link
        to="/meseros"
        :class="[ 
          'flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100',
          $route.path === '/meseros' ? 'bg-gray-200' : ''
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-800"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25M8.25 9V5.25m8.25 10.5V13.5m0 2.25v-4.5m3 4.5h-1.5m-12 0H5.25m13.5-4.5H5.25m2.25 0H8.25m-3 3h1.5"
          />
        </svg>
      </router-link>

      <!-- Ruta Lista de Espera -->
      
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  mounted() {
    // No es necesario verificar sesión, por lo que este método queda vacío
  },
  methods: {
    logout() {
      // Simplemente redirige al usuario a la página de inicio sin realizar ninguna acción adicional
      this.$router.push('/');
    },
  },
};
</script>


<style scoped>
.group:hover .group-hover\:bg-gray-100 {
  background-color: #f3f4f6;
}
.group:hover .group-hover\:text-gray-900 {
  color: #1f2937;
}
</style>
