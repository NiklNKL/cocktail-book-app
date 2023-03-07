import { SetStateAction, useState } from "react";

export default function useToken() {
  const getToken = () => {
    const savedToken = localStorage.getItem("access_token");
    return savedToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (savedToken: string) => {
    localStorage.setItem("access_token", savedToken);
    setToken(savedToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
