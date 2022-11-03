import { z } from "zod";

const gemsSchema = z.array(
  z.object({
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
  })
);

export default gemsSchema;
