import { Button, Col, Divider, Flex, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../components/form/PHDatePicker";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import PHSelect from "../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../const/user";
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicSemesterQuery,
} from "../../redux/features/admin/academicManagementApi";
import { useCreateStudentMutation } from "../../redux/features/admin/userManagement.api";

// {
//     "password": "abc123",
//     "student": {
//         "name": {
//             "firstName": "John",
//             "middleName": "Doe",
//             "lastName": "Smith"
//         },
//         "gender": "male",
//         "email": "john.doe6@example.com",
//         "dateOfBirth": "1990-01-01",
//         "contactNo": "+9876543210",
//         "emergencyContactNo": "+9876543210",
//         "bloodGroup": "A+",
//         "presentAddress": "123 Main Street, Cityville",
//         "permanentAddress": "456 Long Avenue, Townsville",
//         "guardian": {
//             "fatherName": "Robert Doe",
//             "fatherOccupation": "Engineer",
//             "fatherContactNo": "+1234567890",
//             "motherName": "Alice Doe",
//             "motherOccupation": "Doctor",
//             "motherContactNo": "+9876543210"
//         },
//         "localGuardian": {
//             "name": "Lucy Smith",
//             "contactNo": "+9876543210",
//             "address": "789 Short Street, Villagetown",
//             "occupation": "Teacher"
//         },
//         "admissionSemester": "65c24022e00bea4ade92fcdb",
//         "academicDepartment": "65c23a66102fd7f416f92871",
//         "isActive": "active"
//     }
// }

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
  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "+1234567890",
    motherName: "Alice Doe",
    motherOccupation: "Doctor",
    motherContactNo: "+9876543210",
  },
  localGuardian: {
    name: "Lucy Smith",
    contactNo: "+9876543210",
    address: "789 Short Street, Villagetown",
    occupation: "Teacher",
  },
  admissionSemester: "65c24022e00bea4ade92fcdb",
  academicDepartment: "65c23a66102fd7f416f92871",
  isActive: "active",
};

const CreateStudent = () => {
  const { data: academicSemesters, isLoading: semesterLoading } =
    useGetAcademicSemesterQuery(undefined);
  const { data: academicDepartments, isLoading: departmentLoading } =
    useGetAcademicDepartmentQuery(undefined);
  const [addStudent, { isLoading: addStudentLoading }] =
    useCreateStudentMutation();
  const academicSemesterOptions = academicSemesters?.data?.map(
    ({ _id, name, year }) => ({ value: _id, label: name + " " + year })
  );
  const academicDepartmentOptions = academicDepartments?.data?.map(
    ({ _id, name }) => ({ value: _id, label: name })
  );
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const studentData = {
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    try {
      const res = await addStudent(formData);
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Student created successfully", { id: toastId });
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
          <Divider>Guardian</Divider>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="guardian.fatherName"
              label="Father Name"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="guardian.fatherOccupation"
              label="Father Occupation"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="guardian.fatherContactNo"
              label="Father Contact Number"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="guardian.motherName"
              label="Mother Name"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="guardian.motherOccupation"
              label="Mother Occupation"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="guardian.motherContactNo"
              label="Mother Contact Number"
            />
          </Col>
          <Divider>Local Guardian</Divider>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput type="text" name="localGuardian.name" label="Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="localGuardian.contactNo"
              label="Contact Number"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput
              type="text"
              name="localGuardian.occupation"
              label="Occupation"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHInput type="text" name="localGuardian.address" label="Address" />
          </Col>
          <Divider>Academic Information</Divider>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHSelect
              name="admissionSemester"
              label="Academic Semester"
              options={academicSemesterOptions}
              disabled={semesterLoading}
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHSelect
              name="academicDepartment"
              label="Academic Department"
              options={academicDepartmentOptions}
              disabled={departmentLoading}
            />
          </Col>
        </Row>
        <Button htmlType="submit">Create</Button>
      </PHForm>
    </Flex>
  );
};

export default CreateStudent;
