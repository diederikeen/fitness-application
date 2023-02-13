import { UilPlus } from "@iconscout/react-unicons";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Dialog } from "@/components/Dialog/Dialog";
import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "@/components/Typography/Typography";
import { MAX_MAIN_CARD_SIZE } from "@/styles/theme";

// Todo: Get these out of a data base
const PLACEHOLDER_FOLDERS = [
  {
    id: 0,
    name: "Back day",
    exercises: [
      {
        id: 0,
        name: "Pull up",
      },
    ],
  },
  {
    id: 1,
    name: "Chest day",
    exercises: [
      {
        id: 0,
        name: "Bench press",
      },
    ],
  },
  {
    id: 2,
    name: "Leg day",
    exercises: [
      {
        id: 0,
        name: "Back squat",
      },
    ],
  },
];

function ExercisesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: toFormikValidationSchema(folderPayloadSchema),
    onSubmit: (values) => handleFormSubmit(values),
  });

  return (
    <ProtectedDashboard>
      <>
        <Box css={{ display: "flex", alignItems: "center" }}>
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
            marginTop: "$9",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "$2",
          }}
        >
          {PLACEHOLDER_FOLDERS.map((folder) => (
            <Card
              key={folder.id}
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography css={{ fontWeight: "bold" }}>
                {folder.name}
              </Typography>

              <Typography css={{ fontSize: "$2", color: "$grey400", mt: "$3" }}>
                Number of exercises:{" "}
                <strong>({folder.exercises.length})</strong>
              </Typography>
            </Card>
          ))}
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

function handleFormSubmit(values: z.infer<typeof folderPayloadSchema>) {}

export default ExercisesPage;
