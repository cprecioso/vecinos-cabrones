import { createGlobalVar, fontFace, globalStyle } from "@vanilla-extract/css";

const backgroundVar = createGlobalVar("background");

globalStyle(":root", {
  vars: {
    [backgroundVar]: `rgba(239, 239, 240, 1)`,
  },
});

const sanFranciscoFont = fontFace(
  [
    {
      fontWeight: 400,
      src: 'url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff")',
    },
    {
      fontWeight: 500,
      src: 'url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-medium-webfont.woff")',
    },
    {
      fontWeight: 600,
      src: 'url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-semibold-webfont.woff")',
    },
    {
      fontWeight: 700,
      src: 'url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-bold-webfont.woff")',
    },
    {
      fontWeight: 800,
      src: 'url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-heavy-webfont.woff")',
    },
  ],
  "San Francisco",
);

globalStyle("body, html", {
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  padding: 0,
  fontSize: "100%",
});

globalStyle("*", {
  color: "#333447",
  fontFamily: `-apple-system, blinkmacsystemfont, ${sanFranciscoFont}, system-ui, sans-serif`,
  lineHeight: 1.5,
});

globalStyle("h1", { fontSize: "2.5rem" });
globalStyle("h2", { fontSize: "2rem" });
globalStyle("h3", { fontSize: "1.375rem" });
globalStyle("h4", { fontSize: "1.125rem" });
globalStyle("h5", { fontSize: "1rem" });
globalStyle("h6", { fontSize: "0.875rem" });
globalStyle("p", { fontWeight: 200, fontSize: "1.125rem", lineHeight: 1.8 });
globalStyle("a:link", { textDecoration: "none" });

globalStyle("body", {
  maxWidth: "600px",
  margin: "0 auto",
  padding: 0,
  background: "#16181b",
});
globalStyle("h1", {
  margin: 0,
  color: "#fff",
  fontWeight: 800,
  fontSize: "35px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "40px",
});
globalStyle("h1 b", {
  color: "#fec32a",
  fontWeight: "inherit",
  fontSize: "inherit",
  fontFamily: "inherit",
  fontStyle: "inherit",
  lineHeight: "inherit",
});
globalStyle("input:focus,\ntextarea:focus,\nselect:focus", { outline: "none" });
globalStyle("::placeholder", {
  color: "#b2b4b8",
  fontWeight: "normal",
  fontSize: "20px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "24px",
});
globalStyle("hr", { margin: 0, padding: 0, border: "0.5px solid #cacdd2" });
