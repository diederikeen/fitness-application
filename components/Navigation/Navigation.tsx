import { styled } from "../../styles/theme";

function Navigation() {
  return <StyledNavigation />;
}

const StyledNavigation = styled("nav", {
  display: "none",
  gridColumn: "nav",
  gridRow: "content",
  height: "100vh",
  background: "white",
  py: "$3",
  px: "$4",
  // backgroundColor: "$grey100",
  borderRight: "1px solid $grey300",
  "@bp2": {
    display: "block",
  },
});

export default Navigation;
