import SideMenu from "@/components/SideMenu/SideMenu";

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex h-screen">
        <SideMenu />
        <main className="bg-slate-50 flex-1 overflow ">{children}</main>
    </div>
  ) 
}
