import { TAcademicDepartment, TAcademicFacutly, TAcademicSemester } from ".";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation?: string;
  motherContactNo: string;
};

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface TStudent {
  _id: string;
  id: string;
  user: string;
  name: TStudentName;
  gender: "male" | "female" | "other";
  email: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFacutly;
  isDeleted: boolean;
}

export interface TFaculty {
  _id: string;
  id: string;
  user: string;
  name: TStudentName;
  gender: "male" | "female" | "other";
  email: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: TAcademicDepartment;
  isDeleted: boolean;
}
