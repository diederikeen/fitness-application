import { UilPlus } from "@iconscout/react-unicons";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

import { Box } from "@/components/Box/Box";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/Button/Button";
import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "@/components/Typography/Typography";
import { server } from "@/config/index";

interface TExercise {
  name: string;
  id: number;
}

export interface IFolder {
  name: string;
  id: number;
  exercises: TExercise[];
}

interface Props {
  folder: IFolder;
}

function ExerciseDetailPage({ folder }: Props) {
  const hasExercises = folder.exercises.length > 0;

  return (
    <ProtectedDashboard>
      <Breadcrumbs currentPage={folder.name} />

      <Typography as="h1">{folder.name}</Typography>
      {hasExercises ? (
        folder.exercises.map((exercise) => (
          <span key={exercise.id}>{exercise.name}</span>
        ))
      ) : (
        <>
          <Typography>Looks like this folder is empty.</Typography>
          <Button css={{ display: "flex", alignItems: "center" }}>
            Add exercises
            <Box as="span" css={{ height: "24px", ml: "$2" }}>
              <UilPlus />
            </Box>
          </Button>
        </>
      )}
    </ProtectedDashboard>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const folderId = context.params?.id;

  const folder = await axios.get(`${server}/api/folder/get-folder`, {
    params: {
      folderId,
    },
  });

  return {
    props: {
      folder: folder.data.folder,
    },
  };
}

export default ExerciseDetailPage;
