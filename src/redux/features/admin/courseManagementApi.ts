import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    semesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSemesterRegistrationMutation } = courseManagementApi;
