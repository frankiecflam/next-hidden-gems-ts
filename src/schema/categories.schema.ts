import { z } from "zod";

export const category = z.object({
  id: z.string(),
  name: z.string(),
});

export const categories = z.array(category);
