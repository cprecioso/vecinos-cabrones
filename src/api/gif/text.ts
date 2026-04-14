import {
  Placement1D,
  Placement2D,
  drawBlock,
  layoutBlock,
} from "@cprecioso/canvas-text-layout";
import { loadFont } from "./font";

export const addText = async (canvas: HTMLCanvasElement, text: string) => {
  const { height, width } = canvas;

  const ctx = canvas.getContext("2d")!;

  const fontSize = 32.5;
  ctx.font = `${fontSize}px ${await loadFont()}`;
  ctx.fillStyle = "white";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.textAlign = "left";

  const maxWidth = width * 0.9;
  const block = layoutBlock(ctx, text, { maxWidth });

  // Place the block centered horizontally, with its bottom edge at 90% of the frame height.
  drawBlock(
    ctx,
    block,
    { x: width / 2, y: height * 0.82 },
    {
      origin: Placement2D.BottomCenter,
      textAlignment: Placement1D.Center,
      drawFn: (lineText, x, y) => {
        ctx.strokeText(lineText, x, y);
        ctx.fillText(lineText, x, y);
      },
    },
  );

  return canvas;
};
