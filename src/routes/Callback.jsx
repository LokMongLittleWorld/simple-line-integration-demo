import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const Callback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //TODO: state doesn't match between the request and the response
  const storedState = localStorage.getItem("state");
  const [IDToken, setIDToken] = useState("");
  const [user, setUser] = useState({});

  const getAccessToken = async () => {
    if (storedState !== searchParams.get("state")) {
      toast.error("state doesn't match between the request and the response");
      return;
    }

    const url = "https://api.line.me/oauth2/v2.1/token";
    const clientID = import.meta.env.VITE_LINE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_LINE_CLIENT_SECRET;
    const code = searchParams.get("code");

    const data = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:5173/callback",
      client_id: clientID,
      client_secret: clientSecret,
    };
    try {
      const response = await axios.post(url, new URLSearchParams(data));
      if (response.status === 200) {
        setIDToken(response.data.id_token);
      }
    } catch (error) {
      toast.error("error getting access token: " + error);
    }
  };

  const getProfile = async () => {
    console.log("getProfile");
    const url = "https://api.line.me/oauth2/v2.1/verify";

    const data = {
      id_token: IDToken,
      client_id: import.meta.env.VITE_LINE_CLIENT_ID,
    };

    try {
      const response = await axios.post(url, new URLSearchParams(data));
      if (response.status === 200) {
        console.log(response.data);
        const { name, email, picture } = response.data;
        setUser({ name, email, picture });
      }
    } catch (error) {
      toast.error("error getting profile information: " + error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-3xl font-bold h-dvh gap-4">
      {/* get access tooken */}
      <div
        onClick={getAccessToken}
        className="px-6 py-4 rounded-lg bg-green-500 cursor-pointer select-none
        flex flex-col gap-4 items-center justify-center
        transition duration-300 ease-in-out translate hover:-translate-y-1"
      >
        <div className=" text-white w-full text-center">get access token</div>
        <div className="flex flex-col text-2xl text-gray-50">
          <div>state: {searchParams.get("state")}</div>
          <div>code: {searchParams.get("code")}</div>
        </div>
      </div>
      {/* get profile info*/}
      {IDToken && (
        <div
          onClick={getProfile}
          className="px-6 py-4 rounded-lg bg-green-500 cursor-pointer select-none
        flex flex-col gap-4 items-center justify-center
        transition duration-300 ease-in-out translate hover:-translate-y-1"
        >
          <div className="text-white w-full text-center">
            get profile information
          </div>
          {user?.name && (
            <div className="flex flex-row gap-3">
              <img
                src={user.picture}
                alt="profile"
                className="w-20 h-20 rounded-lg"
              />
              <div className="flex flex-col text-2xl text-gray-50">
                <div>name: {user.name}</div>
                <div>email: {user.email}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Callback;
