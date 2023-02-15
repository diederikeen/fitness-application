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

export function FolderDialog({ closeDialog, isDialogOpen }: Props) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: toFormikValidationSchema(folderPayloadSchema),
    onSubmit: async (values) => {
      await handleFormSubmit(values);
      await queryClient.invalidateQueries(["folders"]);
      closeDialog();
      addToast({ message: "Folder created successfully", state: "success" });
    },
  });

  return (
    <Dialog.Root onClose={closeDialog} isOpen={isDialogOpen}>
      <Typography css={{ mb: "$6" }} as="h2">
        Add new folder
      </Typography>
      <FormikProvider value={formik}>
        <FormComposer fields={fields} buttonLabel="Add folder" />
      </FormikProvider>
    </Dialog.Root>
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
