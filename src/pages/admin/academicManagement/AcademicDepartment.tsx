import { Col, Flex, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";

type TTableData = {
  key: string;
  name: string;
  academicFaculty: string;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Academic Faculty",
    dataIndex: "academicFaculty",
  },
];

const AcademicDepartment = () => {
  const { data: academicDepartment, isFetching } =
    useGetAcademicDepartmentQuery(undefined);
  const data = academicDepartment?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );
  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Flex align="center" justify="center">
      <Col span={16}>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </Col>
    </Flex>
  );
};

export default AcademicDepartment;
