import ClientProvider from "@/api/ClientProvider";
import ToastProvider from "@/components/ToastProvider";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Karga Karga Kanban",
  description: "Kanban Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
