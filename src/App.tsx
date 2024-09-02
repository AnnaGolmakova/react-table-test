import { useState, useEffect } from "react";
import { authorize, getTableData } from "./api/API";
import { DocumentType } from "./model/DocumentType";
import "./App.css";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const getData = (response: any) => response.data;

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [data, setData] = useState<DocumentType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthorized && userToken) {
        try {
          const data = getData(await getTableData(userToken));
          console.log(data);
          setData(data as DocumentType[]);
        } catch (error) {
          console.error("Error fetching table data:", error);
        }
      }
    };

    async function handleLogin(username: string, password: string) {
      try {
        const data = getData(await authorize(username, password));
        if ("token" in data) {
          setIsAuthorized(true);
          setUserToken(data.token);
        }
      } catch (error) {
        handleLogout();
        console.error(error);
      }
    }

    function handleLogout() {
      setIsAuthorized(false);
      setUserToken(null);
      localStorage.removeItem("token");
    }

    handleLogin("user12", "password");

    fetchData();
  }, [isAuthorized, userToken]);

  return (
    <>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
