import { NextPage } from "next"
import { useRouter } from "next/router"
import useSearchScene from "../api/backend/search-scene"
import { ErrorView, LoadingView } from "../components/FetchHelpers"
import ResultList from "../components/ResultList"
import SearchBar from "../components/SearchBar"
import { PageSeo } from "../components/Seo"

const SearchPage: NextPage = () => {
  const router = useRouter()
  let query = router.query.q
  if (Array.isArray(query)) query = query[0]
  const { data, error, isValidating } = useSearchScene(query)

  return (
    <>
      <SearchBar compact />
      <PageSeo pageTitle={`"${query}"`} />

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
