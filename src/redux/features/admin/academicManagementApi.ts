import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam, TReduxResponse } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semester/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academicSemester"],
      transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicSemester"],
    }),
  }),
});

export const { useAddAcademicSemesterMutation, useGetAcademicSemesterQuery } =
  academicManagementApi;
