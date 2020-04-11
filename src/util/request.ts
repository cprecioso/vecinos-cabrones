import useSWR, { ConfigInterface, keyInterface } from "swr"
import type { fetcherFn } from "swr/dist/types"

const useRequest = <Data = any, Error = any>(
  key: keyInterface,
  fn: fetcherFn<Data>,
  config?: ConfigInterface<Data, Error>
) =>
  useSWR(key, fn, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    ...config,
  })

export default useRequest
