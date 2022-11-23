import { z } from "zod";

export const gem = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  date: z.object({
    seconds: z.number(),
    nanoseconds: z.number(),
  }),
  categoryId: z.string(),
  gemmerId: z.string(),
});

export const gems = z.array(gem);
