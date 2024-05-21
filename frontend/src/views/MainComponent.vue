<template>
  <div class="flex min-h-screen">
    <!-- Navbar -->
    <Navbar />
    <!-- Contenedor principal -->
    <div class="flex-grow p-4 relative bg-cover bg-center"
      style="background-image: url('https://i.imgur.com/xHIWOer.png');">
      <div class="absolute inset-0 bg-black opacity-75" @click="cerrarMesa"></div>
      <h2 class="text-2xl font-semibold mb-4 z-10 relative text-red-500">Gestor de Mesas y Meseros</h2>
      <!-- Botón para agregar mesa -->
      <button @click="mostrarModalAgregarMesa"
        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 2a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H4a1 1 0 1 1 0-2h6V3a1 1 0 0 1 1-1z"
            clip-rule="evenodd" />
        </svg>
      </button>
      <!-- Visualización de mesas -->
      <div class="grid grid-cols-3 gap-4 z-10 relative">
        <div v-for="mesa in mesas" :key="mesa.id">
          <div class="relative">
            <div @click="mostrarModalGestionarMesa(mesa)"
              class="cursor-pointer p-6 rounded-lg shadow-md border border-gray-300 bg-white">
              <h3 class="font-semibold text-lg text-red-500">{{ mesa.nombre }}</h3>
              <p class="mt-2 text-base text-gray-700">Capacidad: {{ mesa.capacidad }}</p>
              <p class="mt-1 text-base text-gray-700">Estado:
                <span v-if="mesa.disponible" class="bg-green-500 px-2 py-1 text-white rounded-full">Libre</span>
                <span v-else class="bg-red-500 px-2 py-1 text-white rounded-full">Ocupada</span>
              </p>
              <p class="mt-1 text-base text-gray-700">Mesero: {{ mesa.mesero ? `${mesa.mesero.name} ${mesa.mesero.lastName}` : 'Sin asignar' }}</p>
              <p class="mt-1 text-base text-gray-700">Titular: {{ mesa.personaTitular ? mesa.personaTitular : 'Sin asignar' }}</p>
            </div>
            <button @click="eliminarMesa(mesa)"
              class="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M14.707 5.293a1 1 0 0 0-1.414 0L10 8.586 6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0 0-1.414z" clip-rule="evenodd" />
</svg>

            </button>
          </div>
        </div>
      </div>
      <!-- Modal para ocupar/desocupar mesa -->
      <div v-if="modalActivo" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-8" @click.stop>
          <h3 class="text-lg font-semibold mb-4">Gestión de Mesa</h3>
          <p class="text-gray-700 mb-4">¿Qué acción deseas realizar con la mesa?</p>
          <div class="flex justify-between">
            <button @click="ocuparMesa" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Ocupar</button>
            <button @click="desocuparMesa"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Desocupar</button>
            <button @click="cerrarMesa"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancelar</button>
          </div>
        </div>
      </div>
      <!-- Modal para agregar mesa -->
      <div v-if="modalAgregarMesa" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-8" @click.stop>
          <h3 class="text-lg font-semibold mb-4">Agregar Mesa</h3>
          <p class="text-gray-700 mb-4">Por favor, ingrese el nombre y la capacidad de la mesa:</p>
          <input v-model="nombreNuevaMesa" type="text" class="w-full mb-2 px-3 py-2 border rounded-md"
            placeholder="Nombre de la mesa" maxLength = "30">
          <select v-model="capacidadNuevaMesa" class="w-full mb-2 px-3 py-2 border rounded-md">
            <option value="2">2 personas</option>
            <option value="4">4 personas</option>
            <option value="6">6 personas</option>
            <option value="8">8 personas</option>
            <option value="10">10 personas</option>
          </select>
          <div class="flex justify-between">
            <button @click="agregarNuevaMesa"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Agregar</button>
            <button @click="cerrarModalAgregarMesa"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import Axios from '../main.ts';
