import { redirect } from "next/navigation";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import AdminDashboard from "@/components/AdminDashboard";
import OwnerDashboard from "@/components/OwnerDashboard";

const Dashboard = async () => {
  const user = await getCurrentSignInUserServer();

 
  if (!user) return redirect("/login?callbackUrl=/dashboard");

  return (
    <>
      {user.user.role === "ADMIN" && <AdminDashboard />}
      {user.user.role === "OWNER" && <OwnerDashboard />}
    </>
  );
};

export default Dashboard;


