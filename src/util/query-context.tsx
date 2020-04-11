import React, { FunctionComponent } from "react"

const queryContext = React.createContext<{
  query?: string
  setQuery: (query: string) => void
}>({ setQuery() {} })

const { Provider } = queryContext
export const QueryProvider: FunctionComponent = ({ children }) => {
  const [query, setQuery] = React.useState<string | undefined>()
  return <Provider value={{ query, setQuery }}>{children}</Provider>
}

export const useQuery = () => React.useContext(queryContext)
