import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "@/components/Typography/Typography";

function WorkoutsPage() {
  return (
    <ProtectedDashboard>
      <Typography as="h1">Your workouts</Typography>
      <Typography>
        Here you can find your most recent workouts or start a new workout.
      </Typography>
    </ProtectedDashboard>
  );
}

export default WorkoutsPage;
