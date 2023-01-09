import { styled } from "../../styles/theme";

import { CSS } from "@stitches/react";
import { PropsWithChildren } from "react";

const StyledBox = styled("div", {});

interface Props {
  css: CSS;
}

export function Box({ children, css }: PropsWithChildren<Props>) {
  return <StyledBox css={{ ...css }}>{children}</StyledBox>;
}
