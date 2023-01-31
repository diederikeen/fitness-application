import ProtectedDashboard from "../../components/ProtectedDashboard/ProtectedDashboard";

function WeightTracker() {
  return (
    <ProtectedDashboard>
      <h1>Weight</h1>
      <p>
        Keep track of your weight history, see patterns, lines and more. Set
        goals to be on top of your data .
      </p>
    </ProtectedDashboard>
  );
}

export default WeightTracker;
