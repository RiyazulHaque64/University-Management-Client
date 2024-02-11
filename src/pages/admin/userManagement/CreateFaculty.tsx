import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../const/user";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";
import { useCreateFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../types/global";
import { TFaculty } from "../../../types/userManagement.type";

const studentDefaultValue = {
  name: {
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
  },
  gender: "male",
  email: "john.doe6@example.com",
  contactNo: "+9876543210",
  emergencyContactNo: "+9876543210",
  bloodGroup: "A+",
  presentAddress: "123 Main Street, Cityville",
  permanentAddress: "456 Long Avenue, Townsville",
  academicDepartment: "65c23a66102fd7f416f92871",
};

const CreateFaculty = () => {
  const { data: academicDepartments, isLoading: departmentLoading } =
    useGetAcademicDepartmentQuery(undefined);
  const [addFaculty, { isLoading: addFacultyLoading, isError, error }] =
    useCreateFacultyMutation();
  console.log(isError, error);
  const academicDepartmentOptions = academicDepartments?.data?.map(
    ({ _id, name }) => ({ value: _id, label: name })
  );
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const facultyData = {
      faculty: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImg);
    try {
      const res = (await addFaculty(formData)) as TResponse<TFaculty>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Faculty created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex>
      <PHForm onSubmit={handleSubmit} defaultValues={studentDefaultValue}>
        <Row gutter={16}>
          <Divider>Personal Information</Divider>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput type="text" name="name.firstName" label="First Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput type="text" name="name.middleName" label="Middle Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput type="text" name="name.lastName" label="Last Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHSelect name="gender" label="Gender" options={genderOptions} />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHDatePicker name="dateOfBirth" label="Date of Birth" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHSelect
              name="bloodGroup"
              label="Blood Group"
              options={bloodGroupOptions}
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Controller
              name="profileImg"
              render={({ field: { onChange, value, ...field } }) => (
                <Form.Item label="Profile Image">
                  <Input
                    {...field}
                    value={value?.fileName}
                    onChange={(e) => onChange(e.target.files?.[0])}
                    type="file"
                  />
                </Form.Item>
              )}
            />
          </Col>
          <Divider>Contact Information</Divider>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput type="email" name="email" label="Email" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput type="text" name="contactNo" label="Contact Number" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="emergencyContactNo"
              label="Emergency Contact Number"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="presentAddress"
              label="Present Address"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="permanentAddress"
              label="Permanent Address"
            />
          </Col>
          <Divider>Academic Information</Divider>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHSelect
              name="academicDepartment"
              label="Academic Department"
              options={academicDepartmentOptions}
              disabled={departmentLoading}
            />
          </Col>
        </Row>
        <Button disabled={addFacultyLoading} htmlType="submit">
          Create
        </Button>
      </PHForm>
    </Flex>
  );
};

export default CreateFaculty;
