import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const PHInput = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label?: string;
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} size="large" />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
