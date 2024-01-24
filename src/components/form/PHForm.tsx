import { FormProvider, useForm } from "react-hook-form";

const PHForm = ({ onSubmit, children }) => {
  const methods = useForm();
  console.log(methods);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
