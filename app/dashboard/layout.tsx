import AddCourse from "@/components/dashboard/AddCourse";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex">
            <div>
                <Sidebar/>
            </div>
            <div className="w-full">
                <Header/>
                <AddCourse/>
          {children}

            </div>
        </div>
    );
  }
  