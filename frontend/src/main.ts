import { createApp } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import axios, {AxiosInstance} from 'axios';
import "./index.css";

//Axios configuration
let publicUrl: string = "";
if (import.meta.env.DEV) {publicUrl = "http://localhost:3001/";}
if (import.meta.env.PROD) {publicUrl = import.meta.env.VITE_PUBLIC_URL;}
const token: string | null = localStorage.getItem("token");
const Axios: AxiosInstance = axios.create({
  baseURL: publicUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Authorization": token ? `Bearer ${token}` : null,
  },
  withCredentials: true,
});

export async function CheckSession(){
  if(await localStorage.getItem("token")){
    return true;
  }else{
    return false;
  }
}
export default Axios;

// Importa tus componentes de Vue Router aquí
// Por ejemplo:
import main from "./views/MainComponent.vue";
import Login from "./views/LoginComponent.vue";
import Register from "./views/RegisterComponent.vue";
import meseros from "./views/meserosComponent.vue";
import waitlist from "./views/WaitListComponent.vue";
// import About from './components/About.vue';

// Define el tipo para las rutas
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

// Usa Vue Router en tu aplicación
app.use(router);

// Usa Vuetify en tu aplicación
app.use(vuetify);

// Monta tu aplicación en el elemento con el ID 'app'
app.mount("#app");