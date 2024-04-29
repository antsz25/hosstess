<template>
  <div class="flex h-screen">
    <Navbar />
    <Mesas :mesas="mesas" @mostrar-cuenta="mostrarCuenta" />
    
  </div>
</template>

<script setup>
import Navbar from '../components/Sidebar.vue';
import Mesas from '../components/Mesas.vue';

import { ref, onMounted } from 'vue';
import Axios from '../main.ts';


const mesas = ref([]); //Definicion de referencia reactiva


onMounted(async () => {
  mesas.value = await RefillMesas(); //Rellena el objeto mesas
});

async function RefillMesas() {
  try {
    const response = await Axios.get('/mesas/');
    console.log(response.data);
    return response.data || []; // Return data or an empty array if no data is received
  } catch (error) {
    console.error('Error fetching mesas:', error);
    return []; // Return an empty array on error
  }
}

const mesaSeleccionada = ref(null);

function mostrarCuenta(mesa) {
  mesaSeleccionada.value = mesa;
}
</script>

<style scoped>
/* Estilos para ajustar el diseño */
</style>
