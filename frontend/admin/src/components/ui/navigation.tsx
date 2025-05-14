"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
    { href: "/", label: "Dashboard" },
    { href: "/products", label: "Produtos" },
    { href: "/categories", label: "Categorias" },
    { href: "/orders", label: "Pedidos" },
];

const Navigation = React.forwardRef(function Navigation() {
    const pathname = usePathname();

    return (
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
    );
});

Navigation.displayName = "Navigation";

export { Navigation };