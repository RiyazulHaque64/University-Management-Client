import { useGetAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAcademicSemesterQuery(undefined);
  console.log(data);
  return <div>Academic semester page</div>;
};

export default AcademicSemester;
