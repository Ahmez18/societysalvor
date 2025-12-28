// src/app/vehicle/page.tsx
import VehicleScrapForm from "@/components/VehicleScrapForm";

export default function VehiclePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sell Your Old Vehicle</h1>
      <p className="text-center text-gray-600 mb-10">
        Get the best price for your car, bike, or truck. We collect end-of-life vehicles for responsible recycling.
      </p>

      <VehicleScrapForm />
    </div>
  );
}