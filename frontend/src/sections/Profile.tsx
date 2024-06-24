import { useEffect, useState } from "react";
import { CromwellAPI } from "../auth/cromwellAPI.ts";
import { AxiosError } from "axios";
import ResponseData from "../interfaces/ResponseData.ts";
import { useSelector } from "react-redux";
import RootReduxState from "../interfaces/RootReduxState.ts";

interface User {
  _id: string;
  name: string;
  email: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const token = useSelector((state: RootReduxState) => state.user.user);

  // Get user data from the API
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await CromwellAPI.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Failed to get user");
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const responseData = axiosError.response.data as ResponseData;
          console.error(responseData.message);
        }
      }
    };

    void getUser();
  }, [token]);

  // Displays user information or a loading message
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
      }}
    >
      {user ? (
        <>
          <h1>Hello, {user.name}!</h1>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
