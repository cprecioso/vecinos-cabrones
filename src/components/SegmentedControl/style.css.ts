import { createVar, globalStyle, style } from "@vanilla-extract/css";

const backgroundVar = createVar("background");

globalStyle(":root", {
  vars: {
    [backgroundVar]: `rgba(239, 239, 240, 1)`,
  },
});

export const checked = style({});

export const segmentedControl = style({
  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column",
  maxWidth: "240px",
  margin: "0 auto",
  marginTop: "20px",
  padding: "2px",
  overflow: "hidden",
  background: backgroundVar,
  border: "none",
  borderRadius: "9px",
  outline: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
});

export const option = style({
  selectors: {
    [`${segmentedControl} &`]: {
      position: "relative",
      cursor: "pointer",
    },
  },
});

globalStyle(`${segmentedControl} ${option} input`, {
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "100%",
  margin: "0",
  padding: "0",
  border: "none",
  outline: "none",
  opacity: "0",
  WebkitAppearance: "none",
  MozAppearance: "none",
  appearance: "none",
});
globalStyle(`${segmentedControl} ${option} label`, {
  position: "relative",
  display: "block",
  padding: "3px 10px",
  color: "black",
  fontWeight: "500",
  fontSize: "14px",
  textAlign: "center",
  background: "rgba(255,255,255,0)",
});
globalStyle(`${segmentedControl} ${option} label span`, {
  position: "relative",
  zIndex: "2",
  display: "block",
  WebkitTransition: "all 0.2s ease",
  transition: "all 0.2s ease",
  willChange: "transform",
});
globalStyle(`${segmentedControl} ${option} label::after`, {
  position: "absolute",
  top: "14%",
  bottom: "14%",
  width: "1px",
  background: "rgba(142,142,147,0.15)",
  borderRadius: "10px",
  WebkitTransition: "background 0.2s ease",
  transition: "background 0.2s ease",
  content: "",
  willChange: "background",
  right: "0",
  transform: "translateX(0.5px)",
});
globalStyle(`${segmentedControl} ${option} label::before`, {
  position: "absolute",
  top: "14%",
  bottom: "14%",
  width: "1px",
  background: "rgba(142,142,147,0.15)",
  borderRadius: "10px",
  WebkitTransition: "background 0.2s ease",
  transition: "background 0.2s ease",
  content: "",
  willChange: "background",
  left: "0",
  transform: "translateX(-0.5px)",
});
globalStyle(`${segmentedControl} ${option}${checked} label`, {
  cursor: "default",
});
globalStyle(`${segmentedControl} ${option}${checked} label::after`, {
  zIndex: "1",
  background: backgroundVar,
});
globalStyle(`${segmentedControl} ${option}${checked} label::before`, {
  zIndex: "1",
  background: backgroundVar,
});
globalStyle(`${segmentedControl} ${option}:first-of-type`, {
  gridRow: "1",
  gridColumn: "1",
  boxShadow: "none",
});
globalStyle(`${segmentedControl} ${option}:first-of-type label::before`, {
  opacity: "0",
});
globalStyle(`${segmentedControl} ${option}:last-of-type label::after`, {
  opacity: "0",
});
globalStyle(`${segmentedControl} ${option}:not:active label span`, {
  opacity: "0.2",
  transform: "scale(0.95)",
});
globalStyle(`${segmentedControl} ${option}:not:focus label span`, {
  opacity: "0.2",
});
globalStyle(`${segmentedControl} ${option}:not:hover label span`, {
  opacity: "0.2",
});

export const selection = style({
  selectors: {
    [`${segmentedControl} &`]: {
      zIndex: "2",
      gridRow: "1",
      gridColumn: "1",
      background: "white",
      border: "0.5px solid rgba(0,0,0,0.04)",
      borderRadius: "7px",
      boxShadow: "0 3px 8px 0 rgba(0,0,0,0.12) , 0 3px 1px 0 rgba(0,0,0,0.04)",
      WebkitTransition: "transform 0.2s ease",
      transition: "transform 0.2s ease",
      willChange: "transform",
    },
  },
});
