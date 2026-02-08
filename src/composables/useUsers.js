import { ref, reactive } from 'vue'
import { apiClient } from '../services/api'

export function useUsers() {
    const users = ref([]);
    const loading = ref(false);

    // 1. Obtener usuarios de la API [cite: 11]
    const fetchUsers = async () => {
        loading.value = true;
        try {
            users.value = await apiClient.fetchUsers(); // Using apiClient to maintain professional structure
        } catch (e) {
            console.error(e);
            alert('Error cargando usuarios');
        } finally {
            loading.value = false;
        }
    };

    // 2. Agregar usuario (Local) [cite: 22]
    const addUser = (userData) => {
        const maxId = users.value.length > 0
            ? Math.max(...users.value.map(u => u.id))
            : 0;

        users.value.push({ ...userData, id: maxId + 1 });
    };

    const updateUser = (userData) => {
        const index = users.value.findIndex(u => u.id == userData.id);
        if (index !== -1) {
            users.value[index] = { ...users.value[index], ...userData };
            console.log('User updated:', users.value[index]);
        } else {
            console.warn('User not found for update:', userData);
        }
    };

    const deleteUser = (id) => {
        users.value = users.value.filter(u => u.id !== id);
    };

    return {
        users,
        loading,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser
    };
}
