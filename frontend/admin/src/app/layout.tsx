import { inter } from "@/components/ui/fonts/inter";
import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Painel Admin",
  description: "Gerencie produtos, categorias e pedidos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased bg-gray-100`}>
        <main className="p-6 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
