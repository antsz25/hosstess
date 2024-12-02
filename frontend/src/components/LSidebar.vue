<template>
  <div class="w-90 max-w-xs space-y-4 bg-white p-4 shadow-md rounded-md">
    <h2 class="text-lg font-semibold mb-4 text-center">Estado de Cuenta</h2>

    <!-- Lista de Productos -->
    <ul class="space-y-4">
      <li v-for="(producto, index) in store.platillosSeleccionados" :key="index">
        <div class="flex items-center justify-between">
          <!-- Nombre del producto -->
          <div class="truncate w-2/3">
            <p class="text-sm font-medium text-gray-800 truncate">{{ producto.name }}</p>
            <p class="text-xs text-gray-500 truncate">{{ formatearMoneda(producto.price) }} c/u</p>
          </div>

          <!-- Controles de cantidad -->
          <div class="flex items-center">
            <button class="px-2 py-1 text-gray-600 border rounded-md hover:bg-gray-200"
              @click="disminuirCantidad(index)">
              -
            </button>
            <span class="mx-2">{{ producto.quantity }}</span>
            <button class="px-2 py-1 text-gray-600 border rounded-md hover:bg-gray-200"
              @click="incrementarCantidad(index)">
              +
            </button>
          </div>

          <!-- Precio total del producto -->
          <p class="ml-4 text-sm font-medium text-gray-800 truncate">{{ formatearMoneda(producto.price *
            producto.quantity) }}</p>

          <!-- Botón de eliminación -->
          <button class="ml-4 text-red-500 hover:text-red-700" @click="eliminarProducto(index)">
            ✖
          </button>
        </div>
      </li>
    </ul>

    <!-- Subtotal y Total -->
    <div class="mt-4">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Subtotal</span>
        <span class="font-medium">{{ formatearMoneda(subtotal) }}</span>
      </div>
      <div v-if="deliveryMethod === 'takeaway'" class="flex justify-between text-sm">
        <span class="text-gray-600">Cobro por Repartidor</span>
        <span class="font-medium">{{ formatearMoneda(deliveryTax) }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">IVA (8%)</span>
        <span class="font-medium">{{ formatearMoneda(subtotal * taxRate) }}</span>
      </div>
      <hr class="border-gray-300 my-2" />
      <div class="flex justify-between text-base font-semibold">
        <span>Total</span>
        <span>{{ formatearMoneda(total) }}</span>
      </div>
    </div>

    <!-- Botones para Método de Entrega -->
    <div class="flex gap-2 mt-4">
      <button class="px-4 py-2 rounded-md text-sm font-medium"
        :class="deliveryMethod === 'dine-in' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
        @click="setDeliveryMethod('dine-in')">
        Para Comer Aquí
      </button>
      <button class="px-4 py-2 rounded-md text-sm font-medium"
        :class="deliveryMethod === 'takeaway' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
        @click="setDeliveryMethod('takeaway')">
        Para Llevar
      </button>
    </div>

    <!-- Botón de finalizar -->
    <button class="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md" @click="finalizeOrder">
      Finalizar Pedido
    </button>
  </div>
</template>

<script>
import { store } from "../store";
import { computed, ref } from "vue";
import { apiService } from "../apiService"; // Importar el servicio

export default {
  setup() {
    // Estado
    const deliveryMethod = ref("dine-in"); // "Para Comer Aquí" por defecto
    const deliveryTaxRate = 50; // Cobro fijo por repartidor ($50 MXN)

    // IVA y cálculos
    const taxRate = 0.08;
    const subtotal = computed(() =>
      store.platillosSeleccionados.reduce(
        (sum, producto) => sum + producto.price * producto.quantity,
        0
      )
    );
    const deliveryTax = computed(() =>
      deliveryMethod.value === "takeaway" ? deliveryTaxRate : 0
    );
    const total = computed(() =>
      subtotal.value + subtotal.value * taxRate + deliveryTax.value
    );

    // Métodos para controlar las cantidades
    const incrementarCantidad = (index) => {
      store.platillosSeleccionados[index].quantity += 1;
    };

    const disminuirCantidad = (index) => {
      if (store.platillosSeleccionados[index].quantity > 1) {
        store.platillosSeleccionados[index].quantity -= 1;
      }
    };

    const eliminarProducto = (index) => {
      store.platillosSeleccionados.splice(index, 1);
    };

    const setDeliveryMethod = (method) => {
      deliveryMethod.value = method;
    };

    const finalizeOrder = async () => {
      const orderDTO = {
        mesa: deliveryMethod.value === "dine-in" ? "En Restaurante" : "Para Llevar",
        description: `Orden ${deliveryMethod.value === "dine-in" ? "en mesa" : "para llevar"} - ${new Date().toLocaleString()}`,
        creationDate: new Date().toISOString(),
        ready: false,
        complete: false,
        foods: store.platillosSeleccionados.map((producto) => ({
          food: producto.id, // Solo enviamos el ID del alimento
          quantity: producto.quantity
        }    
      )
    ),
    modality: 1
    

      };
      console.log("DTO de orden:", orderDTO);

      try {
        console.log("orderDTO:", orderDTO);
        const response = await apiService.createOrder(orderDTO);

        alert(`¡Pedido enviado con éxito! ID: ${response.id}`);
        console.log("Orden creada:", response);
      } catch (error) {
        console.error("Error al crear la orden:", error.response?.data || error.message);
        alert("Hubo un error al enviar la orden.");
      }
    };


    // Formatear números como moneda en pesos mexicanos
    const formatearMoneda = (cantidad) => {
      return cantidad.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      });
    };

    return {
      store,
      deliveryMethod,
      subtotal,
      taxRate,
      deliveryTax,
      total,
      incrementarCantidad,
      disminuirCantidad,
      eliminarProducto,
      setDeliveryMethod,
      finalizeOrder,
      formatearMoneda,
    };
  },
};
</script>


<style>
/* Asegurar que los textos largos no rompan el diseño */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.w-90 {
  width: 90%;
}
</style>