import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(3).max(18),
  email: z.string().email(),
});

export default schema;
