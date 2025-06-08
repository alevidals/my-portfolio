import type { datesSchema } from "@/features/dashboard/lib/schema";
import type { z } from "zod";

export type DatesSchema = z.infer<typeof datesSchema>;
