import { useForm } from "react-hook-form";
import type { Car, OrderType } from "../types/car";
import Button from "./Button";
import { Upload, X } from "lucide-react";

const OrderForm: React.FC<{
  order?: OrderType;
  cars: Car[];
  onSubmit: (data: Omit<OrderType, "id">) => void;
  onCancel: () => void;
}> = ({ order, cars, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<OrderType, "id">>({
    defaultValues: order
      ? {
          car_id: order.car_id,
          order_date: order.order_date,
          pickup_date: order.pickup_date,
          dropoff_date: order.dropoff_date,
          pickup_location: order.pickup_location,
          dropoff_location: order.dropoff_location,
        }
      : {
          order_date: new Date().toISOString().split("T")[0],
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        {order ? "Edit Order" : "Create New Order"}
      </h3>

      {/* Car Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Car
        </label>
        <select
          {...register("car_id", { required: "Please select a car" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a car...</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name} - ${car.day_rate}/day
            </option>
          ))}
        </select>
        {errors.car_id && (
          <p className="text-red-500 text-sm mt-1">{errors.car_id.message}</p>
        )}
      </div>

      {/* Order Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Order Date
        </label>
        <input
          {...register("order_date", { required: "Order date is required" })}
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.order_date && (
          <p className="text-red-500 text-sm mt-1">
            {errors.order_date.message}
          </p>
        )}
      </div>

      {/* Pickup & Dropoff Date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Date
          </label>
          <input
            {...register("pickup_date", {
              required: "Pickup date is required",
            })}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pickup_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pickup_date.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dropoff Date
          </label>
          <input
            {...register("dropoff_date", {
              required: "Dropoff date is required",
            })}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dropoff_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dropoff_date.message}
            </p>
          )}
        </div>
      </div>

      {/* Pickup & Dropoff Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            {...register("pickup_location", {
              required: "Pickup location is required",
            })}
            placeholder="Enter pickup location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pickup_location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pickup_location.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dropoff Location
          </label>
          <input
            {...register("dropoff_location", {
              required: "Dropoff location is required",
            })}
            placeholder="Enter dropoff location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dropoff_location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dropoff_location.message}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          label="Cancel"
          icon={X}
          variant="danger"
          onClick={onCancel}
          className="px-5 py-2"
        />
        <Button
          label="Submit"
          icon={Upload}
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          className="px-5 py-2"
        />
      </div>
    </form>
  );
};

export default OrderForm;
