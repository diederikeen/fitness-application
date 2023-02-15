import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import { useQueryClient } from "react-query";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Dialog } from "@/components/Dialog/Dialog";
import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import { Typography } from "@/components/Typography/Typography";
import { useToast } from "@/utils/useToast/useToast";

interface Props {
  closeDialog: () => void;
  isDialogOpen: boolean;
}

export function ExerciseDialog({ closeDialog, isDialogOpen }: Props) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: toFormikValidationSchema(exercisePayloadSchema),
    onSubmit: async (values) => {
      await handleFormSubmit(values);
      await queryClient.invalidateQueries(["folders", "exercises"]);
      closeDialog();
      addToast({ message: "Exercise created successfully", state: "success" });
    },
  });

  return (
    <Dialog.Root onClose={closeDialog} isOpen={isDialogOpen}>
      <Typography css={{ mb: "$6" }} as="h2">
        Add new exercise
      </Typography>
      <FormikProvider value={formik}>
        <FormComposer fields={fields} buttonLabel="Add exercise" />
      </FormikProvider>
    </Dialog.Root>
  );
}

const fields: IField[] = [
  {
    name: "name",
    type: "text",
    label: "Exercise name",
  },
];

const exercisePayloadSchema = z.object({
  name: z.string(),
});

async function handleFormSubmit(values: z.infer<typeof exercisePayloadSchema>) {
  return await axios.post("/api/exercise/create-exercise", { ...values });
}
