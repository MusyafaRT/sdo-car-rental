import type { Car, OrderType } from "../types/car";

const API_BASE_URL =
  "https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/";
const CARS_API = `${API_BASE_URL}cars`;
const ORDERS_API = `${API_BASE_URL}orders`;

class ApiService {
  static async fetchCars(): Promise<Car[]> {
    const response = await fetch(CARS_API);
    return response.json();
  }
  static async fetchOrders(): Promise<OrderType[]> {
    const response = await fetch(ORDERS_API);
    return response.json();
  }
  static async createCar(car: Omit<Car, "id">): Promise<Car> {
    const response = await fetch(CARS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    return response.json();
  }

  static async updateCar(id: string, car: Partial<Car>): Promise<Car> {
    const response = await fetch(`${CARS_API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    return response.json();
  }

  static async deleteCar(id: string): Promise<void> {
    await fetch(`${CARS_API}/${id}`, { method: "DELETE" });
  }

  static async createOrder(order: Omit<OrderType, "id">): Promise<OrderType> {
    const response = await fetch(ORDERS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return response.json();
  }

  static async updateOrder(
    id: string,
    order: Partial<OrderType>
  ): Promise<OrderType> {
    const response = await fetch(`${ORDERS_API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return response.json();
  }

  static async deleteOrder(id: string): Promise<void> {
    await fetch(`${ORDERS_API}/${id}`, { method: "DELETE" });
  }
}

export default ApiService;
