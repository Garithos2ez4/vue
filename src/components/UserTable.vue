<template>
  <div class="overflow-x-auto shadow-md rounded-lg">
    <div v-if="loading" class="text-center py-8 text-gray-500">
      Cargando datos...
    </div>

    <table v-else class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th class="px-6 py-3">Nombre</th>
          <th class="px-6 py-3">Username</th>
          <th class="px-6 py-3">Email</th>
          <th class="px-6 py-3">Teléfono</th>
          <th class="px-6 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="bg-white border-b hover:bg-gray-50">
          <td class="px-6 py-4 font-medium text-gray-900">{{ user.name }}</td>
          <td class="px-6 py-4">{{ user.username }}</td>
          <td class="px-6 py-4">{{ user.email }}</td>
          <td class="px-6 py-4">{{ user.phone }}</td>
          <td class="px-6 py-4 text-center space-x-3">
            <button 
              @click="$emit('edit', user)" 
              class="text-blue-600 hover:text-blue-900 font-semibold"
            >
              Editar
            </button>
            <button 
              @click="$emit('delete', user)" 
              class="text-red-600 hover:text-red-900 font-semibold"
            >
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="!users.length" class="bg-white">
            <td colspan="5" class="text-center py-4">Sin registros.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  users: Array,
  loading: Boolean
});

// Definimos qué eventos envía este componente al padre
defineEmits(['edit', 'delete']);
</script>
