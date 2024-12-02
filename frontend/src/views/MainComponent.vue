<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Navbar -->
    <Navbar />
    <!-- Contenedor principal -->
    <div class="flex-grow p-6">
      <!-- Encabezado -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Gourmet Delicatessen</h1>
          <p class="text-sm text-gray-500">Martes, 2 de Febrero 2023</p>
        </div>

      <!-- Botón para agregar mesa -->
      <div class="mb-6 flex justify-end">
        <button
          @click="mostrarModalAgregarMesa"
          class="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:ring focus:ring-indigo-500 shadow-sm">
          Agregar Mesa
        </button>
      </div>
        
       </div>
     

      <!-- Visualización de mesas -->
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <li
    v-for="mesa in mesas"
    :key="mesa.id"
    class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white border border-gray-200 shadow-sm"
  >
    <div class="flex w-full items-center justify-between space-x-6 p-6">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="truncate text-lg font-medium text-gray-900">{{ mesa.nombre }}</h3>
          <span
            :class="{
              'inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20':
                mesa.disponible,
              'inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20':
                !mesa.disponible,
            }"
          >
            {{ mesa.disponible ? 'Libre' : 'Ocupada' }}
          </span>
        </div>
        <p class="mt-1 truncate text-sm text-gray-500">Capacidad: {{ mesa.capacidad }}</p>
        <p class="mt-1 truncate text-sm text-gray-500">
          Mesero: {{ mesa.mesero ? `${mesa.mesero.name} ${mesa.mesero.lastName}` : 'Sin asignar' }}
        </p>
        <p class="mt-1 truncate text-sm text-gray-500">
          Titular: {{ mesa.personaTitular ? mesa.personaTitular : 'Sin asignar' }}
        </p>
      </div>
      <img
        class="h-16 w-16 shrink-0 rounded-full bg-gray-300"
        src="https://scontent.ftij6-1.fna.fbcdn.net/v/t39.30808-6/263088769_667740991276148_1685325883534833247_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHS_naGQgBoJ5nImkpcfA0xmbqqxKv-s0OZuqrEq_6zQwBW13rFRmR0S-flKAIMLjD6ILQ6fbRGr334rGen1QmZ&_nc_ohc=nywffPTvzJQQ7kNvgEZeb0e&_nc_zt=23&_nc_ht=scontent.ftij6-1.fna&_nc_gid=A6IfhxTeZXI_F6RBCiwbsx_&oh=00_AYCEcNQsc4oqCJLuz-WQd0gyAr-MnpkYAJ4BZKajA2isag&oe=6752DCEA"
        alt="Mesa"
      />
    </div>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex w-0 flex-1">
          <button
            class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            @click="mostrarModalGestionarMesa(mesa)"
          >
            Gestionar Mesa
          </button>
        </div>
        <div class="-ml-px flex w-0 flex-1">
          <button
            class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-red-500"
            @click="eliminarMesa(mesa)"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </li>
</ul>


      <!-- Modal para ocupar/desocupar mesa -->
      <div v-if="modalActivo" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-8 shadow-lg w-96" @click.stop>
          <h3 class="text-lg font-semibold mb-4">Gestión de Mesa</h3>
          <p class="text-gray-700 mb-4">¿Qué acción deseas realizar con la mesa?</p>
          <div class="flex justify-between">
            <button @click="ocuparMesa" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Ocupar</button>
            <button @click="desocuparMesa" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Desocupar</button>
            <button @click="cerrarMesa" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Modal para agregar mesa -->
      <div v-if="modalAgregarMesa" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-8 shadow-lg w-96" @click.stop>
          <h3 class="text-lg font-semibold mb-4">Agregar Mesa</h3>
          <p class="text-gray-700 mb-4">Por favor, ingrese el nombre y la capacidad de la mesa:</p>
          <input
            v-model="nombreNuevaMesa"
            type="text"
            class="w-full mb-2 px-3 py-2 border rounded-md"
            placeholder="Nombre de la mesa"
            maxLength="30"
          />
          <select v-model="capacidadNuevaMesa" class="w-full mb-2 px-3 py-2 border rounded-md">
            <option value="2">2 personas</option>
            <option value="4">4 personas</option>
            <option value="6">6 personas</option>
            <option value="8">8 personas</option>
            <option value="10">10 personas</option>
          </select>
          <div class="flex justify-between">
            <button @click="agregarNuevaMesa" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Agregar</button>
            <button @click="cerrarModalAgregarMesa" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import Navbar from '../components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { apiService } from '../apiService.ts';

const mesas = ref([]);
const modalActivo = ref(false);
const modalAgregarMesa = ref(false);
const nombreNuevaMesa = ref('');
const capacidadNuevaMesa = ref('');
const mesaSeleccionada = ref(null);

async function refillMesas() {
  try {
    const response = await apiService.getTables();
    // response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mesas.value = response;
  } catch (error) {
    console.error('Error al obtener mesas:', error);
    // Retorna datos ficticios en caso de error en modo desarrollo
    return [];
  }
}

async function agregarNuevaMesa() {
  try {
    const nuevaMesa = {
      nombre: nombreNuevaMesa.value,
      capacidad: capacidadNuevaMesa.value,
      disponible: true,
    };
      
    const response = await apiService.createTable(nuevaMesa);
    mesas.value = [...mesas.value, response];
    cerrarModalAgregarMesa();
  } catch (error) {
    console.error('Error al agregar mesa:', error);
    alert('Error al agregar mesa, por favor intente de nuevo.');
  }
}

async function eliminarMesa(mesa) {
  try {
    if (confirm(`¿Estás seguro de eliminar la mesa ${mesa.nombre}?`)) {
      apiService.deleteTable(mesa.id);
      mesas.value = mesas.value.filter((m) => m.id !== mesa.id);
    }
  } catch (error) {
    console.error('Error al eliminar mesa:', error);
    alert('Error al eliminar mesa, por favor intente de nuevo.');
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

function cerrarMesa() {
  modalActivo.value = false;
  mesaSeleccionada.value = null;
}

async function ocuparMesa() {
  try {
    await apiService.editTable(mesaSeleccionada.value.id, mesaSeleccionada.value);
    mesaSeleccionada.value.disponible = false;
    cerrarMesa();
  } catch (error) {
    console.error('Error al ocupar mesa:', error);
  }
}

async function desocuparMesa() {
  try {
    await apiService.editTable(mesaSeleccionada.value.id, mesaSeleccionada.value);
    mesaSeleccionada.value.disponible = true;
    cerrarMesa();
  } catch (error) {
    console.error('Error al desocupar mesa:', error);
  }
}

onMounted(async () => {
  await refillMesas();
});
</script>