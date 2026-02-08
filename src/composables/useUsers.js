import { ref, reactive } from 'vue'
import { apiClient } from '../services/api'

export function useUsers() {
    const users = ref([]);
    const loading = ref(false);

    const fetchUsers = async () => {
        loading.value = true;
        try {
            users.value = await apiClient.fetchUsers();
        } catch (e) {
            console.error(e);
            alert('Error cargando usuarios');
        } finally {
            loading.value = false;
        }
    };

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
        } else {
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
