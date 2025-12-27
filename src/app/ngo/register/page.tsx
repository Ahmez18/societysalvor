// src/app/ngo/register/page.tsx
import NGORegisterForm from "@/components/NGORegisterForm";

export default function NGORegisterPage() {
  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">NGO Registration</h1>
      <p className="text-center text-gray-600 mb-10">
        Submit your organization details for approval. Once approved, you'll gain access to donation tracking.
      </p>

      <NGORegisterForm />
    </div>
  );
}