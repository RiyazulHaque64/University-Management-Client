import { Input } from "antd";
import { Controller } from "react-hook-form";

const PHInput = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label: string;
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} />}
      />
    </div>
  );
};

export default PHInput;
