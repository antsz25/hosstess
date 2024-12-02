// src/services/foodService.ts
import Axios from "./main";

export const foodService = {
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
};
