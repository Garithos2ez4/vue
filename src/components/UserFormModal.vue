<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 class="text-xl font-bold mb-4">
        {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
      </h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Nombre</label>
            <input v-model="form.name" required class="w-full border p-2 rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium">Username</label>
            <input v-model="form.username" required class="w-full border p-2 rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium">Email</label>
            <input v-model="form.email" type="email" required class="w-full border p-2 rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium">Teléfono</label>
            <input v-model="form.phone" required class="w-full border p-2 rounded" />
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  userToEdit: Object // Si es null, es modo creación
});

const emit = defineEmits(['close', 'save']);

// Estado local del formulario
const form = reactive({ name: '', username: '', email: '', phone: '' });

// Detectar si estamos editando
const isEditing = computed(() => !!props.userToEdit);

// Rellenar formulario cuando cambia el usuario a editar [cite: 34]
watch(() => props.userToEdit, (newUser) => {
  if (newUser) {
    Object.assign(form, newUser);
  } else {
    // Resetear form
    Object.assign(form, { name: '', username: '', email: '', phone: '' });
  }
});

const handleSubmit = () => {
  // Validación extra de email [cite: 21]
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    alert("Email inválido");
    return;
  }
  
  // Emitimos el evento 'save' con los datos limpios
  emit('save', { ...form, id: props.userToEdit?.id });
};
</script>
