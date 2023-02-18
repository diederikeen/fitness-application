import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import { useQueryClient } from "react-query";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Dialog } from "@/components/Dialog/Dialog";
import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import { Typography } from "@/components/Typography/Typography";
import { useToast } from "@/utils/useToast/useToast";

import { IFolder } from "../../../pages/dashboard/exercises/folders/[id]";

interface Props {
  closeDialog: () => void;
  isDialogOpen: boolean;
  folders?: IFolder[];
}

export function ExerciseDialog({ closeDialog, isDialogOpen, folders }: Props) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      addToFolder: false,
      folderId:
        folders != null && folders?.length > 0 ? folders[0].id : undefined,
    },
    validationSchema: toFormikValidationSchema(exercisePayloadSchema),
    onSubmit: async (values) => {
      await handleFormSubmit(values);
      await queryClient.invalidateQueries(["folders"]);
      closeDialog();
      addToast({ message: "Exercise created successfully", state: "success" });
    },
  });

  const fields = getDefaultFields(folders?.length ?? 0);
  const addToFolder = formik.values.addToFolder;

  return (
    <Dialog.Root onClose={closeDialog} isOpen={isDialogOpen}>
      <Typography css={{ mb: "$6" }} as="h2">
        Add new exercise
      </Typography>
      <FormikProvider value={formik}>
        <FormComposer
          fields={
            addToFolder
              ? [...fields, ...renderWithFolders(folders as IFolder[])]
              : fields
          }
          buttonLabel="Add exercise"
        />
      </FormikProvider>
    </Dialog.Root>
  );
}

function renderWithFolders(folders: IFolder[]): IField[] {
  return [
    {
      title: "Existing folders",
      name: "folderId",
      id: "folderId",
      type: "select",
      defaultValue: folders[0].id,
      options: folders.map((folder) => ({
        value: folder.id,
        label: folder.name,
      })),
    },
  ];
}

function getDefaultFields(amountOfFolders: number): IField[] {
  const folderOption = {
    name: "addToFolder",
    type: "checkbox",
    label: "Add to existing folder",
  };

  let options = [
    {
      name: "name",
      type: "text",
      label: "Exercise name",
    },
  ];

  if (amountOfFolders > 0) {
    options = [...options, { ...folderOption }];
  }

  return options;
}

const exercisePayloadSchema = z.object({
  name: z.string(),
  folderId: z.string().nullish(),
});

async function handleFormSubmit(values: any) {
  return await axios.post("/api/exercise/create-exercise", {
    ...values,
  });
}
