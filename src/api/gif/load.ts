export const loadImage = async (url: string) => {
  const img = document.createElement("img")
  try {
    await new Promise((fulfill, reject) => {
      img.onload = fulfill
      img.onerror = reject
      img.crossOrigin = "anonymous"
      img.src = url
    })
  } finally {
    img.onload = null
    img.onerror = null
  }
  return img
}
