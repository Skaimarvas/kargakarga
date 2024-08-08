import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <SideBar />
        <div className="flex-grow overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
