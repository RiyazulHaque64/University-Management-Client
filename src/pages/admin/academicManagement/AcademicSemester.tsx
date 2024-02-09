import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import { TQueryParam } from "../../../types/global";

type TTableData = {
  key: string;
  name: string;
  year: string;
  startMonth: string;
  endMonth: string;
};

const columns: TableColumnsType<TTableData> = [
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
    title: "Year",
    dataIndex: "year",
    filters: [
      {
        text: "2024",
        value: "2024",
      },
      {
        text: "2025",
        value: "2025",
      },
      {
        text: "2026",
        value: "2026",
      },
    ],
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
  {
    title: "Action",
    dataIndex: "x",
    render: () => (
      <div>
        <Button>Update</Button>
      </div>
    ),
  },
];

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: academicSemesters, isFetching } =
    useGetAcademicSemesterQuery(params);
  const data = academicSemesters?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
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
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
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

export default AcademicSemester;
