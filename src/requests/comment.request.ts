import { z } from "zod";

export default z.object({
  comment: z.string().trim().min(2).max(1024),
});
