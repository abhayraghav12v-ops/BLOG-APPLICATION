import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main className='w-full'>
        <div className='w-full min-h-[calc(100vh-45px)] py-28 px-10'>
        <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
