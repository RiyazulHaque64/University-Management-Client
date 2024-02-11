import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { TQueryParam } from "../../../types/global";

type TTableData = {
  key: string;
  name: string;
  contactNo: string;
  email: string;
  department: string;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Contact Number",
    dataIndex: "contactNo",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Action",
    render: (item) => {
      console.log(item);
      return (
        <Space>
          <Link to={`/admin/faculty/${item.key}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      );
    },
  },
];

const Faculty = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: faculties, isFetching } = useGetFacultiesQuery([
    { name: "limit", value: 4 },
    { name: "page", value: page },
    ...params,
  ]);
  const meta = faculties?.meta;
  const data = faculties?.data?.map(
    ({ _id, name, academicDepartment, email, contactNo }) => ({
      key: _id,
      name: name.firstName + " " + name.middleName + "" + name.lastName,
      department: academicDepartment.name,
      email,
      contactNo,
    })
  );
  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra?.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      setParams(queryParams);
    }
  };
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        pageSize={meta?.limit}
        total={meta?.total}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default Faculty;
