import { NextPage } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"
import searchSubtitle from "../backend/search"
import ResultList from "../components/ResultList"
import SearchBar from "../components/SearchBar"

const SearchPage: NextPage = () => {
  const router = useRouter()
  const query = (router.query.q as string) ?? ""

  const response = useSWR(query, searchSubtitle, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })
  const { data, error, isValidating } = response

  return (
    <>
      <style jsx>{`
        h1 {
          text-align: center;
          margin-top: 1em;
        }

        pre {
          color: white;
        }
      `}</style>

      <SearchBar defaultValue={query} />

      {!query ? null : isValidating ? (
        <h1>Buscando...</h1>
      ) : data ? (
        <ResultList data={data} />
      ) : (
        <div>
          <h1>Error</h1>
          <pre>{"" + (error ?? "")}</pre>
        </div>
      )}
    </>
  )
}

export default SearchPage
