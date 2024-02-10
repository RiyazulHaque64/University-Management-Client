import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { createAcademicDepartmentSchema } from "../../../schemas/academicManagementSchemas";
import { TAcademicDepartment } from "../../../types";
import { TResponse } from "../../../types/global";

const CreateAcademicDepartment = () => {
  const { data: academicFaculties, isLoading: facultyLoading } =
    useGetAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const academicFacutiesOptions = academicFaculties?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await addAcademicDepartment(
        data
      )) as TResponse<TAcademicDepartment>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Academic department created successfuly", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex align="center" justify="center">
      <Col span={12}>
        <PHForm
          onSubmit={handleSubmit}
          resolver={zodResolver(createAcademicDepartmentSchema)}
        >
          <PHInput type="text" name="name" label="name" />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacutiesOptions}
            disabled={facultyLoading}
          />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
