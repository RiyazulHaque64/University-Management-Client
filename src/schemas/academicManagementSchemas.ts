import { z } from "zod";

export const createAcademicSemesterSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  year: z.string({ required_error: "Year is required" }),
  startMonth: z.string({ required_error: "Start month is required" }),
  endMonth: z.string({ required_error: "End month is required" }),
});

export const createAcademicFacultySchema = z.object({
  name: z.string({ required_error: "Faculty name is required" }),
});

export const createAcademicDepartmentSchema = z.object({
  name: z.string({ required_error: "Department name is required" }),
  academicFaculty: z.string({ required_error: "Academic faculty is required" }),
});
