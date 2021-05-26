import workerInlineUrl from "gif.js/dist/gif.worker.js?inline"

const load = async () => {
  const resp = await fetch(workerInlineUrl)
  const blob = await resp.blob()
  const url = URL.createObjectURL(blob)
  return url
}

export default await load()
