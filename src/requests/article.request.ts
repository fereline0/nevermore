import { z } from "zod";

const schema = z.object({
  title: z.string().min(5).max(256),
  value: z.string().min(128),
});

export default schema;
