export type TAcademicSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type TAcademicFacutly = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFacutly;
  createdAt: Date;
  updatedAt?: Date;
};
