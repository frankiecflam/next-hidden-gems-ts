import { z } from "zod";

export const gemmer = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  bio: z.string(),
  image: z.string(),
  joiningDate: z.object({ seconds: z.number(), nanoseconds: z.number() }),
  collection: z.array(z.string()),
  following: z.array(z.string()),
  followers: z.array(z.string()),
  gems: z.array(z.string()),
});

export const gemmers = z.array(gemmer);
