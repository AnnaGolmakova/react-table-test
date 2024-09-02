import { useState, useEffect } from "react";
import {
  Alert,
  AppBar,
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import { getData, RequestError } from "./utils";
import { authorize, getTableData } from "./api/API";
import { DocumentType } from "./model/DocumentType";
import LoginPage from "./components/LoginPage";
import DocumentTable from "./components/DocumentTable";
import "./App.css";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [data, setData] = useState<DocumentType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthorized(true);
      setUserToken(token);
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
    fetchData();
  }, [isAuthorized, userToken]);

  async function refreshData() {
    console.log("Refreshing");
    if (isAuthorized && userToken) {
      try {
        const newData = getData(await getTableData(userToken));
        setData(newData as DocumentType[]);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    }
  }

  async function handleLogin(token: string) {
    console.log("Auth token", token);
    setIsAuthorized(true);
    setUserToken(token);
    localStorage.setItem("token", token);
  }

  function handleLogout() {
    setIsAuthorized(false);
    setUserToken(null);
    setData([]);
    localStorage.removeItem("token");
  }

  return (
    <>
      {isAuthorized ? (
        <Container
          sx={{
            height: "100dvh",
            width: "100vw",
            flexGrow: 1,
            padding: { xs: "0", sm: "o" },
            overflow: "hidden",
          }}
        >
          <CssBaseline />
          <AppBar component="nav">
            <Toolbar>
              <Typography
                component="h1"
                variant="h6"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                You successfully logined
              </Typography>
              <Button
                variant="text"
                sx={{ color: "#fff" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1, padding: "64px 0 0 0 " }}>
            <DocumentTable
              data={data}
              userToken={userToken!}
              onDataChange={refreshData}
            />
          </Box>
        </Container>
      ) : (
        <LoginPage onSuccess={handleLogin} />
      )}
    </>
  );
}

export default App;
