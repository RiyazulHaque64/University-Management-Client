import { z } from "zod";

export const createSemesterRegistrationSchema = z.object({
  academicSemester: z.string({
    required_error: "Academic semester is required",
  }),
  status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).default("UPCOMING"),
  minCredit: z.string(),
  maxCredit: z.string(),
});
