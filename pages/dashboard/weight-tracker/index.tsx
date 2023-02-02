import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import { ProtectedDashboard } from "../../../components/ProtectedDashboard/ProtectedDashboard";

import { Card } from "../../../components/Card/Card";

import { Line, ResponsiveContainer, LineChart, Tooltip, YAxis } from "recharts";
import { Box } from "../../../components/Box/Box";
import {
  FormComposer,
  IField,
} from "../../../components/FormComposer/FormComposer";
import axios from "axios";
import { useAuth } from "../../../utils/useAuth/useAuth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IWeightRecord } from "../../../utils/types";

function WeightTrackerPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  const { data: records, isLoading } = useQuery(
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

  const hasRecords = !isLoading && records != null && records?.length > 0;

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
              <FormComposer inline fields={weightFields} buttonLabel="Add" />
            </FormikProvider>
          </Box>
        </Card>

        <Card css={{ maxWidth: "320px", flexGrow: 1, ml: "$6" }}>
          <h3>List</h3>

          {hasRecords &&
            records?.map((record) => (
              <Box
                key={record.id}
                css={{
                  py: "$3",
                  borderBottom: "1px solid $grey300",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {record.weight} -{" "}
                {new Intl.DateTimeFormat("nl-NL").format(new Date(record.date))}
                <Box css={{ ml: "auto" }}>
                  <button onClick={() => deleteWeightRecord.mutate(record.id)}>
                    Delete
                  </button>
                </Box>
              </Box>
            ))}
        </Card>
      </Box>
    </ProtectedDashboard>
  );
}

function weightRecordMap(records: IWeightRecord[]) {
  return records.map((record) => ({
    name: record.date,
    value: record.weight,
  }));
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
