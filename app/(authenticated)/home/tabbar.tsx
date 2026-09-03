// app/home/tabbar.tsx
"use client";

import Link from "next/link";
import LogoutButton from "../logout-button";

// Importando ícones do Heroicons
import { HomeIcon, DocumentTextIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline";

export default function Tabbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around items-center p-3">
      <Link href="/home" className="flex flex-col items-center">
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/proposal" className="flex flex-col items-center">
        <DocumentTextIcon className="h-6 w-6" />
        <span className="text-xs">Proposal</span>
      </Link>
      <Link href="/receipt" className="flex flex-col items-center">
        <ReceiptRefundIcon className="h-6 w-6" />
        <span className="text-xs">Receipt</span>
      </Link>
      <LogoutButton />
    </nav>
  );
}
