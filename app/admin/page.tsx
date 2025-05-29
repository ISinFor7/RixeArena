import LoginForm from "@/components/admin-login";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Banned } from "@/lib/admin";

export const revalidate = 0; // Don't cache admin pages

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || !session.user.admin || await Banned(session.user.name as string)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {<LoginForm />}
      </div>
    );
  }
  if (session.user.name == "MickScarecrow") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          Bonjour, {session.user.name}
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
        <button onClick={async () => {"use server"; await signOut()}}>Sign Out</button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Bonjour, {session.user.name}</h1>
      <div>
        <Link href="/admin/events" className="text-blue-500 hover:underline">
          Gérer les events
        </Link>
      </div>
    </div>
  );
}
