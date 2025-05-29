import {
  getAllUsersFromDb,
  deleteUserFromDb,
  createUserInDb,
  Banned,
} from "@/lib/admin";
import { auth } from "@/auth";
import { User2Icon } from "lucide-react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge";
import LoginForm from "@/components/admin-login";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { redirect } from 'next/navigation'

export const revalidate = 0; // Don't cache admin pages

async function deleteUserAction(f: FormData) {
  "use server";
  console.log(f);
  const name = f.get("name") as string;
  await deleteUserFromDb(name);
  revalidatePath("/admin/users");
}

async function addUserAction(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  if (!name) throw new Error("Pseudo is required");
  await createUserInDb({ name } as User);
  revalidatePath("/admin/users");
}

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user || !session.user.admin || await Banned(session.user.name as string)) {
    redirect("/admin");
  }
  if (session.user.name == "MickScarecrow") {
    const users = await getAllUsersFromDb();
    if (!users || users.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          Aucun utilisateur trouvé.
        </div>
      );
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Utilisateurs</h1>
        {/* Add User Form */}
        <form
          action={addUserAction}
          className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-end"
        >
          {/*<input name="name" type="text" placeholder="Nom" className="border rounded px-3 py-2" />*/}
          <input
            name="name"
            type="name"
            placeholder="P"
            className="border rounded px-3 py-2"
            required
          />
          <Button type="submit">Ajouter un utilisateur</Button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: User) => (
            <form key={user.name} action={deleteUserAction}>
              <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <User2Icon className="h-6 w-6 text-primary mr-2" />
                  <h2 className="text-xl font-semibold">
                    {user.name || user.name}
                  </h2>
                </div>
                <p>Pseudo: {user.name}</p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  readOnly
                  hidden
                  value={user.name?.toString ? user.name : ""}
                />
                {/*<Badge className="mt-2">{user.role || "Utilisateur"}</Badge>*/}
                <Button type="submit" variant="destructive">
                  Supprimer
                </Button>
              </div>
            </form>
          ))}
        </div>
      </div>
    );
  }
  return notFound();
}
