import { useRouter } from "next/router"
import React, { FunctionComponent } from "react"

const queryContext = React.createContext<{
  query?: string
  setQuery: (query: string) => void
}>({ setQuery() {} })

const { Provider } = queryContext
export const QueryProvider: FunctionComponent = ({ children }) => {
  const router = useRouter()
  const [query, setQuery] = React.useState<string | undefined>(
    router.query.q as string | undefined
  )
  return <Provider value={{ query, setQuery }}>{children}</Provider>
}

export const useQuery = () => React.useContext(queryContext)
