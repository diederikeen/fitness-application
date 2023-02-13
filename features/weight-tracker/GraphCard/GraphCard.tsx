import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import { useQueryClient } from "react-query";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Box } from "@/components/Box/Box";
import { Card } from "@/components/Card/Card";
import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import { LineGraph } from "@/components/LineGraph/LineGraph";
import { MAX_MAIN_CARD_SIZE } from "@/styles/theme";
import { IWeightRecord } from "@/utils/types";
import { useToast } from "@/utils/useToast/useToast";

interface Props {
  records: IWeightRecord[];
}

export function GraphCard({ records }: Props) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      weight: "",
    },
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(weightValidationSchema),
    onSubmit: async (values) => {
      await addWeightRecord(parseFloat(values.weight));
      await queryClient.invalidateQueries("weight");

      addToast({
        message: "Weight record successfully added",
        state: "success",
      });
    },
  });

  const lastItem = records.length > 0 ? records[records.length - 1] : undefined;

  const isButtonDisabled =
    lastItem !== undefined
      ? new Date(lastItem.date).getDay() === new Date().getDay()
      : false;

  return (
    <Card css={{ flexGrow: 1, maxWidth: MAX_MAIN_CARD_SIZE }}>
      <h3>Graph</h3>

      <Box css={{ mt: "$5" }}>
        <LineGraph data={records} dataKey="weight" />
      </Box>

      <Box css={{ mt: "$5" }}>
        <FormikProvider value={formik}>
          <FormComposer
            inline
            fields={weightFields}
            buttonLabel="Add"
            isSubmitButtonDisabled={isButtonDisabled}
          />
        </FormikProvider>
      </Box>
    </Card>
  );
}

async function addWeightRecord(weight: number) {
  const record = await axios.post("/api/weight/add-weight", {
    weight,
  });

  return record.data;
}

const weightFields: IField[] = [
  {
    name: "weight",
    type: "number",
    label: "Today my weight is:",
    step: ".01",
  },
];

const weightValidationSchema = z.object({
  weight: z.number(),
});
