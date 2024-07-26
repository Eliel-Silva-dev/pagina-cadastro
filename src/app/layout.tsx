import type { Metadata } from "next";

import { Lato } from "next/font/google";

import { Suspense } from "react";

import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Cadastro | Hydrah Tec",
  description: "",
  keywords: "",
  icons: "",
  robots: "index, follow",
  authors: [{ name: "Eliel Silva", url: "https://github.com/Eliel-Silva-dev" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={lato.className}>
        <Suspense fallback={<div>Carregando dados da pagina...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
