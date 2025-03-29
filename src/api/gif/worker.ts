import workerInlineUrl from "gif.js/dist/gif.worker.js?inline";
import pMemoize from "p-memoize";

export const loadWorker = pMemoize(async () => {
  const resp = await fetch(workerInlineUrl);
  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);
  return url;
});
