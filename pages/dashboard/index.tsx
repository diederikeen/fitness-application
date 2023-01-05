import { styled } from "../../styles/theme";

const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "[content] 1fr",
  gridTemplateRows: "[masthead] 60px [content] auto",

  "@bp2": {
    gridTemplateColumns: "[nav] 260px [content] auto",
    gridTemplateRows: "[masthead] 60px [content] auto",
  },
});

const Masthead = styled("header", {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRow: "masthead",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  px: "$3",
});

const Navigation = styled("nav", {
  display: "none",
  gridColumn: "nav",
  gridRow: "content",
  height: "100vh",
  background: "white",
  py: "$3",
  px: "$4",

  "@bp2": {
    display: "block",
  },
});

export default function Dashboard() {
  return (
    <Layout>
      <Masthead>Masthead</Masthead>
      <Navigation>Navigation</Navigation>
    </Layout>
  );
}
