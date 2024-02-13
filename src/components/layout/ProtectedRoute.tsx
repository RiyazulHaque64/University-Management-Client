import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  TUser,
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import verifyToken from "../../utils/verifyToken";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string | undefined;
}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
