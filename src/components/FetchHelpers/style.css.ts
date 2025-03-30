import { style } from "@vanilla-extract/css";
import importedRollingSvg from "../../img/rolling.svg";

const cssUrl = (url: string) => `url(${url})`;

const rollingSvg = cssUrl(importedRollingSvg.src);

export const error = style({
  color: "white",
});

export const spinner = style({
  width: "100%",
  height: "30px",
  marginTop: "3em",
  backgroundImage: rollingSvg,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "30px 30px",
});

export const title = style({
  marginTop: "1em",
  textAlign: "center",
});
