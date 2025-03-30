import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import importedBackSvg from "../img/back.svg";
import importedDownloadSvg from "../img/download.svg";
import importedForwardSvg from "../img/forward.svg";
import importedIndicatorSvg from "../img/indicator.svg";
import importedSearchSvg from "../img/search.svg";
import importedShareSvg from "../img/share.svg";
import importedWatchSvg from "../img/watch.svg";

const cssUrl = (url: string) => `url(${url})`;

const downloadSvg = cssUrl(importedDownloadSvg.src);
const searchSvg = cssUrl(importedSearchSvg.src);
const shareSvg = cssUrl(importedShareSvg.src);
const watchSvg = cssUrl(importedWatchSvg.src);
const backSvg = cssUrl(importedBackSvg.src);
const forwardSvg = cssUrl(importedForwardSvg.src);
const indicatorSvg = cssUrl(importedIndicatorSvg.src);

const pulseKeyframes = keyframes(
  {
    from: {
      filter: "opacity(1)",
    },
    to: {
      filter: "opacity(0.7)",
    },
  },
  "pulse",
);

export const brand = style({
  marginTop: "5px",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "22px",
  fontFamily: "inherit",
  lineHeight: "24px",
});

export const button = style({
  padding: "5px 10px",
  color: "#16181b",
  fontWeight: "500",
  fontSize: "16px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "16px",
  textAlign: "center",
  background: "#fff",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "16px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "filter 0.3s ease-in-out",
});

export const center = style({
  marginRight: "auto",
  marginLeft: "auto",
  textAlign: "center",
});

export const chapterData = style({
  margin: "18px",
});

export const chapterInfo = style({
  color: "rgba(255,255,255,0.46)",
  fontWeight: "500",
  fontSize: "12px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "14px",
  letterSpacing: "0.17em",
  textTransform: "uppercase",
});

export const chapterTitle = style({
  float: "left",
  marginTop: "8px",
  color: "#fff",
  fontWeight: "600",
  fontSize: "18px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "21px",
  letterSpacing: "0.06em",
});

export const chapterView = style({
  float: "right",
  marginTop: "10px",
  color: "#ffc700",
  fontWeight: "bold",
  fontSize: "14px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "17px",
  cursor: "pointer",
});

export const col10Sm = style({
  width: "79.33%",
});

export const col11Sm = style({
  width: "87.66%",
});

export const col12Sm = style({
  width: "96%",
});

export const col1Sm = style({
  width: "4.33%",
});

export const col2Sm = style({
  width: "12.66%",
});

export const col3Sm = style({
  width: "21%",
});

export const col4Sm = style({
  width: "29.33%",
});

export const col5Sm = style({
  width: "37.66%",
});

export const col6Sm = style({
  width: "46%",
});

export const col7Sm = style({
  width: "54.33%",
});

export const col8Sm = style({
  width: "62.66%",
});

export const col9Sm = style({
  width: "71%",
});

export const disabled = style({});

export const explain = style({
  marginTop: "110px",
  marginBottom: "100px",
});

export const explainContainer = style({
  marginTop: "50px",
});

export const explainFigure = style({
  position: "relative",
  width: "100%",
  height: "50vh",
  maxHeight: "285px",
});

export const explainImage = style({
  borderRadius: "14px",
});

export const explainTitle = style({
  marginTop: "16px",
  color: "#fff",
  fontWeight: "800",
  fontSize: "30px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "36px",
});

export const fontHeavy = style({
  fontWeight: "700",
});

export const fontLight = style({
  fontWeight: "300",
});

export const fontRegular = style({
  fontWeight: "400",
});

export const header = style({
  marginTop: "24px",
});

export const homeContent = style({
  marginRight: "24px",
  marginLeft: "24px",
});

export const imageResult = style({
  display: "block",
  width: "100%",
  backgroundColor: "grey",
  borderRadius: "3px",
});

export const itemContainer = style({
  position: "relative",
  padding: "4px",
});

export const justify = style({
  textAlign: "justify",
});

export const lineGroup = style({
  position: "relative",
});

export const lineTitle = style({
  position: "absolute",
  top: "-8px",
  width: "100%",
  color: "white",
  textAlign: "center",
});

export const lineTitleText = style({
  width: "fit-content",
  margin: "0 auto",
  paddingRight: "24px",
  paddingLeft: "24px",
  color: "#898b8d",
  fontWeight: "600",
  fontSize: "13px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "16px",
  letterSpacing: "0.17em",
  textTransform: "uppercase",
  backgroundColor: "#16181b",
});

export const loading = style({
  filter: "opacity(1)",
  animation: `${pulseKeyframes} 0.6s ease-in-out infinite alternate`,
});

