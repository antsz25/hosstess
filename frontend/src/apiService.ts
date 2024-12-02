import axios from 'axios';
const publicUrl = 'http://localhost:8081/';
// src/services/apiService.ts
  axios.defaults.baseURL = publicUrl;
  axios.defaults.headers.common = {"Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",}

export const apiService = {
  // **FOODS**

  // Obtener todos los foods
  getAllFoods() {
    return axios.get("/foods")
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching foods:", error);
        throw error;
      });
  },

  // Obtener un food por ID
  getFoodById(foodId: string) {
    return axios.get(`/foods/${foodId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching food with ID ${foodId}:`, error);
        throw error;
      });
  },

  // Crear un nuevo food
  createFood(foodDTO: { name: string; price: number; description: string; imgUrl: string; menuId: string }) {
    return axios.post("/foods", foodDTO)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating food:", error);
        throw error;
      });
  },

  // Editar un food
  editFood(foodId: string, foodDTO: { name: string; price: number; description: string; imgUrl: string; menuId: string }) {
    return axios.put(`/foods/${foodId}`, foodDTO)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error editing food with ID ${foodId}:`, error);
        throw error;
      });
  },

  // Eliminar un food
  deleteFood(foodId: string) {
    return axios.delete(`/foods/${foodId}`)
      .then(response => response.status === 200)
      .catch(error => {
        console.error(`Error deleting food with ID ${foodId}:`, error);
        throw error;
      });
  },

  // **MENUS**

  // Obtener todos los menus
  getAllMenus() {
    return axios.get("/menus")
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching menus:", error);
        throw error;
      });
  },

  // Obtener un menu por ID
  getMenuById(menuId: string) {
    return axios.get(`/menus/${menuId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching menu with ID ${menuId}:`, error);
        throw error;
      });
  },

  // Crear un nuevo menu
  createMenu(menuDTO: { name: string; description: string }) {
    return axios.post("/menus", menuDTO)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating menu:", error);
        throw error;
      });
  },

  // Editar un menu
  editMenu(menuId: string, menuDTO: { name: string; description: string }) {
    return axios.put(`/menus/${menuId}`, menuDTO)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error editing menu with ID ${menuId}:`, error);
        throw error;
      });
  },

  // Eliminar un menu
  deleteMenu(menuId: string) {
    return axios.delete(`/menus/${menuId}`)
      .then(response => response.status === 200)
      .catch(error => {
        console.error(`Error deleting menu with ID ${menuId}:`, error);
        throw error;
      });
  },


  getOrders(){
    return axios.get("/orders/ordersAsCheckout")
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching orders at checkout:", error);
        throw error;
      });
  },
  getOrdersById(orderId: string){
    return axios.get(`/orders/ordersAsCheckout/${orderId}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching orders at checkout:", error);
        throw error;
      });
  },

  createOrder(orderDTO: {mesa:string, description:string, creationDate:string, ready:boolean, complete:boolean, foods: [any],modality:number}) {
    console.log(orderDTO);
    return axios.post("/orders", orderDTO)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating order:", error);
        throw error;
      });
  },

  editOrderAsCompleted(orderId: string) {
    return axios.put(`/orders/markOrderAsCompleted/${orderId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error editing order with ID ${orderId}:`, error);
        throw error;
      });
  },

  deleteOrder(orderId: string) {
    return axios.delete(`/orders/${orderId}`)
      .then(response => response.status === 200)
      .catch(error => {
        console.error(`Error deleting order with ID ${orderId}:`, error);
        throw error;
      });
  },
  getTables(){
    return axios.get("/tables")
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching tables:", error);
        throw error;
      });
  },
  getTableById(tableId: string){
    return axios.get(`/tables/${tableId}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching table:", error);
        throw error;
      });
  },
  createTable(tableDTO: {nombre:string, capacidad: string, disponible:boolean, mesero: string, personaTitular:string}) {
    return axios.post("/tables", tableDTO)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating table:", error);
        throw error;
      });
  },
  editTable(tableId: string, tableDTO: {nombre:string, capacidad: string, disponible:boolean, mesero: string, personaTitular:string}) {
    return axios.put(`/tables/${tableId}`, tableDTO)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error editing table with ID ${tableId}:`, error);
        throw error;
      });
  },

  deleteTable(tableId: string) {
    return axios.delete(`/tables/${tableId}`)
      .then(response => response.status === 200)
      .catch(error => {
        console.error(`Error deleting table with ID ${tableId}:`, error);
        throw error;
      });
  },
};
