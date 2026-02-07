El proyecto ha sido desarrollado utilizando Vue 3 (Composition API) y Tailwind CSS, enfocándose en la escalabilidad, la limpieza del código y la experiencia de usuario (UX).

📋 Características Implementadas
Cumpliendo con los requerimientos funcionales solicitados:


Listado de Usuarios: Consumo de API (GET) y renderizado reactivo en tabla.
+1

Gestión de Estado Local:


Creación: Formulario en modal con generación automática de IDs secuenciales.
+1


Edición: Carga de datos en formulario y actualización optimista en el cliente.
+1


Eliminación: Confirmación nativa y eliminación reactiva del array local.
+1


Validaciones: Verificación de campos requeridos y formato de correo electrónico (Regex + HTML5).
+1

UX/UI:

Indicadores de carga (Loaders) durante las peticiones asíncronas.
+1

Modales reutilizables para formularios.

Diseño responsive y moderno con Tailwind CSS.

🛠️ Stack Tecnológico

Framework: Vue.js 3 (Composition API con <script setup>).

Build Tool: Vite.

Estilos: Tailwind CSS (para una maquetación rápida y limpia).

Lógica: JavaScript (ES6+).

🏗️ Arquitectura y Decisiones Técnicas
Para cumplir con los criterios de evaluación sobre estructura y reutilización, se ha optado por una arquitectura modular:
+1

Patrón Composable (useUsers.js):

Se extrajo toda la lógica de negocio y el estado (CRUD) fuera de los componentes visuales. Esto facilita el testing y mantiene los componentes limpios ("Separation of Concerns").

Componentes Presentacionales:

UserTable.vue: Se encarga exclusivamente de mostrar datos y emitir eventos.

UserFormModal.vue: Maneja la interacción del formulario y validaciones.

Persistencia Simulada:

Dado que JSONPlaceholder no persiste los cambios, la aplicación simula la persistencia manipulando el estado local (Array) tras las confirmaciones de éxito.

### Compile and Minify for Production

```sh
npm run build
```
