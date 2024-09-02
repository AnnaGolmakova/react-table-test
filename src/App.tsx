import { useState, useEffect } from "react";
import {
  Alert,
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CssBaseline,
} from "@mui/material";
import { getData, RequestError } from "./utils";
import { authorize, getTableData } from "./api/API";
import { DocumentType } from "./model/DocumentType";
import LoginPage from "./components/LoginPage";
import "./App.css";

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
    fetchData();
  }, [isAuthorized, userToken]);

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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3">
              You successfully logined
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Container>
      ) : (
        <LoginPage onSuccess={handleLogin} />
      )}
    </>
  );
}

export default App;
