// src/components/CreateNGOButton.tsx
"use client";

import { useState } from "react";
import NGOForm from "@/components/NGOForm";
import { toast } from "react-toastify";

export default function CreateNGOButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700"
      >
        Create New NGO
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Create New NGO</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-4xl leading-none"
              >
                ×
              </button>
            </div>

            <NGOForm onSuccess={() => {
              setIsOpen(false);
              toast.success("NGO created successfully!");
              window.location.reload();
            }} />
          </div>
        </div>
      )}
    </>
  );
}