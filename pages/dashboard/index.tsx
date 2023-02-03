import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";

function DashboardPage() {
  return (
    <ProtectedDashboard>
      <h1>Dashboard</h1>
    </ProtectedDashboard>
  );
}

export default DashboardPage;
