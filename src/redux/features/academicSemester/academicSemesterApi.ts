import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemester: builder.query({
      query: () => ({
        url: "/academic-semester/academic-semesters",
      }),
    }),
  }),
});

export const { useGetAcademicSemesterQuery } = academicSemesterApi;
