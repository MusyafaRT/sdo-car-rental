import React from "react";
import "./App.css";
import ApiService from "./services/ApiServices";
import type { Car, OrderType } from "./types/car";
import { Calendar, Edit2, MapPin, Plus, Trash2 } from "lucide-react";
import Modal from "./components/Modal";
import CarForm from "./components/CarForm";
import OrderForm from "./components/OrderForm";
import Button from "./components/Button";

function App() {
  const [activeTab, setActiveTab] = React.useState<"cars" | "orders">("cars");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [cars, setCars] = React.useState<Car[]>([]);
  const [orders, setOrders] = React.useState<OrderType[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingCar, setEditingCar] = React.useState<Car | null>(null);
  const [editingOrder, setEditingOrder] = React.useState<OrderType | null>(
    null
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [carsData, ordersData] = await Promise.all([
        ApiService.fetchCars(),
        ApiService.fetchOrders(),
      ]);

      setCars(carsData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleCreateCar = async (carData: Omit<Car, "id">) => {
    setLoading(true);
    try {
      const newCar = await ApiService.createCar(carData);
      setCars([...cars, newCar]);
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating car:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCar = async (carData: Omit<Car, "id">) => {
    if (!editingCar) return;
    setLoading(true);
    try {
      const updatedCar = await ApiService.updateCar(editingCar.id, carData);
      setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
      setEditingCar(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    setLoading(true);
    try {
      await ApiService.deleteCar(id);
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async (orderData: Omit<OrderType, "id">) => {
    setLoading(true);
    try {
      const newOrder = await ApiService.createOrder(orderData);
      setOrders([...orders, newOrder]);
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating car:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (orderData: Omit<OrderType, "id">) => {
    if (!editingOrder) return;
    setLoading(true);
    try {
      const updatedOrder = await ApiService.updateOrder(
        editingOrder.id,
        orderData
      );
      setOrders(
        orders.map((Order) =>
          Order.id === updatedOrder.id ? updatedOrder : Order
        )
      );
      setModalOpen(false);
      setEditingCar(null);
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setLoading(true);
    try {
      await ApiService.deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCarName = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    return car ? car.name : "Unknown Car";
  };

  const formatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("id-ID");
  };

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <div className="gap-2">
        <h1 className="text-3xl font-bold ">Welcome to the Car Rental App</h1>
        <p className="text-lg">
          This is a simple application to manage car rentals.
        </p>
      </div>
      <div className="flex justify-center mt-3">
        <div className="bg-gray-200 rounded-lg p-2 shadow-lg space-x-2">
          <button
            onClick={() => setActiveTab("cars")}
            className={`w-60 px-6 py-3 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === "cars"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Cars
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-60 px-6 py-3 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/50 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {!loading && activeTab === "cars" && (
        <div className="flex flex-col items-end w-full max-w-6xl py-4">
          <Button
            label="Add Car"
            icon={Plus}
            variant="primary"
            onClick={() => setModalOpen(true)}
            className="px-5 py-2"
          />
          <div className="mt-6 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {cars.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
                No cars found. Add your first car to get started.
              </div>
            ) : (
              cars.map((car) => {
                return (
                  <div
                    key={car.id}
                    className="bg-white rounded-lg border hover:shadow-lg transition overflow-hidden flex flex-col shadow-2xl"
                  >
                    {car.image && (
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisPrXvsTOUuWve63ak5GDQbGcWuwlgIvSbg&s";
                        }}
                      />
                    )}
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {car.name}
                        </h3>
                        <div className="text-sm text-gray-600 mb-3">
                          <div>${car.day_rate}/day</div>
                          <div>${car.month_rate}/month</div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-auto">
                        <Button
                          label="Edit"
                          icon={Edit2}
                          onClick={() => {
                            setEditingCar(car);
                            setModalOpen(true);
                          }}
                        />
                        <Button
                          label="Delete"
                          icon={Trash2}
                          variant="danger"
                          onClick={() => handleDeleteCar(car.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {!loading && activeTab === "orders" && (
        <div className="flex flex-col items-end w-full max-w-6xl py-4">
          <Button
            label="Add Order"
            icon={Plus}
            variant="primary"
            onClick={() => setModalOpen(true)}
            className="px-5 py-2"
          />
          <div className="mt-6 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2  gap-6">
            {orders.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500 border border-dashed rounded-lg">
                No orders found. Create your first order to get started.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition "
                >
                  <div className="flex flex-col">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {getCarName(order.car_id)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium text-gray-700">
                          Order #{order.id}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Ordered on {formatDate(order.order_date)}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar size={16} className="text-blue-500" />
                        <span>
                          {formatDate(order.pickup_date)} →{" "}
                          {formatDate(order.dropoff_date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin size={16} className="text-green-500" />
                        <span>
                          {order.pickup_location} → {order.dropoff_location}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-start md:justify-end items-start gap-2 mt-4 md:mt-0">
                      <Button
                        label="Edit"
                        icon={Edit2}
                        onClick={() => {
                          setEditingOrder(order);
                          setModalOpen(true);
                        }}
                      />

                      <Button
                        label="Delete"
                        icon={Trash2}
                        variant="danger"
                        onClick={() => handleDeleteOrder(order.id)}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCar(null);
          setEditingOrder(null);
        }}
      >
        {activeTab === "cars" && (
          <CarForm
            car={editingCar || undefined}
            onSubmit={editingCar ? handleUpdateCar : handleCreateCar}
            onCancel={() => {
              setEditingCar(null);
              setModalOpen(false);
            }}
          />
        )}
        {activeTab === "orders" && (
          <OrderForm
            order={editingOrder || undefined}
            cars={cars}
            onSubmit={editingOrder ? handleUpdateOrder : handleCreateOrder}
            onCancel={() => {
              setEditingOrder(null);
              setModalOpen(false);
            }}
          />
        )}
      </Modal>
    </section>
  );
}

export default App;
