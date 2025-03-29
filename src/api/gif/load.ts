export const loadImage = async (url: string, resizeToWidth?: number) => {
  const img = document.createElement("img");
  try {
    await new Promise((fulfill, reject) => {
      img.onload = fulfill;
      img.onerror = reject;
      img.crossOrigin = "anonymous";
      img.src = url;
    });
  } finally {
    img.onload = null;
    img.onerror = null;
  }

  const canvas = document.createElement("canvas");

  const originalWidth = img.naturalWidth;
  const width = resizeToWidth ?? originalWidth | 0;
  const height = (img.naturalHeight * (width / originalWidth)) | 0;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);

  return canvas;
};
