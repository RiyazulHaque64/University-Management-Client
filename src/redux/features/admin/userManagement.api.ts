import { TFaculty, TStudent } from "../../../types/userManagement.type";
import { baseApi } from "../../api/baseApi";
import { TQueryParam, TReduxResponse } from "./../../../types/global";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TStudent[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    getFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TFaculty[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    createFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useCreateFacultyMutation,
  useGetFacultiesQuery,
} = userManagementApi;
