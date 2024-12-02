// src/services/apiService.ts
import Axios from "../src/main.ts";

export const apiService = {
  // **FOODS**

  // Obtener todos los foods
  getAllFoods() {
    return Axios.get("/foods")
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching foods:", error);
        throw error;
      });
  },

  // Obtener un food por ID
  getFoodById(foodId: string) {
    return Axios.get(`/foods/${foodId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching food with ID ${foodId}:`, error);
        throw error;
      });
  },

  // Crear un nuevo food
  createFood(foodDTO: { name: string; price: number; description: string; imgUrl: string; menuId: string }) {
    return Axios.post("/foods", foodDTO)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating food:", error);
        throw error;
      });
  },

  // Editar un food
  editFood(foodId: string, foodDTO: { name: string; price: number; description: string; imgUrl: string; menuId: string }) {
    return Axios.post(`/foods/${foodId}`, foodDTO)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error editing food with ID ${foodId}:`, error);
        throw error;
      });
  },

  // Eliminar un food
  deleteFood(foodId: string) {
    return Axios.delete(`/foods/${foodId}`)
      .then(response => response.status === 200)
      .catch(error => {
        console.error(`Error deleting food with ID ${foodId}:`, error);
        throw error;
      });
  },

  // **MENUS**

  // Obtener todos los menus
  getAllMenus() {
    return Axios.get("/menus")
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching menus:", error);
        throw error;
      });
  },

  // Obtener un menu por ID
  getMenuById(menuId: string) {
    return Axios.get(`/menus/${menuId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching menu with ID ${menuId}:`, error);
        throw error;
      });
  },

  // Crear un nuevo menu
  createMenu(menuDTO: { name: string; description: string }) {
    return Axios.post("/menus", menuDTO)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating menu:", error);
        throw error;
      });
  },

  // Editar un menu
  editMenu(menuId: string, menuDTO: { name: string; description: string }) {
    return Axios.post(`/menus/${menuId}`, menuDTO)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error editing menu with ID ${menuId}:`, error);
        throw error;
      });
  },

  // Eliminar un menu
  deleteMenu(menuId: string) {
    return Axios.delete(`/menus/${menuId}`)
      .then(response => response.status === 200)
      .catch(error => {
        console.error(`Error deleting menu with ID ${menuId}:`, error);
        throw error;
      });
  },
};
