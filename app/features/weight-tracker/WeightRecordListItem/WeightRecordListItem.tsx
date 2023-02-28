import { UilCheck, UilPen, UilTimes, UilTrash } from "@iconscout/react-unicons";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useQueryClient } from "react-query";
import * as yup from "yup";

import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import { Typography } from "@/components/Typography/Typography";
import { API_URL } from "@/config/index";
import { IWeightRecord } from "@/utils/types";
import { useToast } from "@/utils/useToast/useToast";

interface Props {
  record: IWeightRecord;
  onDeleteClick: () => void;
}

export function WeightRecordListItem({ record, onDeleteClick }: Props) {
  const { addToast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      weight: record.weight,
    },
    validationSchema,
    onSubmit: async (values) => {
      await updateWeight(record.id, values.weight);
      await queryClient.invalidateQueries("weight");

      setIsEditMode(false);
      addToast({ message: "Record successfully updated", state: "success" });
    },
  });

  return (
    <Box
      key={record.id}
      css={{
        py: "$3",
        borderBottom: "1px solid $grey100",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        "&:last-child": {
          border: "none",
        },
      }}
    >
      {isEditMode ? (
        <>
          <FormikProvider value={formik}>
            <FormComposer
              fields={fields}
              customSubmitButton={true}
            ></FormComposer>

            <Box css={{ ml: "auto", display: "flex" }}>
              <Button ghost small onClick={() => setIsEditMode(false)}>
                <UilTimes />
              </Button>
              <Button
                ghost
                small
                type="submit"
                css={{ color: "$success" }}
                // TODO: find nicer way of doing this
                // @ts-expect-error
                onClick={formik.handleSubmit}
              >
                <UilCheck />
              </Button>
            </Box>
          </FormikProvider>
        </>
      ) : (
        <>
          <Box as="span" css={{ display: "flex", flexDirection: "column" }}>
            <Typography as="strong" css={{ display: "block" }}>
              {record.weight}KG
            </Typography>
            <Typography css={{ color: "$grey400" }}>
              {new Intl.DateTimeFormat("nl-NL").format(new Date(record.date))}
            </Typography>
          </Box>

          <Box css={{ ml: "auto" }}>
            <Button ghost small onClick={() => setIsEditMode(true)}>
              <UilPen />
            </Button>

            <Button
              onClick={onDeleteClick}
              ghost
              small
              css={{ color: "$error" }}
            >
              <UilTrash />
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

const validationSchema = yup.object({
  weight: yup.number().required(),
});

async function updateWeight(
  id: IWeightRecord["id"],
  weight: IWeightRecord["id"]
) {
  return await axios.patch(`${API_URL}/api/weight`, {
    id,
    weight,
  });
}

const fields: IField[] = [
  {
    name: "weight",
    type: "number",
    step: "0.01",
    inline: true,
  },
];
