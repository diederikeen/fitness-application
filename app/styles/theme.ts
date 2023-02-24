import { createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
  theme: {
    colors: {
      white: "#fff",
      primaryBg: "#fff",
      altBackground: "#222f3e",
      secondaryBg: "#f9fafb",
      // primaryColor: "#7ed6df",
      // primaryColor: "#54a0ff",
      // primaryColor: "#ff9f43",
      // primaryColor: "#5352ed",
      primaryColor: "#3c40c6",
      primaryColor900: "#272a86",
      secondaryColor: "#ff9f43",
      error: "#e74c3c",
      error100: "#fdf3f2",
      warning: "#ff9f43",
      warning100: "#fffefe",
      success: "#05c46b",
      success100: "#fcfffe",
      grey50: "#f9fafb",
      grey100: "#ecf0f1",
      grey200: "#bdc3c7",
      grey300: "#95a5a6",
      grey400: "#7f8c8d",
      grey800: "#34495e",
      grey900: "#2c3e50",
      textDefault: "#2c3e50",
    },
    radii: {
      0: "2px",
      1: "3px",
      2: "4px",
      3: "5px",
      4: "6px",
      5: "8px",
      6: "10px",
      full: "50%",
    },
    space: {
      0: "2px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "24px",
      6: "32px",
      7: "48px",
      8: "64px",
      9: "76px",
      10: "96px",
    },
    fontSizes: {
      1: "8px",
      2: "12px",
      3: "14px",
      4: "16px",
      5: "22px",
      6: "28px",
      7: "36px",
      8: "52px",
    },
    fontWeights: {
      0: "100",
      1: "300",
      2: "500",
      3: "600",
      4: "800",
    },
    fonts: {},
    lineHeights: {
      0: 0.8,
      1: 1,
      2: 1.2,
      3: 1.4,
      4: 1.6,
      5: 1.8,
    },
    shadows: {
      0: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      1: "rgba(99, 99, 99, 0.1) 0px 2px 12px 0px",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1024px)",
    bp4: "(min-width: 1440px)",
  },
  utils: {
    // Abbreviated margin properties
    m: (value: string | number) => ({
      margin: value,
    }),
    mt: (value: string | number) => ({
      marginTop: value,
    }),
    mr: (value: string | number) => ({
      marginRight: value,
    }),
    mb: (value: string | number) => ({
      marginBottom: value,
    }),
    ml: (value: string | number) => ({
      marginLeft: value,
    }),
    mx: (value: string | number) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: string | number) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: (value: string | number) => ({
      padding: value,
    }),
    pt: (value: string | number) => ({
      paddingTop: value,
    }),
    pr: (value: string | number) => ({
      paddingRight: value,
    }),
    pb: (value: string | number) => ({
      paddingBottom: value,
    }),
    pl: (value: string | number) => ({
      paddingLeft: value,
    }),
    px: (value: string | number) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string | number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});

export const MAX_MAIN_CARD_SIZE = "720px";
