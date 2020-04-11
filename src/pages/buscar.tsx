import { NextPage } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"
import searchSubtitle from "../backend/searchSubtitle"
import { ErrorView, LoadingView } from "../components/FetchHelpers"
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
      <SearchBar defaultValue={query} />

      {!query ? null : isValidating ? (
        <LoadingView />
      ) : data ? (
        <ResultList data={data} />
      ) : (
        <ErrorView error={error} />
      )}
    </>
  )
}

export default SearchPage
