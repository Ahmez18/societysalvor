// src/app/ecochamp/student/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Student Dashboard - EcoChamp</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Link href="/ecochamp/student/upcoming" className="block p-10 bg-blue-600 text-white rounded-lg text-2xl hover:bg-blue-700 text-center">
          Upcoming Events
        </Link>

        <Link href="/ecochamp/student/participated" className="block p-10 bg-green-600 text-white rounded-lg text-2xl hover:bg-green-700 text-center">
          Participated Events
        </Link>
      </div>
    </div>
  );
}