// app/home/sidebar.tsx
"use client";

import Link from "next/link";
import LogoutButton from "../logout-button";

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
            
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            <nav className="flex flex-col gap-3">
                <Link href={"/home"} className="hover:underline">Home</Link>
                <Link href={"/proposal"} className="hover:underline">Proposal</Link>
                <Link href={"/receipt"} className="hover:underline">Receipt</Link>
            </nav>
            <LogoutButton/>        
        </aside>
    );
}