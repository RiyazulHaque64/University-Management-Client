import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TPHFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
};
const PHForm = ({ onSubmit, children }: TPHFromProps) => {
  const methods = useForm();
  console.log(methods);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
