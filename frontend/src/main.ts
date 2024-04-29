import { createApp } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import axios, {AxiosInstance} from 'axios';
import "./index.css";

//Axios configuration
let baseUrl: string = "http://localhost:3001";
const token: string | null = localStorage.getItem("token");
const Axios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export default Axios;

// Importa tus componentes de Vue Router aquí
// Por ejemplo:
import main from "./views/MainComponent.vue";
import Login from "./views/LoginComponent.vue";
import Register from "./views/RegisterComponent.vue";
// import About from './components/About.vue';

// Define el tipo para las rutas
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: main,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
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