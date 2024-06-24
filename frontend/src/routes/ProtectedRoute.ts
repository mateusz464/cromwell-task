import { useSelector } from "react-redux";
import RootReduxState from "../interfaces/RootState.ts";
import NavigationPageProps from "../interfaces/NavigationPageProps.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }: NavigationPageProps) {
  const user = useSelector((state: RootReduxState) => state.user.user);
  const navigate = useNavigate();

  // Redirect to log in page if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default ProtectedRoute;
