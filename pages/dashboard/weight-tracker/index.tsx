import { UilPen, UilTrash } from "@iconscout/react-unicons";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import * as yup from "yup";

import { Box } from "../../../components/Box/Box";
import { Button } from "../../../components/Button/Button";
import { Card } from "../../../components/Card/Card";
import { Dialog } from "../../../components/Dialog/Dialog";
import {
  FormComposer,
  IField,
} from "../../../components/FormComposer/FormComposer";
import { ProtectedDashboard } from "../../../components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "../../../components/Typography/Typography";
import { IWeightRecord } from "../../../utils/types";
import { useAuth } from "../../../utils/useAuth/useAuth";

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
        <h1>Weight</h1>
        <p>
          Tracking your body weight can provide valuable insights into your
          overall health and fitness. By regularly monitoring changes in weight,
          you can detect potential issues, such as an unexpected increase that
          may indicate an underlying health condition or a change in diet or
          exercise habits. Additionally, tracking your weight can help you stay
          accountable and motivated as you work towards your health and fitness
          goals.
        </p>
      </Box>

      <Box css={{ display: "flex", pt: "$8" }}>
        <Card css={{ maxWidth: "720px", flexGrow: 1 }}>
          <h3>Graph</h3>

          <Box css={{ mt: "$5" }}>
            {hasRecords && (
              <ResponsiveContainer width={"100%"} aspect={2.5}>
                <LineChart
                  width={730}
                  height={250}
                  data={weightRecordMap(records)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <YAxis domain={[75, 85]} tickLine={false} width={0} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3c40c6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
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

        <Card css={{ maxWidth: "320px", flexGrow: 1, ml: "$6" }}>
          <h3>List</h3>

          {hasRecords &&
            sortedRecords.reverse().map((record) => (
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
                <Box
                  as="span"
                  css={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography as="strong" css={{ display: "block" }}>
                    {record.weight}KG
                  </Typography>
                  <Typography css={{ color: "$grey400" }}>
                    {new Intl.DateTimeFormat("nl-NL").format(
                      new Date(record.date)
                    )}
                  </Typography>
                </Box>
                <Box css={{ ml: "auto" }}>
                  <Button ghost small>
                    <UilPen />
                  </Button>

                  <Button
                    onClick={() => {
                      setSelectedRecord(record);
                      setIsModalOpen(true);
                    }}
                    ghost
                    danger
                    small
                  >
                    <UilTrash />
                  </Button>
                </Box>
              </Box>
            ))}
        </Card>
        <Dialog.Root onClose={closeModal} isOpen={isModalOpen}>
          <Typography as="h2">Deleting record</Typography>
          <Typography as="p" css={{ maxWidth: "50%" }}>
            Are you sure you want to delete this record? This action can not be
            undone.
          </Typography>

          <Dialog.Footer>
            <Button ghost small css={{ mr: "$4" }} onClick={closeModal}>
              No, cancel
            </Button>
            <Button danger onClick={() => deleteRecord()}>
              Yes, delete
            </Button>
          </Dialog.Footer>
        </Dialog.Root>
      </Box>
    </ProtectedDashboard>
  );
}

function sortOnDate(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}

function weightRecordMap(records: IWeightRecord[]) {
  return records
    .map((record) => ({
      name: new Date(record.date),
      value: record.weight,
    }))
    .sort((a, b) => sortOnDate(a.name, b.name));
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

export default WeightTrackerPage;
