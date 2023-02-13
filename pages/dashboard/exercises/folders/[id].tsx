import { GetServerSidePropsContext } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";

interface Props {
  exercise: {
    name: string;
    id: number;
  };
}

function ExerciseDetailPage(props: Props) {
  return (
    <ProtectedDashboard>
      <Breadcrumbs currentPage={props.exercise.name} />
      Hi there exercise {props.exercise.name} — {props.exercise.id}
    </ProtectedDashboard>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const exerciseId = context.params?.id;

  return {
    props: {
      exercise: {
        id: exerciseId,
        name: "My exercise",
      },
    },
  };
}

export default ExerciseDetailPage;
