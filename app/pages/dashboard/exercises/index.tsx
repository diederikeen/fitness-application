import { UilPlus } from "@iconscout/react-unicons";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import z from "zod";

import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "@/components/Typography/Typography";
import { ExerciseDialog } from "@/features/exercises/ExerciseDialog/ExerciseDialog";
import { FolderDialog } from "@/features/exercises/FolderDialog/FolderDialog";
import { FolderOverview } from "@/features/exercises/FolderOverview/FolderOverview";
import { MAX_MAIN_CARD_SIZE } from "@/styles/theme";
import { IFolder } from "@/utils/types";

function ExercisesPage() {
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);

  const { data: folders, isLoading } = useQuery(
    ["folders"],
    async () => await fetchFolders()
  );

  return (
    <ProtectedDashboard>
      <>
        <Box
          css={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography as="h1">Exercise library</Typography>

          <Button
            type="button"
            small
            onClick={() => setIsExerciseDialogOpen(true)}
            css={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            Add new exercise
            <Box as="span" css={{ ml: "$2", color: "inherit", height: "24px" }}>
              <UilPlus />
            </Box>
          </Button>
        </Box>

        <Typography as="p" css={{ maxWidth: MAX_MAIN_CARD_SIZE }}>
          Create your exercises library so you can kickoff your workouts. For
          example you can create a folder for each workout day you have. But
          please note, you can still mix exercises during the workout.
        </Typography>

        <Box
          css={{
            containerType: "inline-size",
            containerName: "folder-overview",
            marginTop: "$8",
          }}
        >
          <Box css={{ display: "flex", alignItems: "center", mb: "$4" }}>
            <Typography as="h2" css={{ fontSize: "$6" }}>
              Folders
            </Typography>

            <Button
              type="button"
              small
              ghost
              onClick={() => setIsFolderDialogOpen(true)}
              css={{
                ml: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              Add new folder
              <Box
                as="span"
                css={{ ml: "$2", color: "inherit", height: "24px" }}
              >
                <UilPlus />
              </Box>
            </Button>
          </Box>
          {folders != null && folders.length > 0 ? (
            <FolderOverview folders={folders} isLoading={isLoading} />
          ) : null}
        </Box>
        <FolderDialog
          closeDialog={() => setIsFolderDialogOpen(false)}
          isDialogOpen={isFolderDialogOpen}
        />
        <ExerciseDialog
          closeDialog={() => setIsExerciseDialogOpen(false)}
          isDialogOpen={isExerciseDialogOpen}
          folders={folders}
        />
      </>
    </ProtectedDashboard>
  );
}

const folderResponseSchema = z.array(
  z.object({
    name: z.string(),
    id: z.number(),
    exercises: z.array(
      z.object({
        name: z.string(),
      })
    ),
  })
);

async function fetchFolders() {
  const folders = await axios.get("/api/folder/get-folders");
  return folderResponseSchema.parse(folders.data.folders) as IFolder[];
}

export default ExercisesPage;