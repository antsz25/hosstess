<template>
    <div class="w-90 max-w-xs space-y-4 bg-white p-4 shadow-md rounded-md">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">{{ `Pedido #${orderId}` }}</h2>
        <div class="flex gap-2 mb-6">
            <button class="bg-gray-800 text-white rounded-md px-4 py-2"
                :class="{ 'bg-gray-300 text-gray-800': deliveryMethod !== 'takeaway' }"
                @click="setDeliveryMethod('takeaway')">
                Para Llevar
            </button>
            <button class="text-gray-600 border border-gray-400 rounded-md px-4 py-2"
                :class="{ 'bg-gray-800 text-white': deliveryMethod === 'delivery' }"
                @click="setDeliveryMethod('delivery')">
                Envío a Domicilio
            </button>
        </div>
        <div class="space-y-4 mb-8">
            <div v-for="(product, index) in products" :key="index" class="flex items-center">
                <img :src="product.image" :alt="product.name" class="w-12 h-12 rounded-lg object-cover" />
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-gray-800">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">{{ `€ ${product.price.toFixed(2)}` }}</p>
                </div>
                <span class="text-sm font-medium ml-4">{{ `€ ${(product.price * product.quantity).toFixed(2)}` }}</span>
            </div>
        </div>
        <div class="space-y-4">
            <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">{{ `€ ${subtotal.toFixed(2)}` }}</span>
            </div>
            <div class="flex justify-between text-sm">
                <span class="text-gray-600">IVA (21%)</span>
                <span class="font-medium">{{ `€ ${(subtotal * taxRate).toFixed(2)}` }}</span>
            </div>
            <hr class="border-gray-300" />
            <div class="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{{ `€ ${total.toFixed(2)}` }}</span>
            </div>
        </div>
        <button class="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md" @click="finalizeOrder">
            Finalizar Pedido
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

// Datos reactivos
const apiUrl = 'http://localhost:3001/orders'; // Cambia a la URL de tu backend
const orderId = 34562;
const deliveryMethod = ref('takeaway');
const products = ref([
    { name: 'Producto 1', price: 29.99, quantity: 1, image: 'https://via.placeholder.com/48' },
    { name: 'Producto 2', price: 19.99, quantity: 2, image: 'https://via.placeholder.com/48' },
]);

// Cálculos
const taxRate = 0.21;
const subtotal = computed(() =>
    products.value.reduce((sum, product) => sum + product.price * product.quantity, 0)
);
const total = computed(() => subtotal.value + subtotal.value * taxRate);

// Métodos
const setDeliveryMethod = (method) => {
    deliveryMethod.value = method;
};

const finalizeOrder = async () => {
    const orderPayload = {
        orderId,
        deliveryMethod: deliveryMethod.value,
        products: products.value,
        subtotal: subtotal.value,
        tax: subtotal.value * taxRate,
        total: total.value,
    };

    try {
        const response = await axios.post(apiUrl, orderPayload);
        alert(`Pedido finalizado con éxito. Respuesta: ${response.status}`);
    } catch (error) {
        console.error("Error al finalizar el pedido:", error);
        alert("Hubo un error al finalizar el pedido.");
    }
};
</script>
