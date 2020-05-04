import PQueue from "p-queue"

const queue = new PQueue({ concurrency: 4 })

const withRetry = <T>(times: number, fn: () => Promise<T>) => {
  let error
  while (times--) {
    try {
      return fn()
    } catch (e) {
      error = e
    }
  }
  throw error
}

export const addToQueue = <T>(
  fn: () => Promise<T>,
  retries = 1,
  abortSignal?: AbortSignal
) =>
  withRetry(retries, async () => {
    if (abortSignal?.aborted) throw "Aborted by user"
    return queue.add(fn)
  })
