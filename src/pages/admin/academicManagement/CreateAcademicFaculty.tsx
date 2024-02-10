import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagementApi";
import { createAcademicFacultySchema } from "../../../schemas/academicManagementSchemas";
import { TAcademicFacutly } from "../../../types";
import { TResponse } from "../../../types/global";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const facultyData = {
      name: data?.name,
    };
    try {
      const res = (await addAcademicFaculty(
        facultyData
      )) as TResponse<TAcademicFacutly>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Academic faculty is created successfully", {
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
          resolver={zodResolver(createAcademicFacultySchema)}
        >
          <PHInput type="text" name="name" label="Name" />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
