<template>
  <div class="p-6 max-w-6xl mx-auto font-sans text-gray-800">
    <h1 class="text-3xl font-bold mb-6">Gestión de Usuarios (Modular)</h1>

    <div class="flex justify-end mb-4">
      <button 
        @click="openModal()" 
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Agregar Usuario
      </button>
    </div>

    <UserTable 
      :users="users" 
      :loading="loading"
      @edit="openModal" 
      @delete="handleDelete" 
    />

    <UserFormModal 
      :is-open="isModalOpen"
      :user-to-edit="selectedUser"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import UserTable from './components/UserTable.vue';
import UserFormModal from './components/UserFormModal.vue';
import { useUsers } from './composables/useUsers';

// Importamos la lógica del composable
const { users, loading, fetchUsers, addUser, updateUser, deleteUser } = useUsers();

// Estado local para la UI (control de modales)
const isModalOpen = ref(false);
const selectedUser = ref(null);

onMounted(() => {
  fetchUsers();
});

// Manejadores de eventos UI
const openModal = (user = null) => {
  selectedUser.value = user; // Si es null, el modal sabrá que es "Crear"
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};

const handleSave = (userData) => {
  if (selectedUser.value) {
    updateUser(userData); // [cite: 35]
  } else {
    addUser(userData);    // [cite: 22]
  }
  closeModal();
};

const handleDelete = (user) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `Estás a punto de eliminar a ${user.name}. Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUser(user.id);
      Swal.fire(
        '¡Eliminado!',
        'El usuario ha sido eliminado correctamente.',
        'success'
      )
    }
  })
};
</script>
