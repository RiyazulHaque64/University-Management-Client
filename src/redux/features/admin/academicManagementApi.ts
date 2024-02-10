import {
  TAcademicDepartment,
  TAcademicFacutly,
  TAcademicSemester,
} from "../../../types/academicManagement.type";
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
    getAcademicFaculties: builder.query({
      query: () => ({
        url: "/academic-faculty/academic-faculties",
        method: "GET",
      }),
      providesTags: ["academicFaculty"],
      transformResponse: (response: TReduxResponse<TAcademicFacutly[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculty/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicFaculty"],
    }),
    getAcademicDepartment: builder.query({
      query: () => ({
        url: "/academic-department/academic-departments",
        method: "GET",
      }),
      providesTags: ["academicDepartment"],
      transformResponse: (response: TReduxResponse<TAcademicDepartment[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-department/create-academic-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicDepartment"],
    }),
  }),
});

export const {
  useAddAcademicSemesterMutation,
  useGetAcademicSemesterQuery,
  useAddAcademicFacultyMutation,
  useGetAcademicFacultiesQuery,
  useAddAcademicDepartmentMutation,
  useGetAcademicDepartmentQuery,
} = academicManagementApi;
