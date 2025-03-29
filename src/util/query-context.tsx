import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";

const queryContext = createContext<{
  query?: string;
  setQuery: (query: string) => void;
}>({ setQuery() {} });

const { Provider } = queryContext;
export const QueryProvider = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const [query, setQuery] = useState<string | undefined>(
    router.query.q as string | undefined,
  );
  return <Provider value={{ query, setQuery }}>{children}</Provider>;
};

export const useQuery = () => useContext(queryContext);
