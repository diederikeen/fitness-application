import { Button } from "@/components/Button/Button";
import { Dialog } from "@/components/Dialog/Dialog";
import { Typography } from "@/components/Typography/Typography";

interface Props {
  onClose: () => void;
  action: () => void;
  isDialogOpen: boolean;
}

export function DeleteRecordDialog({ onClose, isDialogOpen, action }: Props) {
  return (
    <Dialog.Root onClose={onClose} isOpen={isDialogOpen}>
      <Typography as="h2">Deleting record</Typography>
      <Typography as="p" css={{ maxWidth: "50%" }}>
        Are you sure you want to delete this record? This action can not be
        undone.
      </Typography>

      <Dialog.Footer>
        <Button ghost small css={{ mr: "$4" }} onClick={onClose}>
          No, cancel
        </Button>
        <Button danger onClick={action}>
          Yes, delete
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
}
