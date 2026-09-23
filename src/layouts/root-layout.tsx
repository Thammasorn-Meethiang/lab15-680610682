import { Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex min-h-screen flex-col">
        <header className="flex h-14 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-medium">ระบบลงทะเบียนเรียน</span>
          </div>
          <ModeToggle />
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <footer className="border-t border-border bg-card py-4 text-center text-sm text-muted-foreground">
          <p>จัดทำโดย: ธรรมสรณ์ มีเที่ยง | รหัสนักศึกษา: 680610682</p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
