import * as z from "zod";

export const sceneIdSchema = z.number().int().nonnegative().brand<"SceneId">();
export type SceneId = z.infer<typeof sceneIdSchema>;
