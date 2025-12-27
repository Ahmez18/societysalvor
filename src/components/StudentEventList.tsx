// src/components/StudentEventList.tsx
"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import CertificatePDF from "@/components/CertificatePDF";

type Event = {
  id: string;
  name: string;
  type: "SELL" | "DONATION";
  date: Date | null;
  ngo: { name: string } | null;
  school: { name: string };
};

type Props = {
  events: Event[];
};

export default function StudentEventList({ events }: Props) {
  const studentName = "John Doe"; // Replace with real name from session later

  if (events.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No completed events with participation yet. Join an ongoing event!
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">{event.name}</h3>
          <p className="text-gray-600 mb-2">
            {event.school.name} • {event.date ? new Date(event.date).toLocaleDateString() : "Date TBD"}
          </p>
          {event.ngo && <p className="text-green-700 font-medium mb-6">Donated to {event.ngo.name}</p>}

          <PDFDownloadLink
            document={<CertificatePDF event={event} studentName={studentName} />}
            fileName={`EcoChamp-${event.name.replace(/\s+/g, "-")}.pdf`}
          >
            {({ loading }) => (
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700">
                {loading ? "Generating..." : "Download Certificate"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      ))}
    </div>
  );
}