export const logo = style({
  float: "left",
  marginRight: "18px",
});

export const main = style({
  margin: "0",
  paddingRight: "0",
  paddingBottom: "1em",
  paddingLeft: "0",
});

export const navigationImage = style({
  display: "block",
  width: "85px",
  height: "63px",
  backgroundColor: "gray",
  borderRadius: "9px",
});

export const navigationLeft = style({
  float: "left",
  width: "90px",
  height: "100px",
});

export const navigationRight = style({
  float: "right",
  width: "90px",
  height: "100px",
});

export const result = style({
  width: "50%",
  margin: "0",
});

export const resultsCount = style({
  width: "100%",
  paddingTop: "8px",
  color: "#898b8d",
  fontWeight: "600",
  fontSize: "13px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "16px",
  letterSpacing: "0.17em",
  textAlign: "center",
  textTransform: "uppercase",
});

export const resultsSeason = style({
  marginTop: "15px",
  marginBottom: "15px",
  marginLeft: "8px",
  color: "#fff",
  fontWeight: "600",
  fontSize: "13px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "16px",
  letterSpacing: "0.17em",
  textTransform: "uppercase",
});

export const sceneFrameView = style({
  display: "grid",
  gridAutoColumns: "80%",
  gridAutoFlow: "column",
  marginTop: "21px",
  overflow: "scroll",
  columnGap: "2em",
  borderRadius: "3px",
  scrollSnapType: "x mandatory",
});

export const downloadButtonAnchor = style({
  position: "relative",
});

globalStyle(`${downloadButtonAnchor} a::after`, {
  position: "absolute",
  bottom: "1em",
  left: "1em",
  zIndex: "10",
  width: "3em",
  height: "3em",
  background: `white no-repeat center ${downloadSvg}`,
  backgroundSize: "50%",
  borderRadius: "3px",
  content: " ",
});

export const sceneFrameViewFrame = style([
  downloadButtonAnchor,
  {
    scrollSnapAlign: "center",
  },
]);

export const sceneGifView = style([
  downloadButtonAnchor,
  {
    display: "block",
    marginTop: "21px",
  },
]);

export const sceneImage = style({
  display: "block",
  width: "100%",
  background: "grey",
  borderRadius: "3px",
});

export const searchBox = style({
  position: "relative",
  boxSizing: "border-box",
  width: "100%",
  height: "60px",
  backgroundColor: "white",
  border: "2px solid #cacdd2",
  borderRadius: "6px",
  borderTopRightRadius: "12px",
  borderBottomRightRadius: "12px",
});

export const searchButton = style({
  position: "absolute",
  top: "-2px",
  right: "-2px",
  width: "60px",
  height: "60px",
  background: "#fec32a",
  backgroundImage: searchSvg,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  border: "2px solid #d6a11c",
  borderLeft: "none",
  borderRadius: "0 6px 6px 0",
  borderTopRightRadius: "6px",
  borderBottomRightRadius: "6px",
  cursor: "pointer",
});

export const searchInput = style({
  float: "left",
  boxSizing: "border-box",
  width: "100%",
  height: "100%",
  paddingLeft: "20px",
  color: "#16181b",
  fontWeight: "normal",
  fontSize: "20px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "24px",
  border: "none",
  borderRadius: "12px",
  borderTopRightRadius: "12px",
  borderBottomRightRadius: "12px",
});

export const subtitleLine = style({
  position: "relative",
  clear: "both",
  marginBottom: "10px",
});

export const subtitles = style({
  width: "100%",
  marginTop: "24px",
  background: "rgba(255,255,255,0.06)",
  borderRadius: "9px",
});

export const subtitlesContainer = style({
  padding: "12px",
  paddingTop: "20px",
});

export const subtitlesNavigation = style({
  padding: "12px",
  overflow: "hidden",
});

export const title = style({
  marginTop: "55px",
  marginBottom: "56px",
});

export const actionButton = style({
  height: "35px",
  paddingRight: "18px",
  paddingLeft: "42px",
  color: "#16181b",
  fontWeight: "600",
  fontSize: "16px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "35px",
  background: "#fff",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "16px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "filter 0.3s ease-in-out",
  selectors: {
    [`${disabled} &`]: {
      cursor: "default",
      filter: "opacity(0.5)",
    },
  },
});

export const download = style({
  selectors: {
    [`&${actionButton}`]: {
      backgroundImage: downloadSvg,
    },
  },
});

export const share = style({
  selectors: {
    [`&${actionButton}`]: {
      backgroundImage: shareSvg,
    },
  },
});

