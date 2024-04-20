<template>
    <div class="w-1/6 bg-gray-200 p-4">
      <h2 class="text-lg font-semibold mb-4">Detalles de la Mesa</h2>
      <div v-if="mesaSeleccionada" class="p-4 bg-white rounded-lg mb-4">
        <h3 class="font-semibold">{{ mesaSeleccionada.nombre }}</h3>
        <!-- Aquí puedes mostrar los detalles de la mesa seleccionada, como la cuenta, los pedidos realizados, etc. -->
      </div>
      <div v-else class="p-4 bg-white rounded-lg mb-4">
        <p class="text-gray-600">Selecciona una mesa para ver los detalles.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetallesMesa',
    props: {
      mesaSeleccionada: {
        type: Object,
        default: null
      }
    }
  }
  </script>
  