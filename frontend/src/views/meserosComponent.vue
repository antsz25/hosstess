<template>
  <div class="flex h-screen">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenedor principal -->
    <div class="flex-grow p-4 relative bg-cover bg-center"
      style="background-image: url('https://i.imgur.com/xHIWOer.png');">
      <!-- Encabezado -->
      <div class="absolute inset-0 bg-black opacity-75" @click="cerrarModal"></div>
      <h2 class="text-2xl font-semibold mb-4 z-10 relative text-white">Gestor de Meseros y Mesas</h2>

      <!-- Botón para agregar mesero -->
      <button @click="mostrarModal"
        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 2a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H4a1 1 0 1 1 0-2h6V3a1 1 0 0 1 1-1z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Lista de meseros -->
      <div class="grid grid-cols-3 gap-4 z-10 relative">
        <div v-for="mesero in meseros" :key="mesero.id" class="bg-white rounded-lg shadow-md p-4">
          <h3 class="font-semibold text-lg text-red-500">{{ mesero.nombre }}</h3>
          <p class="mt-2 text-base text-gray-700">Edad: {{ mesero.edad }}</p>
          <p class="mt-1 text-base text-gray-700">Turno: {{ mesero.turno }}</p>
          <button @click="eliminarMesero(mesero.id)"
            class="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none">
            Eliminar
          </button>
        </div>
      </div>

      <!-- Modal para agregar nuevo mesero -->
      <div v-if="mostrandoModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-8" @click.stop>
          <h3 class="text-lg font-semibold mb-4">Agregar Nuevo Mesero</h3>
          <form @submit.prevent="agregarMesero" class="space-y-4">
            <input v-model="nuevoMesero.nombre" type="text" class="w-full px-3 py-2 border rounded-md"
              placeholder="Nombre">
            <input v-model.number="nuevoMesero.edad" type="number" class="w-full px-3 py-2 border rounded-md"
              placeholder="Edad">
            <input v-model="nuevoMesero.turno" type="text" class="w-full px-3 py-2 border rounded-md"
              placeholder="Turno">
            <div class="flex justify-end">
              <button type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Agregar</button>
              <button @click="cerrarModal"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none">Cancelar</button>
            </div>
          </form>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import Navbar from '../components/Sidebar.vue';

export default {
  components: {
    Navbar,

  },
  data() {
    return {
      meseros: [
        { id: 1, nombre: 'Juan', edad: 25, turno: 'Mañana' },
        { id: 2, nombre: 'María', edad: 30, turno: 'Tarde' },
        { id: 3, nombre: 'Pedro', edad: 28, turno: 'Noche' }
      ],
      nuevoMesero: {
        nombre: '',
        edad: null,
        turno: ''
      },
      mostrandoModal: false
    };
  },
  methods: {
    mostrarModal() {
      this.mostrandoModal = true;
    },
    cerrarModal() {
      this.mostrandoModal = false;
      this.resetearFormulario();
    },
    resetearFormulario() {
      this.nuevoMesero.nombre = '';
      this.nuevoMesero.edad = null;
      this.nuevoMesero.turno = '';
    },
    agregarMesero() {
      if (this.nuevoMesero.nombre && this.nuevoMesero.edad && this.nuevoMesero.turno) {
        const newId = this.meseros.length > 0 ? this.meseros[this.meseros.length - 1].id + 1 : 1;
        this.meseros.push({
          id: newId,
          nombre: this.nuevoMesero.nombre,
          edad: this.nuevoMesero.edad,
          turno: this.nuevoMesero.turno
        });
        this.cerrarModal();
      } else {
        alert('Por favor complete todos los campos.');
      }
    },
    eliminarMesero(id) {
      const index = this.meseros.findIndex(m => m.id === id);
      if (index !== -1) {
        this.meseros.splice(index, 1);
      }
    }
  }
};
</script>
