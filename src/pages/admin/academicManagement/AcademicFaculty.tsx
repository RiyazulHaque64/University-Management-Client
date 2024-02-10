import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagementApi";

type TTableData = {
  key: string;
  name: string;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

const AcademicFaculty = () => {
  const { data: academicFaculties, isFetching } =
    useGetAcademicFacultiesQuery(undefined);
  const data = academicFaculties?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));
  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default AcademicFaculty;
