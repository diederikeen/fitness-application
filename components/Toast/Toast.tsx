import {
  UilCheckCircle,
  UilExclamationOctagon,
  UilExclamationTriangle,
} from "@iconscout/react-unicons";
import { keyframes } from "@stitches/react";

import { styled } from "@/styles/theme";
import { IToast } from "@/utils/useToast/useToast";

interface Props {
  toast: IToast;
  onComplete: (toastId: number, duration: number) => void;
}

export function Toast({ toast, onComplete }: Props) {
  const { message, duration = 3000, state = "default" } = toast;
  const icon = TOAST_ICON_MAP[state];

  onComplete(toast.id as number, duration);

  return (
    <StyledToast state={state}>
      {state !== "default" && <span>{icon}</span>}

      <div>{message}</div>
    </StyledToast>
  );
}

const overlayShow = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(4px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0px)",
  },
});

const TOAST_ICON_MAP = {
  success: <UilCheckCircle />,
  error: <UilExclamationOctagon />,
  warning: <UilExclamationTriangle />,
  default: null,
};

const StyledToast = styled("div", {
  maxWidth: "300px",
  backgroundColor: "white",
  p: "$4",
  borderRadius: "$2",
  fontSize: "$2",
  color: "$grey800",
  border: "1px solid",
  display: "flex",
  alignItems: "center",
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  animation: `${overlayShow} 350ms cubic-bezier(0.16, 1, 0.3, 1)`,

  "> span": {
    width: "25px",
    height: "25p",
    mr: "$3",
    color: "inherit",
  },

  svg: {
    fill: "currentColor",
  },

  variants: {
    state: {
      default: {
        borderColor: "$grey200",
      },
      error: {
        borderColor: "$error",
        backgroundColor: "$error100",
        color: "$error",
      },
      warning: {
        borderColor: "$warning",
        color: "$warning",
        backgroundColor: "$warning100",
      },
      success: {
        borderColor: "$success",
        color: "$success",
        backgroundColor: "$success100",
      },
    },
  },
});
