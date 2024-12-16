import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "@/styles/globals.css";
import AppSidebar from "./_components/AppSidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <>
        <SidebarTrigger />
        {children}
      </>
    </SidebarProvider>
  );
}
