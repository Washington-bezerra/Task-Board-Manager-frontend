import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";
import { Inter } from 'next/font/google';
import ClientProviders from '@/components/ClientProviders';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Let - Gerenciador de Listas",
  description: "Projeto pessoal para praticar Next.js com TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header>
          {/* ...header global, se quiser... */}
        </header>
        <ClientProviders>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </ClientProviders>
      </body>
    </html>
  );
}
