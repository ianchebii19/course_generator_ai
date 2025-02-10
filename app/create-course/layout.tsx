
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex">
            <div className="z-0">
                <Sidebar/>
            </div>
            <div className="w-full">
                <Header/>
                
          {children}

            </div>
        </div>
    );
  }
  