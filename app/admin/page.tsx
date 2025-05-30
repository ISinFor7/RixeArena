import LoginForm from "@/components/admin-login";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Banned } from "@/lib/admin";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Don't cache admin pages

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || !session.user.admin || await Banned(session.user.name as string)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {<LoginForm />}
      </div>
    );
  }
  if (session.user.name == "MickScarecrow") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          Bonjour, {session.user.name}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/admin/users" >
            <Button className="bg-foreground text-accent  border-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-foreground hover:border-foreground transition-colors shadow-lg">
              Gérer les Admin
            </Button>
          </Link>
          <Link href="/admin/events" >
            <Button className="bg-foreground text-accent  border-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-foreground hover:border-foreground transition-colors shadow-lg">
              Gérer les events
            </Button>
          </Link>
          <Button className="bg-destructive text-foreground  border-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-destructive/80 hover:text-foreground hover:border-foreground transition-colors shadow-lg" onClick={async () => {"use server"; await signOut()}}>Déconnection</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Bonjour, {session.user.name}</h1>
      <div>
        <Link href="/admin/events" className="bg-foreground text-accent  border-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-foreground hover:border-foreground transition-colors shadow-lg">
          Gérer les events
        </Link>
        <Button className="bg-destructive text-foreground  border-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-destructive/80 hover:text-foreground hover:border-foreground transition-colors shadow-lg" onClick={async () => {"use server"; await signOut()}}>Déconnection</Button>
      </div>
    </div>
  );
}
