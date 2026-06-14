"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pl = collapsed ? "md:pl-[76px]" : "md:pl-[264px]";

  useCurrentUser();

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "rgb(var(--c-bg))" }}
    >
      <div className="hidden md:flex">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>
      <div
        className={`flex flex-col flex-1 min-w-0 ${pl} transition-[padding] duration-300`}
      >
        <Header onMenuToggle={() => setCollapsed(!collapsed)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
