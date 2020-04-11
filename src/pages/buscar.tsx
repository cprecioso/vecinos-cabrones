import { NextPage } from "next"
import { useRouter } from "next/router"
import searchSubtitle from "../backend/searchSubtitle"
import { ErrorView, LoadingView } from "../components/FetchHelpers"
import ResultList from "../components/ResultList"
import SearchBar from "../components/SearchBar"
import useRequest from "../util/request"

const SearchPage: NextPage = () => {
  const router = useRouter()
  const query = (router.query.q as string) ?? ""

  const response = useRequest(query, searchSubtitle)
  const { data, error, isValidating } = response

  return (
    <>
      <SearchBar />

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
