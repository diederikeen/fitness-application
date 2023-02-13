import axios from "axios";
import { useQuery } from "react-query";
import z from "zod";

import { Box } from "@/components/Box/Box";
import { ProtectedDashboard } from "@/components/ProtectedDashboard/ProtectedDashboard";
import { Typography } from "@/components/Typography/Typography";
import { GraphCard } from "@/features/weight-tracker/GraphCard/GraphCard";
import { RecordList } from "@/features/weight-tracker/RecordList/RecordList";
import { MAX_MAIN_CARD_SIZE, styled } from "@/styles/theme";
import { useAuth } from "@/utils/useAuth/useAuth";

function WeightTrackerPage() {
  const { user } = useAuth();

  const { data: records, isFetched } = useQuery(
    ["weight"],
    async () => await fetchRecords(),

    {
      enabled: user !== undefined,
    }
  );

  const hasRecords = isFetched && records !== undefined && records?.length > 0;
  const sortedRecords = hasRecords
    ? records?.sort((a, b) => sortOnDate(new Date(a.date), new Date(b.date)))
    : [];

  return (
    <ProtectedDashboard>
      <Box css={{ maxWidth: MAX_MAIN_CARD_SIZE }}>
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
          <GraphCard records={sortedRecords} hasRecords={hasRecords} />

          {hasRecords && <RecordList records={sortedRecords} />}
        </CardWrapper>
      </Content>
    </ProtectedDashboard>
  );
}

const recordsSchema = z.array(
  z.object({
    date: z.string(),
    weight: z.number(),
    id: z.number(),
    note: z.string().optional(),
  })
);

async function fetchRecords() {
  const response = await axios.get("/api/weight/get-weight");
  return recordsSchema.parse(response.data.records);
}

function sortOnDate(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}

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
