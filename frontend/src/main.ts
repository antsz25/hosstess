import { createApp } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "./index.css";



// Importa tus componentes de Vue Router aquí
// Por ejemplo:
import main from "./views/MainComponent.vue";
// import About from './components/About.vue';

// Define el tipo para las rutas
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: main,
  },
  
];

// Crea el enrutador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Crea la instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Crea tu aplicación Vue
const app = createApp(App);

// Usa Vue Router en tu aplicación
app.use(router);

// Usa Vuetify en tu aplicación
app.use(vuetify);

// Monta tu aplicación en el elemento con el ID 'app'
app.mount("#app");
