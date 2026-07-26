import { searchSubtitle } from "@/api/backend/search-scene";
import ResultList from "@/components/ResultList";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    q: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  if (q) {
    return { title: q };
  } else {
    return {};
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  if (!q) redirect("/");

  const results = await searchSubtitle(q);

  return <ResultList data={results} />;
}
