import type { Metadata } from "next";
import "../styles/globals.css";
import { QueryProvider } from "@/contexts/QueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { PreferencesProvider } from "@/contexts/PreferencesContext";

export const metadata: Metadata = {
  title: "Cifrinho",
  description: "Gestão financeira inteligente para a comunidade Juninhos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body>
        <QueryProvider>
          <AuthProvider>
            <PreferencesProvider>{children}</PreferencesProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
