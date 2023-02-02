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
import { useUser } from "../../../utils/useUser/useUser";
import { useQuery } from "react-query";
import { IWeightRecords } from "../../../utils/types";

function WeightTrackerPage() {
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      weight: "",
    },
    validateOnBlur: true,
    validationSchema: weightValidationSchema,
    onSubmit: async (values) =>
      await addWeightRecord(parseFloat(values.weight), user?.uid),
  });

  const { data: weightRecords, isLoading } = useQuery(
    ["weight"],
    async () =>
      await axios.get("/api/weight/get-weight", {
        params: {
          uid: user?.uid,
        },
      }),
    {
      enabled: user !== undefined,
    }
  );

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

      <Card css={{ mt: "$8", maxWidth: "720px" }}>
        <h3>Tracker</h3>

        <Box css={{ mt: "$5" }}>
          {!isLoading && (
            <ResponsiveContainer width={"100%"} aspect={2.5}>
              <LineChart
                width={730}
                height={250}
                data={weightRecordMap(weightRecords?.data.records)}
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
            <FormComposer inline fields={weightFields} buttonLabel="Submit" />
          </FormikProvider>
        </Box>
      </Card>
    </ProtectedDashboard>
  );
}

function weightRecordMap(records: IWeightRecords[]) {
  return records.map((record) => ({
    name: record.date,
    value: record.weight,
  }));
}

async function addWeightRecord(weight: number, uid?: string) {
  return await axios
    .post("/api/weight/add-weight", {
      uid,
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
