// src/app/ecochamp/student/register/page.tsx
import StudentRegisterForm from "@/components/StudentRegisterForm";

export default function StudentRegisterPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Student Registration - EcoChamp</h1>
      <p className="text-center text-gray-600 mb-10">
        Enter your school's unique code to register and participate in eco drives.
      </p>

      <StudentRegisterForm />
    </div>
  );
}