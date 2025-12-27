// src/components/SchoolList.tsx
"use server";

type SchoolWithUsers = {
  id: string;
  name: string;
  address: string | null;
  contact: string | null;
  code: string;
  createdAt: Date;
  users: {
    email: string;
    name: string | null;
  }[];
};

type Props = {
  initialSchools: SchoolWithUsers[];
};

export default async function SchoolList({ initialSchools }: Props) {
  const schools = initialSchools;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">School Name</th>
            <th className="p-4">Contact</th>
            <th className="p-4">Login Email</th>
            <th className="p-4">Student Code</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id} className="border-t">
              <td className="p-4 font-medium">{school.name}</td>
              <td className="p-4">
                {school.contact}
                {school.address && (
                  <>
                    <br />
                    <span className="text-sm text-gray-600">{school.address}</span>
                  </>
                )}
              </td>
              <td className="p-4">
                {school.users.length > 0
                  ? (school.users[0].name || school.users[0].email)
                  : "No login created"}
              </td>
              <td className="p-4">
                <code className="bg-gray-100 px-3 py-1 rounded font-mono text-lg">
                  {school.code}
                </code>
                <p className="text-sm text-gray-600 mt-1">Share this code with students</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {schools.length === 0 && (
        <p className="text-center py-12 text-gray-500">No schools onboarded yet.</p>
      )}
    </div>
  );
}