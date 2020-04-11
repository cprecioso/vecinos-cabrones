import { NextPage } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"
import search from "../backend/search"
import ResultList from "../components/ResultList"
import SearchBar from "../components/SearchBar"

const SearchPage: NextPage = () => {
  const router = useRouter()
  const query = (router.query.q as string) ?? ""

  const response = useSWR(
    query,
    true
      ? search
      : async () => [
          {
            text: "...y los espíritus ha resultado\nser una broma pesada de...",
            start: "00:46:21.680",
            end: "00:46:25.280",
            chapter: {
              id: "5a93ea7b986b285a9b0c274b",
              episodeNumber: 9,
              seasonNumber: 1,
            },
          },
          {
            text: "-Bueno, Paloma, pues aquí\ntenemos los resultados.",
            start: "00:58:30.040",
            end: "00:58:33.360",
            chapter: {
              id: "5a93ea82986b285a9b0c2757",
              episodeNumber: 13,
              seasonNumber: 1,
            },
          },
          {
            text:
              "-Intentamos ayudarte. Ahora sólo\ntienes que valorar los resultados.",
            start: "00:07:18.440",
            end: "00:07:22.680",
            chapter: {
              id: "5a93ea6d986b285a9b0c2730",
              episodeNumber: 1,
              seasonNumber: 2,
            },
          },
          {
            text:
              "-Paloma, me han dado los resultados\nde la ecografía; tengo una hernia.",
            start: "00:22:48.920",
            end: "00:22:53.000",
            chapter: {
              id: "5a93ea64986b285a9b0c2721",
              episodeNumber: 6,
              seasonNumber: 2,
            },
          },
          {
            text:
              "Yo garantizo resultados. Usted\nme firma el contrato y mañana,",
            start: "00:34:19.680",
            end: "00:34:23.680",
            chapter: {
              id: "5a93ea62986b285a9b0c271b",
              episodeNumber: 8,
              seasonNumber: 2,
            },
          },
          {
            text: '(TV) "María Adelaida,\ntenemos los resultados...',
            start: "00:53:21.960",
            end: "00:53:24.680",
            chapter: {
              id: "5a93ea60986b285a9b0c2718",
              episodeNumber: 9,
              seasonNumber: 2,
            },
          },
          {
            text: "-Esperemos que el resultado\nno sea el mismo.",
            start: "00:59:57.640",
            end: "01:00:00.600",
            chapter: {
              id: "5a93ea55986b285a9b0c2700",
              episodeNumber: 4,
              seasonNumber: 3,
            },
          },
          {
            text: "-Esperemos que el resultado\nno sea el mismo.",
            start: "00:59:57.640",
            end: "01:00:00.600",
            chapter: {
              id: "5a93ea55986b285a9b0c2700",
              episodeNumber: 4,
              seasonNumber: 3,
            },
          },
          {
            text:
              "...hasta que nos den los resultados\ndel test de paternidad.",
            start: "00:25:27.600",
            end: "00:25:31.320",
            chapter: {
              id: "5a93ea4c986b285a9b0c26ee",
              episodeNumber: 10,
              seasonNumber: 3,
            },
          },
          {
            text:
              "-Mauri, ya tengo los resultados\ndel sondeo familiar. Antonio, 27;",
            start: "00:35:30.960",
            end: "00:35:35.080",
            chapter: {
              id: "5a93ea43986b285a9b0c26e5",
              episodeNumber: 13,
              seasonNumber: 3,
            },
          },
          {
            text: "-Vengo a por los resultados\nde unas pruebas de paternidad.",
            start: "00:35:44.640",
            end: "00:35:47.920",
            chapter: {
              id: "5a93ea3a986b285a9b0c26d6",
              episodeNumber: 18,
              seasonNumber: 3,
            },
          },
          {
            text:
              "-Calle. Nosotros no fallamos.\n-No nos cuadran los resultados.",
            start: "01:19:20.600",
            end: "01:19:25.200",
            chapter: {
              id: "5a93ea3a986b285a9b0c26d6",
              episodeNumber: 18,
              seasonNumber: 3,
            },
          },
          {
            text:
              "y éstos son los resultados. Pero\nno sé en qué gastar el dinero.",
            start: "00:05:15.680",
            end: "00:05:19.160",
            chapter: {
              id: "5a93ea2b986b285a9b0c26be",
              episodeNumber: 26,
              seasonNumber: 3,
            },
          },
          {
            text:
              "Los resultados llegan mañana.\n-Hasta entonces, se quedan aquí.",
            start: "00:50:44.360",
            end: "00:50:48.200",
            chapter: {
              id: "5a93ea2b986b285a9b0c26be",
              episodeNumber: 26,
              seasonNumber: 3,
            },
          },
          {
            text:
              "-Quedé con mi madre en el banco.\n-A por los resultados del chequeo.",
            start: "00:09:04.160",
            end: "00:09:08.080",
            chapter: {
              id: "5a93ea19986b285a9b0c26a6",
              episodeNumber: 2,
              seasonNumber: 4,
            },
          },
          {
            text: "-Tenemos el resultado\nde las pruebas.",
            start: "00:18:21.320",
            end: "00:18:24.120",
            chapter: {
              id: "5a93ea19986b285a9b0c26a6",
              episodeNumber: 2,
              seasonNumber: 4,
            },
          },
          {
            text: "-Cuando tenga más resultados,\ncontactaré con ustedes.",
            start: "00:22:50.400",
            end: "00:22:54.040",
            chapter: {
              id: "5a93ea19986b285a9b0c26a6",
              episodeNumber: 2,
              seasonNumber: 4,
            },
          },
          {
            text:
              "...con resultado de muerte y\nomisión de socorro, de 1 a 4 años.",
            start: "00:45:00.280",
            end: "00:45:05.000",
            chapter: {
              id: "5a93ea19986b285a9b0c26a6",
              episodeNumber: 2,
              seasonNumber: 4,
            },
          },
          {
            text: "-Perdona, soy socio.\nExijo resultados.",
            start: "01:19:16.520",
            end: "01:19:19.000",
            chapter: {
              id: "5a93ea19986b285a9b0c26a6",
              episodeNumber: 2,
              seasonNumber: 4,
            },
          },
          {
            text:
              "-Claro. Se falsean los resultados.\n-Se le disparan los triglicéridos.",
            start: "00:44:24.600",
            end: "00:44:28.800",
            chapter: {
              id: "5a93ea037ed1a8cd801481d2",
              episodeNumber: 14,
              seasonNumber: 4,
            },
          },
        ],
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  )
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
