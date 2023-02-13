import { UilPlus } from "@iconscout/react-unicons";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Dialog } from "@/components/Dialog/Dialog";
import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "@/components/Typography/Typography";
import { MAX_MAIN_CARD_SIZE, styled } from "@/styles/theme";

function ExercisesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: toFormikValidationSchema(folderPayloadSchema),
    onSubmit: async (values) => {
      await handleFormSubmit(values);
      await queryClient.invalidateQueries(["folders"]);
    },
  });

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
            onClick={() => setIsDialogOpen(true)}
            css={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            Add new folder
            <Box as="span" css={{ ml: "$2", color: "inherit", height: "24px" }}>
              <UilPlus></UilPlus>
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
          <Typography as="h2" css={{ mb: "$4", fontSize: "$6" }}>
            Folders
          </Typography>
          <Box
            css={{
              display: "grid",
              gap: "$2",
              gridTemplateColumns: "repeat(1, 1fr)",

              "@container folder-overview (min-width: 600px)": {
                gridTemplateColumns: "repeat(2, 1fr)",
              },

              "@container folder-overview (min-width: 900px)": {
                gridTemplateColumns: "repeat(4, 1fr)",
              },
            }}
          >
            {isLoading && <Typography>Getting your folders.</Typography>}
            {folders?.map((folder) => (
              <StyledLink
                href={`./exercises/folders/${folder.id}`}
                key={folder.id}
              >
                <Card
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    css={{ fontWeight: "bold" }}
                    className="folder-title"
                  >
                    {folder.name}
                  </Typography>

                  <Typography
                    css={{ fontSize: "$2", color: "$grey400", mt: "0" }}
                  >
                    Number of exercises:{" "}
                    <strong>({folder.exercises.length})</strong>
                  </Typography>
                </Card>
              </StyledLink>
            ))}
          </Box>
        </Box>

        <Dialog.Root
          onClose={() => setIsDialogOpen(false)}
          isOpen={isDialogOpen}
        >
          <Typography css={{ mb: "$6" }} as="h2">
            Add new folder
          </Typography>
          <FormikProvider value={formik}>
            <FormComposer fields={fields} buttonLabel="Add folder" />
          </FormikProvider>
        </Dialog.Root>
      </>
    </ProtectedDashboard>
  );
}

const fields: IField[] = [
  {
    name: "name",
    type: "text",
    label: "Folder name",
  },
];

const folderPayloadSchema = z.object({
  name: z.string(),
});

async function handleFormSubmit(values: z.infer<typeof folderPayloadSchema>) {
  return await axios.post("/api/folder/create-folder", { ...values });
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
  return folderResponseSchema.parse(folders.data.folders);
}

const StyledLink = styled(Link, {
  textDecoration: "none",

  "&:hover .folder-title": {
    color: "$secondaryColor",
  },
});

export default ExercisesPage;
