import { style } from "@vanilla-extract/css";

const cssUrl = (url: string) => `url(${url})`;

const rollingSvg = cssUrl(
  new URL("../../img/rolling.svg", import.meta.url).href,
);

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
