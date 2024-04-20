<template>
  <div class="flex h-screen">
    <Navbar />
    <Mesas :mesas="mesas" @mostrar-cuenta="mostrarCuenta" />
    <DetallesMesa :mesaSeleccionada="mesaSeleccionada" />
  </div>
</template>

<script setup>
import Navbar from '../components/Sidebar.vue';
import Mesas from '../components/Mesas.vue';
import DetallesMesa from '../components/DetallesMesa.vue';
import { ref } from 'vue';

const mesas = ref([
  { id: 1, nombre: 'Mesa 1', capacidad: 4, estado: 'Libre', mesero: 'Juan' },
  { id: 2, nombre: 'Mesa 2', capacidad: 6, estado: 'Ocupada', mesero: 'María' },
  // Agrega más mesas según sea necesario
]);

const mesaSeleccionada = ref(null);

function mostrarCuenta(mesa) {
  mesaSeleccionada.value = mesa;
}
</script>

<style scoped>
/* Estilos para ajustar el diseño */
</style>
