import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Card } from "@/components/Card/Card";
import { MAX_MAIN_CARD_SIZE } from "@/styles/theme";
import { IWeightRecord } from "@/utils/types";
import { useToast } from "@/utils/useToast/useToast";

import { DeleteRecordDialog } from "../DeleteRecordDialog/DeleteRecordDialog";
import { WeightRecordListItem } from "../WeightRecordListItem/WeightRecordListItem";

interface Props {
  records: IWeightRecord[];
}

export function RecordList({ records }: Props) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const [selectedRecord, setSelectedRecord] = useState<
    IWeightRecord | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteWeightRecord = useMutation({
    mutationFn: async (weightId: number) =>
      await axios.post("/api/weight/delete-weight", {
        weightId,
      }),
    onSuccess: async () => {
      addToast({
        message: "Weight record successfully deleted",
        state: "success",
      });
      return await queryClient.invalidateQueries("weight");
    },
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

  return (
    <>
      <Card
        css={{
          maxWidth: MAX_MAIN_CARD_SIZE,
          mt: "$4",
          pb: "0",
          "@container weight-content (min-width: 980px)": {
            mt: "0",
            ml: "$6",
            width: "100%",
            maxWidth: "320px",
          },
        }}
      >
        <h3>List</h3>

        {records.reverse().map((record) => (
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

      <DeleteRecordDialog
        onClose={closeModal}
        isDialogOpen={isModalOpen}
        action={() => deleteRecord()}
      />
    </>
  );
}
