<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 class="text-xl font-bold mb-4">
        {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
      </h2>
      
      <Form @submit="handleSubmit" :validation-schema="schema" :initial-values="formValues" v-slot="{ errors }">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Nombre</label>
            <Field name="name" type="text" class="w-full border p-2 rounded" :class="{ 'border-red-500': errors.name }" />
            <ErrorMessage name="name" class="text-red-500 text-xs mt-1" />
          </div>
          <div>
            <label class="block text-sm font-medium">Username</label>
            <Field name="username" type="text" class="w-full border p-2 rounded" :class="{ 'border-red-500': errors.username }" />
            <ErrorMessage name="username" class="text-red-500 text-xs mt-1" />
          </div>
          <div>
            <label class="block text-sm font-medium">Email</label>
            <Field name="email" type="email" class="w-full border p-2 rounded" :class="{ 'border-red-500': errors.email }" />
            <ErrorMessage name="email" class="text-red-500 text-xs mt-1" />
          </div>
          <div>
            <label class="block text-sm font-medium">Teléfono</label>
            <Field name="phone" type="text" class="w-full border p-2 rounded" :class="{ 'border-red-500': errors.phone }" />
            <ErrorMessage name="phone" class="text-red-500 text-xs mt-1" />
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
      </Form>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps({
  isOpen: Boolean,
  userToEdit: Object // Si es null, es modo creación
});

const emit = defineEmits(['close', 'save']);

// Esquema de validación con Yup
const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  username: yup.string().required('El username es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  phone: yup.string().required('El teléfono es obligatorio')
});

// Detectar si estamos editando
const isEditing = computed(() => !!props.userToEdit);

// Valores iniciales calculados
const formValues = computed(() => {
  if (props.userToEdit) {
    return { ...props.userToEdit };
  }
  return { name: '', username: '', email: '', phone: '' };
});

const handleSubmit = (values) => {
  // VeeValidate ya validó, 'values' contiene los datos limpios
  emit('save', { ...values, id: props.userToEdit?.id });
};
</script>
