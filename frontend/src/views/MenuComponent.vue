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
              v-for="menu in menus"
              :key="menu.id || menu.name"
              class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              @click="loadMenuProducts(menu.id)"
            >
              {{ menu.name || 'Sin Nombre' }}
            </button>
          </div>
        </div>

        <!-- Productos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
  v-for="producto in productosFiltrados"
  :key="producto.id || producto.name"
  @click="agregarAOrden(producto)"
>
            <div class="h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span class="text-gray-500">Imagen</span>
            </div>
            <h3 class="font-semibold mb-2 text-gray-800">{{ producto.name || 'Producto Desconocido' }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ producto.description || 'Sin descripción disponible' }}</p>
            <div class="flex justify-between items-center">
              <p class="text-gray-800 font-semibold">${{ producto.price || '0.00' }}</p>
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
import Navbar from "../components/Sidebar.vue";
import LSidebar from "../components/LSidebar.vue";
import { ref, computed } from "vue";
import { apiService } from "../apiService";
import { store } from "../store"; // Importar el estado compartido

export default {
  components: {
    Navbar,
    LSidebar,
  },
  setup() {
    const search = ref("");
    const menus = ref([]);
    const productos = ref([]);

    // Computados
    const productosFiltrados = computed(() => {
      if (!search.value) return productos.value;
      return productos.value.filter((producto) =>
        producto.name?.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    // Métodos
    const fetchMenus = async () => {
      try {
        const data = await apiService.getAllMenus();
        menus.value = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Error al obtener los menús:", error);
      }
    };

    const loadMenuProducts = async (menuId) => {
      if (!menuId) {
        console.error("El ID del menú no es válido.");
        return;
      }
      try {
        const menu = await apiService.getMenuById(menuId);
        productos.value = Array.isArray(menu.foods) ? menu.foods : [];
      } catch (error) {
        console.error(`Error al cargar productos del menú con ID ${menuId}:`, error);
      }
    };

    const agregarAOrden = (producto) => {
  if (!store.platillosSeleccionados) {
    console.error("Error: 'platillosSeleccionados' no está definido en el store.");
    return;
  }

  store.platillosSeleccionados.push({ ...producto, quantity: 1 });
};


    // Montaje
    fetchMenus();

    return {
      search,
      menus,
      productos,
      productosFiltrados,
      loadMenuProducts,
      agregarAOrden,
    };
  },
};
</script>
