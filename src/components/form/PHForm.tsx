import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TPHFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  resolver?: any;
  children: ReactNode;
};
const PHForm = ({ onSubmit, resolver, children }: TPHFromProps) => {
  const formConfig: { resolver?: any } = {};
  console.log(formConfig);
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
