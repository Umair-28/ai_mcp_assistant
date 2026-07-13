import { z } from "zod";

export const timeSchema = z.object({
  timezone: z
    .string()
    .min(1, "Timezone is required")
    .describe("IANA timezone, for example Asia/Karachi"),
});
