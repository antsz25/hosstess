import { createApp } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import axios, { AxiosInstance } from "axios";
import "./index.css";

// Axios Configuration
let publicUrl: string;

// Configuración estática según ubicación
if (window.location.hostname === "localhost") {
  publicUrl = "http://localhost:3001/";
} else {
  publicUrl = "https://produccion-api.com/"; // Cambia a la URL de tu backend en producción
}

// Crea la instancia de Axios
const Axios: AxiosInstance = axios.create({
  baseURL: publicUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    // No se requiere el token en este caso, ya que lo eliminamos para facilitar el desarrollo
  },
  withCredentials: false, // Cambia a `true` si necesitas cookies en producción
});

export default Axios;

// Define las rutas
import main from "./views/MainComponent.vue";
import Login from "./views/LoginComponent.vue";
import Register from "./views/RegisterComponent.vue";
import meseros from "./views/MenuComponent.vue";
import waitlist from "./views/WaitListComponent.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/main',
    name: 'main',
    component: main,
  },
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/meseros',
    name: 'meseros',
    component: meseros,
  },
  {
    path: '/waitlist',
    name: 'waitlist',
    component: waitlist,
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

app.use(router);
app.use(vuetify);

app.mount("#app");
