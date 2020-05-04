import React from "react"
import useSWR, {
  ConfigInterface as SWRConfigInterface,
  mutate as swrMutate,
} from "swr"

const caches = new Map<string, Map<string, unknown>>()
const getCache = (namespace: string) => {
  if (caches.has(namespace)) return caches.get(namespace)!
  const cache = new Map()
  caches.set(namespace, cache)
  return cache
}

const saveInCache = <T>(
  namespace: string,
  key: undefined | string,
  value: T
) => {
  if (key != null) getCache(namespace).set(key, value)
  return value
}

export const mutate = <T, N extends string = string, K extends string = string>(
  namespace: N,
  key: K,
  data?: T
) => {
  saveInCache(namespace, key, data)
  return swrMutate([namespace, key], data, false)
}

const useStaticDataFetch = <
  T,
  N extends string = string,
  K extends string = string
>(
  namespace: N,
  key: K | undefined,
  fetcher: (_: N, key: K) => Promise<T>,
  initialData?: T
) => {
  const cachedInitialData = React.useMemo(
    () =>
      (getCache(namespace).get(key) as T) ??
      saveInCache(namespace, key, initialData),
    [namespace, key]
  )

  const handleSuccess = React.useCallback<
    NonNullable<SWRConfigInterface["onSuccess"]>
  >((data, key) => void saveInCache(namespace, key, data), [namespace])

  const swr = useSWR(key != null ? [namespace, key] : null, fetcher, {
    initialData: cachedInitialData,
    refreshInterval: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: handleSuccess,
  })

  return swr
}

export default useStaticDataFetch
