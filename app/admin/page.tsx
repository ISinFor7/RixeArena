import LoginForm from "@/components/admin-login";
import { auth } from "@/auth";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
         {<LoginForm />}
      </div>
    );
  if (session.user.email !== "mick") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          Bonjour, {session.user.email}
        </h1>
        <div>
          <Link href="/admin/users" className="text-blue-500 hover:underline">
            Gérer les Admin
          </Link>
        </div>
        <div>
          <Link href="/admin/events" className="text-blue-500 hover:underline">
            Gérer les events
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Bonjour, {session.user.email}</h1>
      <div>
        <Link href="/admin/events" className="text-blue-500 hover:underline">
          Gérer les events
        </Link>
      </div>
    </div>
  );
}
