import { styled } from "../styles/theme";

const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
});

export default function HomePage() {
  return (
    <Layout>
      <div>This going to be the form</div>
      <div>This is going to be visual</div>
    </Layout>
  );
}
