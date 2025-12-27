// src/app/admin/page.tsx
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Control Tower</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/scrap-items" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Scrap Items & Pricing</h2>
          <p className="text-gray-600">Manage what can be collected and base prices</p>
        </Link>
        <Link href="/admin/ngos" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
  <h2 className="text-2xl font-semibold mb-2">NGOs</h2>
  <p className="text-gray-600">Manage verified recipient NGOs</p>
</Link>
<Link href="/admin/vehicle" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
  <h2 className="text-2xl font-semibold mb-2">Vehicle Scrap Leads</h2>
  <p className="text-gray-600">Manage high-value vehicle collection leads</p>
</Link>
<Link href="/admin/schools" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
  <h2 className="text-2xl font-semibold mb-2">Schools (EcoChamp)</h2>
  <p className="text-gray-600">Onboard and manage participating schools</p>
</Link>
<Link href="/admin/ecochamp" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
  <h2 className="text-2xl font-semibold mb-2">EcoChamp Events</h2>
  <p className="text-gray-600">Manage school events and issue certificates</p>
</Link>
        <div className="p-6 bg-white rounded-lg shadow opacity-50">
          <h2 className="text-2xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-600">Coming soon</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow opacity-50">
          <h2 className="text-2xl font-semibold mb-2">Reps Management</h2>
          <p className="text-gray-600">Coming soon</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow opacity-50">
          <h2 className="text-2xl font-semibold mb-2">NGOs</h2>
          <p className="text-gray-600">Coming soon</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow opacity-50">
          <h2 className="text-2xl font-semibold mb-2">Schools & Events</h2>
          <p className="text-gray-600">Coming soon</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow opacity-50">
          <h2 className="text-2xl font-semibold mb-2">Reports</h2>
          <p className="text-gray-600">Coming soon</p>
        </div>
      </div>
    </div>
  );
}