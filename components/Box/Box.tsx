import { styled } from "../../styles/theme";

import { CSS } from "@stitches/react";
import { PropsWithChildren } from "react";

const StyledBox = styled("div", {});

interface Props {
  css: CSS;
  className?: string;
}

export function Box({ children, css, ...props }: PropsWithChildren<Props>) {
  return (
    <StyledBox css={{ ...css }} {...props}>
      {children}
    </StyledBox>
  );
}
