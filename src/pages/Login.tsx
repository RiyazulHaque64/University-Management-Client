import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PHForm from "../components/form/PHForm";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (data: FieldValues) => {
    console.log(data);
    // const toastId = toast.loading("Login in...");
    // try {
    //   const userInfo = {
    //     id: data.id,
    //     password: data.password,
    //   };
    //   const res = await login(userInfo).unwrap();
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(setUser({ user: user, token: res.data.accessToken }));
    //   toast.success("Logging successfull", { id: toastId, duration: 2000 });
    //   navigate(`/${user.role}`);
    // } catch (error) {
    //   toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    // }
  };

  return (
    <PHForm onSubmit={handleLogin}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" {...register("id")} />
      </div>
      <div>
        <label htmlFor="id">Password</label>
        <input type="text" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </PHForm>
  );
};

export default Login;
