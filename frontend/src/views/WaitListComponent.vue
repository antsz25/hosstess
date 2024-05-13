<template>
    <div class="flex h-screen">
      <!-- Navbar -->
      <Navbar />
      <!-- Contenedor principal -->
      <div class="flex-grow p-4 relative bg-cover bg-center"
        style="background-image: url('https://i.imgur.com/xHIWOer.png');">
        <div class="absolute inset-0 bg-black opacity-75" @click="cerrarListaEspera"></div>
        <h2 class="text-2xl font-semibold mb-4 z-10 relative text-red-500">Lista de Espera</h2>
  
        <!-- Botón para agregar nuevo cliente -->
        <button @click="mostrarModalAgregarCliente"
          class="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 2a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H4a1 1 0 1 1 0-2h6V3a1 1 0 0 1 1-1z"
              clip-rule="evenodd" />
          </svg>
        </button>
  
        <!-- Visualización de clientes en lista de espera -->
        <div class="grid grid-cols-3 gap-4 z-10 relative">
          <div v-for="cliente in clientesEnEspera" :key="cliente.id">
            <div class="relative">
              <div @click="mostrarModalOpciones(cliente)"
                class="cursor-pointer p-6 rounded-lg shadow-md border border-gray-300 bg-white">
                <h3 class="font-semibold text-lg text-red-500">{{ cliente.nombre }}</h3>
                <p class="mt-2 text-base text-gray-700">Número en lista: {{ cliente.numero }}</p>
                <p class="mt-1 text-base text-gray-700">Tiempo en espera: {{ cliente.tiempoEspera }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Modal para agregar nuevo cliente -->
        <div v-if="modalAgregarCliente" class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-8">
            <h3 class="text-lg font-semibold mb-4">Agregar Nuevo Cliente</h3>
            <input v-model="nombreNuevoCliente" type="text" class="w-full mb-2 px-3 py-2 border rounded-md"
              placeholder="Nombre del cliente">
            <input v-model="telefonoNuevoCliente" type="text" class="w-full mb-2 px-3 py-2 border rounded-md"
              placeholder="Teléfono del cliente">
            <div class="flex justify-between">
              <button @click="agregarCliente"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Agregar</button>
              <button @click="cerrarModalAgregarCliente"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancelar</button>
            </div>
          </div>
        </div>
  
        <!-- Modal para opciones de cliente -->
        <div v-if="modalOpcionesCliente" class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-8">
            <h3 class="text-lg font-semibold mb-4">Opciones de Cliente</h3>
            <p class="text-gray-700 mb-4">Selecciona una opción para el cliente <strong>{{ clienteSeleccionado.nombre }}</strong>:</p>
            <div class="flex justify-between">
              <button @click="mostrarModalAsignarMesa"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Asignar Mesa</button>
              <button @click="eliminarClienteEnEspera(clienteSeleccionado)"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Eliminar Cliente</button>
              <button @click="cerrarModalOpcionesCliente"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancelar</button>
            </div>
          </div>
        </div>
  
        <!-- Modal para asignar mesa -->
        <div v-if="modalAsignarMesa" class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-8">
            <h3 class="text-lg font-semibold mb-4">Asignar Mesa</h3>
            <p class="text-gray-700 mb-4">Selecciona una mesa para asignar al cliente:</p>
            <select v-model="mesaSeleccionada" class="w-full mb-2 px-3 py-2 border rounded-md">
              <option v-for="mesa in mesasDisponibles" :key="mesa.id" :value="mesa.id">
                {{ mesa.nombre }} (Capacidad: {{ mesa.capacidad }})
              </option>
            </select>
            <div class="flex justify-between">
              <button @click="asignarMesaACliente"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Asignar</button>
              <button @click="cerrarModalAsignarMesa"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancelar</button>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import Navbar from '../components/Sidebar.vue';
  import { ref } from 'vue';
  import Axios from '../main.ts';

  const clientesEnEspera = ref([]);
  const modalAgregarCliente = ref(false);
  const nombreNuevoCliente = ref('');
  const telefonoNuevoCliente = ref('');
  const modalOpcionesCliente = ref(false);
  const modalAsignarMesa = ref(false);
  const clienteSeleccionado = ref(null);
  const mesaSeleccionada = ref(null);
  const mesasDisponibles = ref([]);
  
  function cerrarListaEspera() {
    // Lógica para cerrar la lista de espera y limpiar estados si es necesario
  }
  
  function mostrarModalAgregarCliente() {
    cerrarModales(); // Cerrar otros modales antes de abrir este
    modalAgregarCliente.value = true;
  }
  
  function cerrarModalAgregarCliente() {
    modalAgregarCliente.value = false;
    // Limpiar los campos después de cerrar el modal
    nombreNuevoCliente.value = '';
    telefonoNuevoCliente.value = '';
  }
  
  function agregarCliente() {
    const nuevoCliente = {
      id: clientesEnEspera.value.length + 1,
      nombre: nombreNuevoCliente.value,
      telefono: telefonoNuevoCliente.value,
      tiempoEspera: '0 min' // Puedes establecer un tiempo de espera inicial
    };
    clientesEnEspera.value.push(nuevoCliente);
    cerrarModalAgregarCliente();
  }
  
  function mostrarModalOpciones(cliente) {
    cerrarModales(); // Cerrar otros modales antes de abrir este
    clienteSeleccionado.value = cliente;
    modalOpcionesCliente.value = true;
  }
  
  function cerrarModalOpcionesCliente() {
    modalOpcionesCliente.value = false;
    clienteSeleccionado.value = null;
  }
  
  function mostrarModalAsignarMesa() {
    // Simular carga de mesas disponibles desde backend (en una aplicación real, esto vendría del servidor)
    mesasDisponibles.value = [
      { id: 1, nombre: 'Mesa 1', capacidad: 2 },
      { id: 2, nombre: 'Mesa 2', capacidad: 4 },
      { id: 3, nombre: 'Mesa 3', capacidad: 6 },
    ];
    modalAsignarMesa.value = true;
  }
  
  function cerrarModalAsignarMesa() {
    modalAsignarMesa.value = false;
    mesaSeleccionada.value = null;
  }
  
  function asignarMesaACliente() {
    if (clienteSeleccionado.value && mesaSeleccionada.value) {
      // Implementar lógica para asignar la mesa al cliente aquí
      console.log(`Asignando mesa ${mesaSeleccionada.value} al cliente ${clienteSeleccionado.value.nombre}`);
      cerrarModalAsignarMesa(); // Cerrar modal después de asignar la mesa
      cerrarModalOpcionesCliente(); // Cerrar modal de opciones de cliente
    }
  }
  
  function eliminarClienteEnEspera(cliente) {
    clientesEnEspera.value = clientesEnEspera.value.filter(c => c.id !== cliente.id);
    cerrarModalOpcionesCliente(); // Cerrar modal después de eliminar cliente
  }
  
  function cerrarModales() {
    modalAgregarCliente.value = false;
    modalOpcionesCliente.value = false;
    modalAsignarMesa.value = false;
    clienteSeleccionado.value = null;
    mesaSeleccionada.value = null;
  }
  </script>
  
  <style scoped>
  /* Estilos para ajustar el diseño */
  </style>
  