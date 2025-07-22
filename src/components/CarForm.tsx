import { useForm } from "react-hook-form";
import type { Car } from "../types/car";
import Button from "./Button";
import { Upload, X } from "lucide-react";

const CarForm: React.FC<{
  car?: Car;
  onSubmit: (data: Omit<Car, "id">) => void;
  onCancel: () => void;
}> = ({ car, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Car, "id">>({
    defaultValues: car
      ? {
          name: car.name,
          image: car.image,
          month_rate: car.month_rate,
          day_rate: car.day_rate,
        }
      : undefined,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        {car ? "Edit Car" : "Add New Car"}
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Car Name
        </label>
        <input
          {...register("name", { required: "Car name is required" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter car name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          {...register("image", { required: "Image URL is required" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter image URL"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Day Rate ($)
          </label>
          <input
            {...register("day_rate", { required: "Day rate is required" })}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
          {errors.day_rate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.day_rate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Month Rate ($)
          </label>
          <input
            {...register("month_rate", { required: "Month rate is required" })}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
          {errors.month_rate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.month_rate.message}
            </p>
          )}
        </div>
      </div>

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
    </div>
  );
};

export default CarForm;
