<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-8" @click.stop>
            <h3 class="text-lg font-semibold mb-4">{{ modalTitle }}</h3>
            <slot></slot> <!-- Renderizará el contenido dentro del modal -->
            <div class="flex justify-between">
                <button @click="confirmAction" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">{{
                    confirmText }}</button>
                <button @click="closeModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">{{
                    cancelText }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modalTitle: {
            type: String,
            required: true
        },
        confirmText: {
            type: String,
            default: 'Confirmar'
        },
        cancelText: {
            type: String,
            default: 'Cancelar'
        }
    },
    methods: {
        confirmAction() {
            this.$emit('confirm'); // Emitir evento para confirmar acción
        },
        closeModal() {
            this.$emit('close'); // Emitir evento para cerrar modal
        }
    }
}
</script>