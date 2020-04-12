import PQueue from "p-queue"
import React, { FunctionComponent } from "react"

const QueueContext = React.createContext(new PQueue({}))

export const QueueProvider: FunctionComponent<{ concurrency?: number }> = ({
  concurrency,
  children,
}) => (
  <QueueContext.Provider value={new PQueue({ concurrency })}>
    {children}
  </QueueContext.Provider>
)

export const useQueue = () => React.useContext(QueueContext)
