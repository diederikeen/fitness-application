import { UilPlus } from "@iconscout/react-unicons";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "react-query";
import z from "zod";

import { Box } from "@/components/Box/Box";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "@/components/Typography/Typography";
import { API_URL } from "@/config/index";
import { ExerciseRow } from "@/features/folder/ExerciseRow/ExerciseRow";
import { MAX_MAIN_CARD_SIZE } from "@/styles/theme";

import { exerciseSchema } from "../index";

interface Props {
  folderId?: string;
}

function ExerciseDetailPage({ folderId }: Props) {
  const { data: folder, isLoading } = useQuery(
    [`folder-${folderId}`],
    async () => await fetchFolder(folderId as string)
  );

  if (isLoading || folder == null) {
    return <ProtectedDashboard>loading...</ProtectedDashboard>;
  }

  const hasExercises = folder.exercises.length > 0;

  return (
    <ProtectedDashboard>
      <Breadcrumbs currentPage={folder.name} />

      <Box css={{ maxWidth: MAX_MAIN_CARD_SIZE }}>
        <Typography as="h1">{folder.name}</Typography>

        {hasExercises ? (
          <Card css={{ py: 0, px: 0, mt: " $6" }}>
            {folder.exercises.map((exercise) => (
              <ExerciseRow exercise={exercise} key={exercise.id} />
            ))}
          </Card>
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
      </Box>
    </ProtectedDashboard>
  );
}

async function fetchFolder(id: string) {
  const folder = await axios.get(`${API_URL}/api/folders/single`, {
    params: {
      id,
    },
  });

  return folderSchema.parse(folder.data.folder);
}

const folderSchema = z.object({
  name: z.string(),
  exercises: z.array(exerciseSchema),
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const folderId = context.params?.id;

  return {
    props: {
      folderId,
    },
  };
}

export default ExerciseDetailPage;
