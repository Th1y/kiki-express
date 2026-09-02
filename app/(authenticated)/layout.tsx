// app/(authenticated)/layout.tsx
import Sidebar from "./home/sidebar";
import Tabbar from "./home/tabbar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar visible only on medium or larger screens */}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Tabbar visible only on medium or larger screens */}
      <div className="md:hidden">
        <Tabbar />
      </div>
    </div>
  );
}