const mesas = ref([]);
const modalActivo = ref(false);
const modalAgregarMesa = ref(false);
const nombreNuevaMesa = ref('');
const capacidadNuevaMesa = ref('');
onMounted(async () => {
  mesas.value = await refillMesas();
});
async function refillMesas() {
  try {
    const convert = (text) => {
        return isNaN(text) ? text : parseInt(text, 10);
    };
    // Helper function to create alphanumeric key
    const alphanumKey = (key) => {
        return key.split(/([0-9]+)/).map(convert);
    };
    const response = await Axios.get('/mesas/');
    // Sorting the array using the alphanumKey
    response.data.sort((a, b) => {
        const keyA = alphanumKey(a.nombre);
        const keyB = alphanumKey(b.nombre);
        for (let i = 0; i < Math.max(keyA.length, keyB.length); i++) {
            if (keyA[i] !== keyB[i]) {
                if (keyA[i] === undefined) return -1;
                if (keyB[i] === undefined) return 1;
                if (typeof keyA[i] === 'number' && typeof keyB[i] === 'number') {
                    return keyA[i] - keyB[i];
                } else {
                    return keyA[i].toString().localeCompare(keyB[i].toString());
                }
            }
        }
        return 0;
    });
    return response.data || [];
  } catch (error) {
    console.error('Error al obtener mesas:', error);
    return [];
  }
}

async function agregarNuevaMesa() {
  try {
    const maxNumero = mesas.value.reduce((max, mesa) => Math.max(max, mesa.numero), -Infinity) | 1;
    const nuevaMesa = {
      numero: maxNumero + 1, // Asignar número de mesa automáticamente
      nombre: nombreNuevaMesa.value,
      capacidad: capacidadNuevaMesa.value,
      disponible: true // Nueva mesa se agrega como disponible por defecto
    };
    await Axios.post('/mesas/add', nuevaMesa).catch((error) =>{console.log(error);throw new Error(`${error.response.status}`);});
    mesas.value = await refillMesas(); // Actualizar lista de mesas
    cerrarModalAgregarMesa(); // Cerrar modal de agregar mesa
  } catch (error) {
    let split = String(error).split(" ")[1];
    if (split === "400") {
      alert('Error al agregar mesa, por favor verifique los datos ingresados.');
    }else{
      alert('Error al agregar mesa, por favor intente de nuevo.');
    }
    console.error('Error al agregar mesa:', error);
  }
}

function mostrarModalAgregarMesa() {
  modalAgregarMesa.value = true;
}

function cerrarModalAgregarMesa() {
  modalAgregarMesa.value = false;
}

function mostrarModalGestionarMesa(mesa) {
  mesaSeleccionada.value = mesa;
  modalActivo.value = true;
}

async function ocuparMesa() {
  try {
    if (mesaSeleccionada.value) {
      const numeroMesa = mesaSeleccionada.value.numero;
      const request = {
              disponible: false,
      };
      await Axios.put(`/mesas/change/${numeroMesa}`, request);
      mesas.value = await refillMesas(); // Actualizar lista de mesas
      cerrarMesa(); // Cerrar modal de gestión de mesa
    }
  } catch (error) {
    console.error('Error al ocupar mesa:', error);
  }
}

async function desocuparMesa() {
  try {
    if (mesaSeleccionada.value) {
      const numeroMesa = mesaSeleccionada.value.numero;
      await Axios.put(`/mesas/change/${numeroMesa}`, { disponible: true, personaTitular: null});
      mesas.value = await refillMesas(); // Actualizar lista de mesas
      cerrarMesa(); // Cerrar modal de gestión de mesa
    }
  } catch (error) {
    console.error('Error al desocupar mesa:', error);
  }
}

async function eliminarMesa(mesa) {
  try {
    const numeroMesa = mesa.numero;
    await Axios.delete(`/mesas/delete/${numeroMesa}`);
    mesas.value = mesas.value.filter((m) => m.numero !== numeroMesa); // Eliminar la mesa de la lista local
  } catch (error) {
    console.error('Error al eliminar mesa:', error);
    alert('Error al eliminar mesa, por favor intente de nuevo.')
  }
}

const mesaSeleccionada = ref(null);

function cerrarMesa() {
  modalActivo.value = false;
  mesaSeleccionada.value = null;
}


</script>

<style scoped>
/* Estilos para ajustar el diseño */
</style>
