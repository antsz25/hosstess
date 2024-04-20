<template>
    <div class="sidebar">
      <nav class="flex flex-col items-center justify-between h-full">
        <!-- Título del restaurante -->
        <h1 class="text-white font-bold text-2xl mt-8 mb-6">Hostess</h1>
        <!-- Opciones de navegación -->
        <ul class="text-white text-lg">
          <li class="mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 1118 0 9 9 0 01-18 0z" clip-rule="evenodd" />
            </svg>
            <a href="#" class="hover:text-gray-200">Inicio</a>
          </li>
          <li class="mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 1118 0 9 9 0 01-18 0z" clip-rule="evenodd" />
            </svg>
            <a href="#" class="hover:text-gray-200">Staff</a>
          </li>
          <li class="mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 1118 0 9 9 0 01-18 0z" clip-rule="evenodd" />
            </svg>
            <a href="#" class="hover:text-gray-200">Mesas</a>
          </li>
          <li class="mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 1118 0 9 9 0 01-18 0z" clip-rule="evenodd" />
            </svg>
            <a href="#" class="hover:text-gray-200">Lista de Espera</a>
          </li>
        </ul>
        <!-- Botón de logout -->
        <button class="text-white hover:text-gray-200 mt-auto mb-8">Logout</button>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar'
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 220px;
    background-color: #EF4444; /* Color rojo */
  }
  
  .sidebar nav ul li {
    transition: all 0.3s ease-in-out;
  }
  
  .sidebar nav ul li:hover {
    transform: translateX(4px);
  }
  </style>
  