export const watch = style({
  selectors: {
    [`&${actionButton}`]: {
      backgroundImage: watchSvg,
    },
  },
});

export const actionsHolder = style({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  marginBottom: "-8px",
  paddingTop: "16px",
});

globalStyle(`${actionsHolder} > *`, {
  flexGrow: "0",
  flexShrink: "0",
  margin: "8px",
});

export const col1 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "4.33%",
    },
  },
});

export const col10 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "79.33%",
    },
  },
});

export const col11 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "87.66%",
    },
  },
});

export const col12 = style({
  width: "100%",
  margin: "0",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "96%",
    },
  },
});

export const col2 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "12.66%",
    },
  },
});

export const col3 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "21%",
    },
  },
});

export const col4 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "29.33%",
    },
  },
});

export const col5 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "37.66%",
    },
  },
});

export const col6 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "46%",
    },
  },
});

export const col7 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "54.33%",
    },
  },
});

export const col8 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "62.66%",
    },
  },
});

export const col9 = style({
  width: "96%",
  "@media": {
    "only screen and (min-width: 45em)": {
      width: "71%",
    },
  },
});

export const container = style({
  marginRight: "auto",
  marginLeft: "auto",
  width: "90%",
  "@media": {
    "only screen and (min-width: 33.75em)": {
      width: "75%",
      maxWidth: "60rem",
    },
  },
});

export const explainDescription = style({
  marginTop: "16px",
  color: "rgba(255,255,255,0.6)",
  fontWeight: "500",
  fontSize: "18px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "116%",
});

globalStyle(`${explainDescription} a`, {
  color: "#fec32a",
});

export const hiddenSm = style({
  display: "none",
  "@media": {
    "only screen and (min-width: 45em)": {
      display: "block",
    },
  },
});

export const navigationIndication = style({
  width: "100%",
  height: "17px",
  marginTop: "10px",
  paddingLeft: "20px",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "14px",
  fontStyle: "normal",
  lineHeight: "18px",
  letterSpacing: "0.06em",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left",
  cursor: "pointer",
});

export const left = style({
  textAlign: "left",
  selectors: {
    [`&${navigationIndication}`]: {
      backgroundImage: backSvg,
    },
  },
});

export const right = style({
  textAlign: "right",
  selectors: {
    [`&${navigationIndication}`]: {
      marginRight: "-15px",
      paddingLeft: "0",
      textAlign: "left",
      backgroundImage: forwardSvg,
      backgroundPosition: "right",
    },
  },
});

export const results = style({
  marginTop: "24px",
  marginBottom: "100px",
  padding: "4px",
  backgroundColor: "#212326",
  "@media": {
    "screen and (min-width: 600px)": {
      marginRight: "24px",
      marginLeft: "24px",
      paddingRight: "16px",
      paddingLeft: "16px",
      borderRadius: "6px",
    },
  },
});

export const row = style({
  position: "relative",
  width: "100%",
  "::after": {
    display: "table",
    clear: "both",
    content: "",
  },
});

globalStyle(`${row} [class^='local_col']`, {
  float: "left",
  minHeight: "0.125rem",
  margin: "0.5rem 2%",
});

export const scene = style({
  marginTop: "20px",
  marginBottom: "100px",
  padding: "8px",
  backgroundColor: "#212326",
  "@media": {
    "screen and (min-width: 600px)": {
      marginRight: "24px",
      marginLeft: "24px",
      paddingRight: "16px",
      paddingLeft: "16px",
      borderRadius: "6px",
    },
  },
});

export const search = style({
  boxSizing: "border-box",
  marginTop: "24px",
});

export const compact = style({
  selectors: {
    [`&${search}`]: {
      paddingRight: "24px",
      paddingLeft: "24px",
    },
  },
});

export const subtitleLineIndicator = style({
  position: "absolute",
  top: "50%",
  float: "left",
  width: "25px",
  height: "27px",
  transform: "translateY(-50%)",
});

export const subtitleLineText = style({
  paddingLeft: "30px",
  color: "#fff",
  fontWeight: "normal",
  fontSize: "20px",
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: "26px",
  opacity: "0.7",
});

export const current = style({
  selectors: {
    [`&${subtitleLineIndicator}`]: {
      backgroundImage: indicatorSvg,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left",
      cursor: "pointer",
    },
    [`&${subtitleLineText}`]: {
      opacity: "1",
    },
  },
});

globalStyle(`${subtitleLineText} b`, {
  color: "#fff",
  fontWeight: "bold",
  fontSize: "inherit",
  fontFamily: "inherit",
  fontStyle: "inherit",
  lineHeight: "inherit",
});
