import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";

import { Box } from "@/components/Box/Box";
import { Card } from "@/components/Card/Card";
import { FormComposer, IField } from "@/components/FormComposer/FormComposer";
import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "@/components/Typography/Typography";
import { DeleteRecordDialog } from "@/features/weight-tracker/DeleteRecordDialog/DeleteRecordDialog";
import { WeightGraph } from "@/features/weight-tracker/WeightGraph/WeightGraph";
import { WeightRecordListItem } from "@/features/weight-tracker/WeightRecordListItem/WeightRecordListItem";
import { MAX_MAIN_CARD_SIZE, styled } from "@/styles/theme";
import { IWeightRecord } from "@/utils/types";
import { useAuth } from "@/utils/useAuth/useAuth";

function WeightTrackerPage() {
  const { user } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState<
    IWeightRecord | undefined
  >(undefined);
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      weight: "",
    },
    validateOnBlur: true,
    validationSchema: weightValidationSchema,
    onSubmit: async (values) =>
      await addWeightRecord(parseFloat(values.weight)).then(
        async () => await queryClient.invalidateQueries("weight")
      ),
  });

  const { data: records, isFetched } = useQuery(
    ["weight"],
    async (): Promise<IWeightRecord[]> =>
      await axios
        .get("/api/weight/get-weight")
        .then(async ({ data }) => await Promise.resolve(data.records)),
    {
      enabled: user !== undefined,
    }
  );

  const deleteWeightRecord = useMutation({
    mutationFn: async (weightId: number) =>
      await axios.post("/api/weight/delete-weight", {
        weightId,
      }),
    onSuccess: async () => await queryClient.invalidateQueries("weight"),
  });

  function closeModal() {
    setSelectedRecord(undefined);
    setIsModalOpen(false);
  }

  function deleteRecord() {
    if (selectedRecord === undefined) {
      return;
    }

    deleteWeightRecord.mutate(selectedRecord.id);
    setSelectedRecord(undefined);
    setIsModalOpen(false);
  }

  const hasRecords = isFetched && records !== undefined && records?.length > 0;
  const sortedRecords = hasRecords
    ? records?.sort((a, b) => sortOnDate(new Date(a.date), new Date(b.date)))
    : [];
  const lastItem =
    sortedRecords.length > 0
      ? sortedRecords[sortedRecords.length - 1]
      : undefined;

  const isButtonDisabled =
    lastItem !== undefined
      ? new Date(lastItem.date).getDay() === new Date().getDay()
      : false;

  return (
    <ProtectedDashboard>
      <Box css={{ maxWidth: "770px" }}>
        <Typography as="h1">Body Weight</Typography>
        <Typography as="p">
          Tracking your body weight can provide valuable insights into your
          overall health and fitness. By regularly monitoring changes in weight,
          you can detect potential issues, such as an unexpected increase that
          may indicate an underlying health condition or a change in diet or
          exercise habits. Additionally, tracking your weight can help you stay
          accountable and motivated as you work towards your health and fitness
          goals.
        </Typography>
      </Box>

      <Content>
        <CardWrapper>
          <Card css={{ flexGrow: 1, maxWidth: MAX_MAIN_CARD_SIZE }}>
            <h3>Graph</h3>

            <Box css={{ mt: "$5" }}>
              {hasRecords && <WeightGraph records={sortedRecords} />}
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

          <Card
            css={{
              maxWidth: MAX_MAIN_CARD_SIZE,
              mt: "$4",
              "@container weight-content (min-width: 980px)": {
                mt: "0",
                ml: "$6",
                width: "100%",
                maxWidth: "320px",
              },
            }}
          >
            <h3>List</h3>

            {hasRecords &&
              sortedRecords.reverse().map((record) => (
                <WeightRecordListItem
                  key={record.id}
                  record={record}
                  onDeleteClick={() => {
                    setSelectedRecord(record);
                    setIsModalOpen(true);
                  }}
                />
              ))}
          </Card>
        </CardWrapper>
        <DeleteRecordDialog
          onClose={closeModal}
          isDialogOpen={isModalOpen}
          action={() => deleteRecord()}
        />
      </Content>
    </ProtectedDashboard>
  );
}

function sortOnDate(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}

async function addWeightRecord(weight: number) {
  return await axios
    .post("/api/weight/add-weight", {
      weight,
    })
    .then(({ data }) => data.data);
}

const weightValidationSchema = yup.object({
  weight: yup.number().required(),
});

const weightFields: IField[] = [
  {
    name: "weight",
    type: "number",
    label: "Today my weight is:",
    step: ".01",
  },
];

const Content = styled("div", {
  containerType: "inline-size",
  containerName: "weight-content",
});

const CardWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  pt: "$8",

  "@container weight-content (min-width: 980px)": {
    flexDirection: "row",
  },
});

export default WeightTrackerPage;
