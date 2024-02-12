import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { semesterRegistrationStatusOptions } from "../../../const/semester";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import { useSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagementApi";
import { TAcademicSemester } from "../../../types";
import { TResponse } from "../../../types/global";

const SemesterRegistration = () => {
  const [semesterRegistration] = useSemesterRegistrationMutation();
  const { data: academicSemesters, isLoading: semesterLoading } =
    useGetAcademicSemesterQuery([{ name: "sort", value: "year" }]);
  const academicSemesterOptions = academicSemesters?.data?.map(
    ({ _id, name, year }) => ({ value: _id, label: name + " " + year })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating...");
    const semesterRegistrationData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    try {
      const res = (await semesterRegistration(
        semesterRegistrationData
      )) as TResponse<TAcademicSemester>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester is registered successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Flex align="center" justify="center">
      <Col span={12}>
        <PHForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(createSemesterRegistrationSchema)}
        >
          <PHSelect
            name="academicSemester"
            label="Academic Semester"
            options={academicSemesterOptions}
            disabled={semesterLoading}
          />
          <PHSelect
            label="Status"
            name="status"
            options={semesterRegistrationStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Minimum Credit" />
          <PHInput type="text" name="maxCredit" label="Maximum Credit" />
          <Button htmlType="submit">Register</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
