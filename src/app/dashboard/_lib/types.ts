import type { datesSchema } from "@/app/dashboard/_lib/schema";
import type { z } from "zod";

export type DatesSchema = z.infer<typeof datesSchema>;
