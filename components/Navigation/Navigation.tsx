import { styled } from "../../styles/theme";
import Link from "next/link";
import { useRouter } from "next/router";

import { UilDashboard, UilWeight, UilDumbbell } from "@iconscout/react-unicons";

const NAV_ITEMS = [
  {
    path: "/dashboard",
    icon: <UilDashboard />,
    label: "Dashboard",
  },
  {
    path: "/dashboard/weight-tracker",
    icon: <UilWeight />,
    label: "Weight Tracker",
  },
  {
    path: "/dashboard/exercises",
    icon: <UilDumbbell />,
    label: "Exercises",
  },
];

function Navigation() {
  const { asPath } = useRouter();

  return (
    <StyledNavigation>
      {NAV_ITEMS.map((item) => (
        <StyledNavItem
          key={item.path}
          href={item.path}
          isCurrent={asPath === item.path}
          aria-current={asPath === item.path}
        >
          {item.icon} {item.label}
        </StyledNavItem>
      ))}
    </StyledNavigation>
  );
}

const StyledNavItem = styled(Link, {
  borderRadius: "$3",
  height: "50px",
  display: "flex",
  alignItems: "center",
  px: "$3",
  fontSize: "$3",
  fontWeight: "$3",
  transition: "background, 125ms ease",
  textDecoration: "none",
  color: "$textDefault",
  // backgroundColor: "$grey100",

  ">svg": {
    mr: "$2",
  },

  "&:hover": {
    backgroundColor: "$grey300",
    color: "$white",
  },

  "&:not(:last-child)": {
    mb: "$2",
  },

  variants: {
    isCurrent: {
      true: {
        backgroundColor: "$primaryColor",
        color: "$white",
        pointerEvents: "none",
      },
    },
  },
});

const StyledNavigation = styled("nav", {
  display: "none",
  gridColumn: "nav",
  gridRow: "content",
  height: "100vh",
  background: "white",
  py: "$3",
  px: "$4",
  borderRight: "1px solid $grey300",
  "@bp2": {
    display: "block",
  },
});

export default Navigation;
