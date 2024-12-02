<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar Izquierdo -->
    <Navbar />

    <!-- Contenido principal -->
    <div class="flex-1 p-8 overflow-y-auto">
      <!-- Encabezado -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Gourmet Delicatessen</h1>
          <p class="text-sm text-gray-500">Martes, 2 de Febrero 2023</p>
        </div>
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            v-model="search"
            class="w-64 pl-10 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
            placeholder="Buscar productos gourmet..."
          />
        </div>
      </div>

      <!-- Categorías y vista principal -->
      <div>
        <!-- Categorías -->
        <div class="mb-8">
          <div class="flex space-x-4 mb-6 overflow-x-auto pb-2">
            <button
              v-for="categoria in categorias"
              :key="categoria"
              class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              @click="filtrarPorCategoria(categoria)"
            >
              {{ categoria }}
            </button>
          </div>
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">Seleccione Productos</h2>
            <button
              class="text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
              @click="toggleParaLlevar"
            >
              Para Llevar <span class="ml-2">▼</span>
            </button>
          </div>
        </div>

        <!-- Productos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="producto in productosFiltrados"
            :key="producto.nombre"
            class="bg-white border border-gray-200 rounded-md shadow-sm p-4"
          >
            <div class="h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span class="text-gray-500">Imagen</span>
            </div>
            <h3 class="font-semibold mb-2 text-gray-800">{{ producto.nombre }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ producto.descripcion }}</p>
            <div class="flex justify-between items-center">
              <p class="text-gray-800 font-semibold">{{ producto.precio }}</p>
              <p class="text-sm text-gray-500">{{ producto.disponible }} disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Derecho -->
    <LSidebar />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Sidebar.vue";
import LSidebar from "../components/LSidebar.vue";

export default {
  components: {
    Navbar,
    LSidebar,
  },
  data() {
    return {
      search: "",
      categorias: ["Todos", "Carnes", "Pescados", "Quesos", "Embutidos", "Vinos", "Delicatessen"],
      productos: [],
      categoriaSeleccionada: "Todos",
      paraLlevar: false,
      apiUrl: "http://localhost:3001/", // Cambia esto según tu entorno
    };
  },
  computed: {
    productosFiltrados() {
      let productos = this.productos;

      if (this.categoriaSeleccionada !== "Todos") {
        productos = productos.filter(
          (producto) => producto.categoria === this.categoriaSeleccionada
        );
      }

      if (this.search) {
        productos = productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      return productos;
    },
  },
  methods: {
    async fetchProductos() {
      try {
        const response = await axios.get(`${this.apiUrl}foods`);
        this.productos = response.data.map((producto) => ({
          nombre: producto.name,
          descripcion: producto.description,
          precio: producto.price,
          disponible: producto.disponible || 0, // Asegúrate de que el backend envíe esta propiedad
          categoria: producto.menu || "Sin Categoría",
        }));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },
    filtrarPorCategoria(categoria) {
      this.categoriaSeleccionada = categoria;
    },
    toggleParaLlevar() {
      this.paraLlevar = !this.paraLlevar;
    },
  },
  async mounted() {
    await this.fetchProductos();
  },
};
</script>

