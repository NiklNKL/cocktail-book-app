import { SetStateAction, useState } from "react";

export default function useToken() {
  const getToken = () => {
    const savedToken = sessionStorage.getItem("access_token");
    return savedToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (savedToken: string) => {
    sessionStorage.setItem("access_token", savedToken);
    setToken(savedToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
