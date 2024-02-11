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
import { useGetStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TQueryParam } from "../../../types/global";

type TTableData = {
  key: string;
  id: string;
  name: string;
  contactNo: string;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Roll",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
  },
  {
    title: "Contact Number",
    dataIndex: "contactNo",
  },
  {
    title: "Action",
    render: (item) => {
      console.log(item);
      return (
        <Space>
          <Link to={`/admin/student/${item.key}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      );
    },
  },
];

const Student = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: students, isFetching } = useGetStudentsQuery([
    { name: "limit", value: 4 },
    { name: "page", value: page },
    ...params,
  ]);
  const meta = students?.meta;
  const data = students?.data?.map(({ _id, id, name, contactNo }) => ({
    key: _id,
    id,
    name: name.firstName + " " + name.middleName + "" + name.lastName,
    contactNo,
  }));
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
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
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

export default Student;
