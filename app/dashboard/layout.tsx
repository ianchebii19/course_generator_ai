import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            <div>
                <Header/>
          {children}
          
            </div>
        </div>
    );
  }
  