import React from "react"

enum ShareAvailability {
  Unknown,
  None,
  SharePlain,
}

const detectShare = () => {
  let returnValue = ShareAvailability.None

  try {
    if (
      window.navigator.share &&
      typeof window.navigator.share === "function"
    ) {
      returnValue = ShareAvailability.SharePlain
    }
  } catch (_) {}

  return returnValue
}

let globalShareAvailability = ShareAvailability.Unknown

export const useWebShare = (title: string, url: string) => {
  const [shareAvailability, setShareAvailability] = React.useState(
    globalShareAvailability
  )

  const shareIsUnknown = shareAvailability === ShareAvailability.Unknown
  React.useEffect(() => {
    if (shareIsUnknown) {
      setShareAvailability((globalShareAvailability = detectShare()))
    }
  }, [shareIsUnknown])

  const share = React.useCallback(async () => {
    switch (shareAvailability) {
      case ShareAvailability.Unknown:
      case ShareAvailability.None:
        return
      case ShareAvailability.SharePlain: {
        try {
          await navigator.share!({ title, text: title, url })
        } catch (e) {
          if (e instanceof DOMException && e.name === "AbortError") {
          } else throw e
        }
      }
    }
  }, [shareAvailability, title, url])

  const canShare = shareAvailability === ShareAvailability.SharePlain

  return { canShare, share }
}
