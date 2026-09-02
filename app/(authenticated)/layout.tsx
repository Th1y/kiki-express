// app/(authenticated)/layout.tsx
import Sidebar from "./home/sidebar";

export default function authenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
        className="flex flex-col h-screen">
            <div className="flex flex-1">
                {/* Sidebar on left */}
                <Sidebar/>

                {/* Main content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}