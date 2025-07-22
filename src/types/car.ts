export interface Car {
  id: string;
  name: string;
  image: string;
  month_rate: number | string;
  day_rate: number | string;
}

export interface OrderType {
  car_id: string;
  order_date: Date | string;
  pickup_date: Date | string;
  dropoff_date: Date | string;
  pickup_location: string;
  dropoff_location: string;
  id: string;
  image: string;
  month_rate: string;
  day_rate: string;
}
