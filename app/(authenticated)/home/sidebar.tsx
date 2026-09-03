// app/home/sidebar.tsx
"use client";

import Link from "next/link";
import LogoutButton from "../logout-button";

// importing icons from Heroicons
import { HomeIcon, DocumentTextIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            <nav className="flex flex-col gap-3">
                <Link href="/home"  className="flex items-center hover:underline">
                    <HomeIcon className="h-5 w-5"/>
                    <span>Home</span>
                </Link>
                <Link href="/proposal" className="flex items-center hover:underline">
                    <DocumentTextIcon className="h-5 w-5"/>
                    <span>Proposal</span>
                </Link>
                <Link href="/receipt" className="flex items-center hover:underline">
                    <ReceiptRefundIcon className="h-5 w-5"/>
                    <span>Receipt</span>
                </Link>
            </nav>
            <LogoutButton/>        
        </aside>
    );
}