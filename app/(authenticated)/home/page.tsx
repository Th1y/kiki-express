// app/home/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "./sidebar";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex">
      
      <Sidebar />
      <div className="flex-1 p-6">
        <h1>Bem-vindo {session.user?.name}</h1>
        <p>Email: {session.user?.email}</p>
      </div>
    </div>
  );
}
