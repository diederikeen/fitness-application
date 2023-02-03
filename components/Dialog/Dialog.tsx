import { UilTimes } from "@iconscout/react-unicons";
import * as RadixDialog from "@radix-ui/react-dialog";
import { keyframes } from "@stitches/react";
import { PropsWithChildren } from "react";

import { styled } from "../../styles/theme";

interface Props {
  isOpen?: boolean;
  setIsOpen?: ((open: boolean) => void) | undefined;
  onClose: () => void;
}

function Root({ children, isOpen = false, onClose }: PropsWithChildren<Props>) {
  return (
    <RadixDialog.Root open={isOpen}>
      <RadixDialog.Portal>
        <StyledDialogOverlay />
        <StyledDialogContent>
          <RadixDialog.Title />
          <RadixDialog.Description />
          <RadixDialog.Close className="dialog-close-button" onClick={onClose}>
            {<UilTimes />}
          </RadixDialog.Close>
          {children}
        </StyledDialogContent>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

interface DialogFooterProps {
  horizontalAlign?: "start" | "end";
}

function Footer({
  horizontalAlign = "end",
  children,
}: PropsWithChildren<DialogFooterProps>) {
  return (
    <StyledDialogFooter css={{ justifyContent: horizontalAlign }}>
      {children}
    </StyledDialogFooter>
  );
}

export const Dialog = {
  Root,
  Footer,
};

const StyledDialogFooter = styled("footer", {
  marginTop: "$5",
  display: "flex",
});

const overlayShow = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const contentShow = keyframes({
  from: {
    opacity: 0,
    transform: "translate(-50%, -48%) scale(0.96)",
  },
  to: {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
  },
});

const StyledDialogOverlay = styled(RadixDialog.Overlay, {
  backgroundColor: "rgba(0,0,0, .4)",
  position: "fixed",
  inset: 0,
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  "@media (prefers-reduced-motion)": {
    transition: "none",
  },
});

const StyledDialogContent = styled(RadixDialog.Content, {
  backgroundColor: "$white",
  borderRadius: "$3",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "650px",
  maxHeight: "85vh",
  padding: "25px",
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  animation: `${contentShow} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,

  ".dialog-close-button": {
    width: "24px",
    height: "24px",
    border: 0,
    background: "none",
    transition: "background 125ms ease",
    position: "absolute",
    right: "$3",
    top: "$3",
    display: "flex",
    alignItems: "enter",
    justifyContent: "center",
    borderRadius: "$full",

    "&:hover": {
      backgroundColor: "$grey300",
      color: "$white",
    },
  },

  "@media (prefers-reduced-motion)": {
    transition: "none",
  },
});
