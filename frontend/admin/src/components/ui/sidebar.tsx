"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Produtos" },
  { href: "/categories", label: "Categorias" },
  { href: "/orders", label: "Pedidos" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "py-2 px-4 rounded hover:bg-gray-700 transition",
              pathname === href && "bg-gray-700"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
