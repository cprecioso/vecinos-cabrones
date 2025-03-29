export type Episode = Record<
  | "data-season"
  | "data-episode"
  | "prime-season"
  | "prime-episode"
  | "prime-link"
  | "netflix-season"
  | "netflix-episode"
  | "netflix-link",
  string
>;

type Values<T> = T[keyof T];
export type LinkType = Values<{
  [P in keyof Episode]: P extends `${infer T}-link` ? T : never;
}>;

const data: Partial<Episode>[];
export default data;
